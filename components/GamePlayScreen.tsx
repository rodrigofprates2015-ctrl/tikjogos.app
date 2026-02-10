import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert, Image } from 'react-native';
import { Eye, EyeOff, Vote, RotateCcw, Shuffle, Send } from 'lucide-react-native';
import { Colors, API_BASE_URL } from '@/lib/constants';
import { useGameStore } from '@/lib/gameStore';
import { Button } from '@/components/ui/Button';
import { HomeButton } from '@/components/HomeButton';
import { VotingScreen } from './VotingScreen';

const impostorImg = require('@/assets/images/impostor.png');
const tripulanteImg = require('@/assets/images/tripulante.png');

export function GamePlayScreen() {
  const { room, user, returnToLobby, revealQuestion, triggerSpeakingOrderWheel, speakingOrder, speakingOrderPlayerMap, showSpeakingOrderWheel, setShowSpeakingOrderWheel } = useGameStore();
  const [showRole, setShowRole] = useState(false);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isHost = room?.hostId === user?.uid;
  const gd = room?.gameData;
  const gm = room?.gameMode;
  const players = room?.players || [];
  const impIds = gd?.impostorIds || (room?.impostorId ? [room.impostorId] : []);
  const isImp = user ? impIds.includes(user.uid) : false;

  if (gd?.votingStarted || gd?.votesRevealed) return <VotingScreen />;

  const crewInfo = (): string => {
    switch (gm) {
      case 'palavraSecreta': case 'palavraComunidade': return gd?.word || '???';
      case 'palavras': { const r = user ? gd?.roles?.[user.uid] : undefined; return `${gd?.location || '???'}\nFunção: ${r || '???'}`; }
      case 'duasFaccoes': { const f = user ? gd?.factionMap?.[user.uid] : undefined; return (f === 'A' ? gd?.factions?.A : gd?.factions?.B) || '???'; }
      case 'categoriaItem': return `${gd?.category || '???'}\n${gd?.item || '???'}`;
      case 'perguntasDiferentes': return gd?.question || '???';
      default: return '';
    }
  };

  const impInfo = (): string => {
    switch (gm) {
      case 'palavraSecreta': return 'Descubra a palavra secreta!';
      case 'palavras': return 'Descubra o local!';
      case 'duasFaccoes': return 'Descubra a palavra certa!';
      case 'categoriaItem': return gd?.category ? `Categoria: ${gd.category}\nDescubra o item!` : 'Descubra o item!';
      case 'perguntasDiferentes': return gd?.impostorQuestion || 'Sua pergunta é diferente!';
      default: return '';
    }
  };

  const submitAnswer = async () => {
    if (!room || !user || !answer.trim()) return;
    setSubmitted(true);
    try { await fetch(`${API_BASE_URL}/api/rooms/${room.code}/submit-answer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ playerId: user.uid, playerName: user.name, answer: answer.trim() }) }); } catch (e) { console.error(e); }
  };

  const startVoting = async () => {
    if (!room || !isHost) return;
    try { await fetch(`${API_BASE_URL}/api/rooms/${room.code}/start-voting`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }); } catch (e) { console.error(e); }
  };

  const answers = gd?.answers || [];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={st.scroll}>
      <View style={st.panel}>
        {/* Top bar */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8 }}><HomeButton /></View>

        {/* Role Card */}
        <Pressable style={[st.roleCard, { borderColor: isImp ? Colors.impostor : Colors.crew }]} onPress={() => setShowRole(!showRole)}>
          <Image source={isImp ? impostorImg : tripulanteImg} style={st.roleImg} resizeMode="contain" />
          <Text style={[st.roleTitle, { color: isImp ? Colors.impostor : Colors.crew }]}>{isImp ? 'IMPOSTOR' : 'TRIPULANTE'}</Text>
          {showRole ? (
            <View style={st.roleInfo}>
              <Text style={st.roleInfoText}>{isImp ? impInfo() : crewInfo()}</Text>
              {gd?.hint && !isImp && <View style={st.hintBox}><Text style={st.hintLabel}>Dica:</Text><Text style={st.hintText}>{gd.hint}</Text></View>}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}><EyeOff size={14} color={Colors.slate500} /><Text style={{ color: Colors.slate500, fontSize: 12 }}>Toque para esconder</Text></View>
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}><Eye size={14} color={Colors.slate500} /><Text style={{ color: Colors.slate500, fontSize: 14, fontStyle: 'italic' }}>Toque para ver seu papel</Text></View>
          )}
        </Pressable>

        {/* Speaking Order */}
        {showSpeakingOrderWheel && speakingOrder && (
          <View style={st.section}>
            <Text style={st.secTitle}>Ordem de Fala</Text>
            {speakingOrder.map((pid, i) => {
              const nm = speakingOrderPlayerMap?.[pid] || players.find((p) => p.uid === pid)?.name || pid;
              return <View key={pid} style={st.orderRow}><View style={st.orderNum}><Text style={st.orderNumText}>{i + 1}</Text></View><Text style={st.orderName}>{nm}</Text></View>;
            })}
            <Button title="FECHAR" onPress={() => setShowSpeakingOrderWheel(false)} variant="slate" size="sm" />
          </View>
        )}

        {/* Question (perguntasDiferentes) */}
        {gm === 'perguntasDiferentes' && gd?.questionRevealed && (
          <View style={st.section}><Text style={st.secTitle}>Sua Pergunta</Text><Text style={st.qText}>{isImp ? gd?.impostorQuestion : gd?.question}</Text></View>
        )}
        {gm === 'perguntasDiferentes' && !gd?.questionRevealed && isHost && (
          <Button title="REVELAR PERGUNTAS" onPress={revealQuestion} variant="blue" size="md" fullWidth icon={<Eye size={18} color="#fff" />} />
        )}

        {/* Answer */}
        {gm === 'perguntasDiferentes' && gd?.questionRevealed && !submitted && !answers.find((a) => a.playerId === user?.uid) && (
          <View style={st.section}>
            <Text style={st.secTitle}>Sua Resposta</Text>
            <TextInput style={st.answerInput} value={answer} onChangeText={setAnswer} placeholder="Digite sua resposta..." placeholderTextColor={Colors.slate500} multiline />
            <Button title="ENVIAR" onPress={submitAnswer} variant="green" size="md" fullWidth disabled={!answer.trim()} icon={<Send size={16} color="#fff" />} />
          </View>
        )}
        {submitted && <View style={st.doneBadge}><Text style={st.doneText}>Resposta enviada!</Text></View>}

        {gd?.answersRevealed && answers.length > 0 && (
          <View style={st.section}><Text style={st.secTitle}>Respostas</Text>
            {answers.map((a) => <View key={a.playerId} style={st.ansCard}><Text style={st.ansName}>{a.playerName}</Text><Text style={st.ansText}>{a.answer}</Text></View>)}
          </View>
        )}

        {/* Host Actions */}
        {isHost && (
          <View style={{ gap: 10 }}>
            <Button title="SORTEAR ORDEM DE FALA" onPress={triggerSpeakingOrderWheel} variant="slate" size="md" fullWidth icon={<Shuffle size={18} color={Colors.slate400} />} />
            <Button title="INICIAR VOTAÇÃO" onPress={startVoting} variant="rose" size="lg" fullWidth icon={<Vote size={22} color="#fff" />} />
            <Button title="NOVA RODADA" onPress={() => Alert.alert('Nova Rodada', 'Voltar ao lobby?', [{ text: 'Cancelar', style: 'cancel' }, { text: 'Sim', onPress: returnToLobby }])} variant="slate" size="sm" icon={<RotateCcw size={16} color={Colors.slate400} />} />
          </View>
        )}

        {/* Players */}
        <View style={st.section}>
          <Text style={st.secTitle}>Jogadores ({players.filter((p) => p.connected !== false).length})</Text>
          <View style={st.chips}>
            {players.filter((p) => p.connected !== false).map((p) => (
              <View key={p.uid} style={[st.chip, p.uid === user?.uid && { borderColor: Colors.purple + '60', backgroundColor: Colors.purple + '15' }]}>
                <Text style={st.chipText}>{p.uid === room?.hostId ? '👑 ' : ''}{p.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const st = StyleSheet.create({
  scroll: { padding: 16, paddingBottom: 40 },
  panel: { backgroundColor: Colors.bgPanel, borderRadius: 48, padding: 24, borderWidth: 4, borderColor: Colors.panelBorder, gap: 16 },
  roleCard: { backgroundColor: Colors.bgSlate800, borderRadius: 28, padding: 28, alignItems: 'center', borderWidth: 4 },
  roleImg: { height: 100, width: 100, marginBottom: 8 },
  roleTitle: { fontSize: 28, fontWeight: '900', letterSpacing: 2, marginBottom: 8 },
  roleInfo: { alignItems: 'center', gap: 12, width: '100%' },
  roleInfoText: { color: '#fff', fontSize: 20, fontWeight: '800', textAlign: 'center', lineHeight: 28 },
  hintBox: { backgroundColor: Colors.yellow + '20', borderRadius: 14, padding: 14, width: '100%', borderWidth: 1, borderColor: Colors.yellow + '30' },
  hintLabel: { color: Colors.yellow, fontSize: 12, fontWeight: '800', marginBottom: 4 },
  hintText: { color: '#fff', fontSize: 14 },
  section: { gap: 10 },
  secTitle: { color: '#fff', fontSize: 16, fontWeight: '900' },
  qText: { color: '#fff', fontSize: 16, fontWeight: '700', lineHeight: 24, backgroundColor: Colors.bgSlate800, borderRadius: 16, padding: 16, borderWidth: 2, borderColor: Colors.slateBorder },
  answerInput: { backgroundColor: Colors.bgSlate800, borderRadius: 16, padding: 14, color: '#fff', fontSize: 15, minHeight: 60, textAlignVertical: 'top', borderWidth: 2, borderColor: Colors.slateBorder },
  doneBadge: { backgroundColor: Colors.green + '20', borderRadius: 14, padding: 14, alignItems: 'center' },
  doneText: { color: Colors.green, fontSize: 15, fontWeight: '800' },
  ansCard: { backgroundColor: Colors.bgSlate800, borderRadius: 14, padding: 14, borderWidth: 2, borderColor: Colors.slateBorder },
  ansName: { color: Colors.orange, fontSize: 13, fontWeight: '800', marginBottom: 4 },
  ansText: { color: '#fff', fontSize: 14 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: Colors.bgSlate800, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 2, borderColor: Colors.slateBorder },
  chipText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  orderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  orderNum: { width: 32, height: 32, borderRadius: 10, backgroundColor: Colors.orange, alignItems: 'center', justifyContent: 'center' },
  orderNumText: { color: '#fff', fontSize: 16, fontWeight: '900' },
  orderName: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
