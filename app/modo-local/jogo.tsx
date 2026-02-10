import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, ArrowRight, RotateCcw, Home } from 'lucide-react-native';
import { Colors } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { HomeButton } from '@/components/HomeButton';

const impostorImg = require('@/assets/images/impostor.png');
const tripulanteImg = require('@/assets/images/tripulante.png');

type Phase = 'passing' | 'voting' | 'result';

export default function ModoLocalJogoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ players: string; word: string; impostors: string }>();
  const players: string[] = JSON.parse(params.players || '[]');
  const word = params.word || '???';
  const impIdx: number[] = JSON.parse(params.impostors || '[]');

  const [curIdx, setCurIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('passing');
  const [showRole, setShowRole] = useState(false);
  const [votes, setVotes] = useState<Record<number, number>>({});
  const [voteIdx, setVoteIdx] = useState(0);

  const isImp = impIdx.includes(curIdx);
  const curName = players[curIdx] || `Jogador ${curIdx + 1}`;

  const handleNext = () => {
    setShowRole(false);
    if (curIdx < players.length - 1) { setCurIdx(curIdx + 1); }
    else { Alert.alert('Todos viram seus papéis!', 'Discutam e depois votem.', [{ text: 'Iniciar Votação', onPress: () => { setPhase('voting'); setVoteIdx(0); } }]); }
  };

  const handleVote = (target: number) => {
    const nv = { ...votes, [voteIdx]: target };
    setVotes(nv);
    if (voteIdx < players.length - 1) setVoteIdx(voteIdx + 1);
    else setPhase('result');
  };

  const vc: Record<number, number> = {};
  Object.values(votes).forEach((t) => { vc[t] = (vc[t] || 0) + 1; });
  const maxV = Math.max(0, ...Object.values(vc));
  const mostV = Object.entries(vc).filter(([, c]) => c === maxV).map(([i]) => parseInt(i));
  const crewWon = mostV.some((i) => impIdx.includes(i));

  if (phase === 'passing') {
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.container}>
          <View style={s.panel}>
            <View style={s.header}>
              <HomeButton />
              <Text style={s.headerTitle}>Modo Local</Text>
              <Text style={s.headerCount}>{curIdx + 1}/{players.length}</Text>
            </View>

            <View style={s.center}>
              {!showRole ? (
                <Pressable style={s.passCard} onPress={() => setShowRole(true)}>
                  <Text style={{ fontSize: 64, marginBottom: 16 }}>📱</Text>
                  <Text style={s.passTitle}>Passe para {curName}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 }}>
                    <Eye size={16} color={Colors.purple} /><Text style={s.passHint}>Toque para ver seu papel</Text>
                  </View>
                  <View style={s.passDivider} />
                  <Text style={s.passWarn}>Não deixe ninguém ver!</Text>
                </Pressable>
              ) : (
                <View style={[s.roleCard, { borderColor: isImp ? Colors.impostor : Colors.crew }]}>
                  <Image source={isImp ? impostorImg : tripulanteImg} style={s.roleImg} resizeMode="contain" />
                  <Text style={s.roleName}>{curName}</Text>
                  <Text style={[s.roleTitle, { color: isImp ? Colors.impostor : Colors.crew }]}>{isImp ? 'IMPOSTOR' : 'TRIPULANTE'}</Text>
                  {!isImp && <View style={s.wordBox}><Text style={s.wordLabel}>Palavra:</Text><Text style={s.wordText}>{word}</Text></View>}
                  {isImp && <Text style={s.impHint}>Tente descobrir a palavra secreta!</Text>}
                  <Button title="PRÓXIMO" onPress={handleNext} variant="orange" size="lg" fullWidth style={{ marginTop: 24 }} icon={<ArrowRight size={20} color="#fff" />} />
                </View>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (phase === 'voting') {
    const voterName = players[voteIdx] || `Jogador ${voteIdx + 1}`;
    return (
      <SafeAreaView style={s.safe}>
        <View style={s.container}>
          <View style={s.panel}>
            <View style={s.header}><HomeButton /><Text style={s.headerTitle}>Votação</Text><Text style={s.headerCount}>{voteIdx + 1}/{players.length}</Text></View>
            <ScrollView contentContainerStyle={{ gap: 12, paddingBottom: 20 }}>
              <Text style={s.voterTitle}>{voterName}, vote!</Text>
              <Text style={s.voterSub}>Quem você acha que é o impostor?</Text>
              {players.map((name, i) => {
                if (i === voteIdx) return null;
                return (
                  <Pressable key={i} style={s.voteOpt} onPress={() => handleVote(i)}>
                    <Text style={{ fontSize: 20 }}>🧑‍🚀</Text>
                    <Text style={s.voteOptName}>{name}</Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Result
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        <View style={s.panel}>
          <View style={s.resultHead}>
            <Text style={{ fontSize: 64 }}>{crewWon ? '🎉' : '😈'}</Text>
            <Text style={s.resultTitle}>{crewWon ? 'Tripulantes venceram!' : 'Impostor venceu!'}</Text>
          </View>

          <View style={[s.resultCard, { borderColor: Colors.impostor }]}>
            <Image source={impostorImg} style={{ height: 80, width: 80 }} resizeMode="contain" />
            <Text style={s.resultLabel}>Impostor{impIdx.length > 1 ? 'es' : ''}:</Text>
            {impIdx.map((i) => <Text key={i} style={s.impResultName}>{players[i]}</Text>)}
          </View>

          <View style={[s.resultCard, { borderColor: Colors.crew }]}>
            <Text style={s.resultLabel}>Palavra:</Text>
            <Text style={s.wordResult}>{word}</Text>
          </View>

          <View style={s.breakCard}>
            <Text style={s.secTitle}>Votos</Text>
            {players.map((name, i) => {
              const c = vc[i] || 0;
              const isI = impIdx.includes(i);
              return <View key={i} style={s.breakRow}><Text style={s.breakName}>{isI ? '🔴 ' : '🟢 '}{name}</Text><Text style={s.breakCount}>{c} voto{c !== 1 ? 's' : ''}</Text></View>;
            })}
          </View>

          <View style={{ gap: 10 }}>
            <Button title="JOGAR NOVAMENTE" onPress={() => router.replace('/modo-local')} variant="orange" size="lg" fullWidth icon={<RotateCcw size={20} color="#fff" />} />
            <Button title="INÍCIO" onPress={() => router.replace('/')} variant="slate" size="md" icon={<Home size={18} color={Colors.slate400} />} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgMain },
  container: { flex: 1, padding: 16 },
  panel: { flex: 1, backgroundColor: Colors.bgPanel, borderRadius: 48, padding: 24, borderWidth: 4, borderColor: Colors.panelBorder, gap: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '900' },
  headerCount: { color: Colors.slate500, fontSize: 14, fontWeight: '700' },
  center: { flex: 1, justifyContent: 'center' },
  passCard: { backgroundColor: Colors.bgSlate800, borderRadius: 28, padding: 40, alignItems: 'center', borderWidth: 3, borderColor: Colors.purple, borderStyle: 'dashed' },
  passTitle: { color: '#fff', fontSize: 22, fontWeight: '800', textAlign: 'center' },
  passHint: { color: Colors.purple, fontSize: 16, fontWeight: '600' },
  passDivider: { width: 60, height: 2, backgroundColor: Colors.bgSlate700, marginVertical: 16 },
  passWarn: { color: Colors.slate500, fontSize: 13, fontStyle: 'italic' },
  roleCard: { backgroundColor: Colors.bgSlate800, borderRadius: 28, padding: 32, alignItems: 'center', borderWidth: 4 },
  roleImg: { height: 100, width: 100, marginBottom: 8 },
  roleName: { color: Colors.slate400, fontSize: 14, fontWeight: '600', marginBottom: 4 },
  roleTitle: { fontSize: 28, fontWeight: '900', marginBottom: 16 },
  wordBox: { backgroundColor: Colors.bgSlate700, borderRadius: 14, padding: 16, width: '100%', alignItems: 'center' },
  wordLabel: { color: Colors.slate400, fontSize: 12, fontWeight: '600', marginBottom: 4 },
  wordText: { color: '#fff', fontSize: 24, fontWeight: '900' },
  impHint: { color: Colors.impostor, fontSize: 15, fontWeight: '600', textAlign: 'center', fontStyle: 'italic' },
  voterTitle: { color: '#fff', fontSize: 22, fontWeight: '800', textAlign: 'center' },
  voterSub: { color: Colors.slate400, fontSize: 14, textAlign: 'center', marginBottom: 12 },
  voteOpt: { backgroundColor: Colors.bgSlate800, borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14, borderWidth: 3, borderColor: Colors.slateBorder },
  voteOptName: { color: '#fff', fontSize: 17, fontWeight: '700' },
  resultHead: { alignItems: 'center', gap: 8 },
  resultTitle: { color: '#fff', fontSize: 26, fontWeight: '900', textAlign: 'center' },
  resultCard: { backgroundColor: Colors.bgSlate800, borderRadius: 24, padding: 20, alignItems: 'center', borderWidth: 4, gap: 8 },
  resultLabel: { color: Colors.slate400, fontSize: 13, fontWeight: '700' },
  impResultName: { color: Colors.impostor, fontSize: 22, fontWeight: '900' },
  wordResult: { color: Colors.crew, fontSize: 22, fontWeight: '900' },
  breakCard: { backgroundColor: Colors.bgSlate800, borderRadius: 20, padding: 16, borderWidth: 3, borderColor: Colors.slateBorder },
  secTitle: { color: '#fff', fontSize: 16, fontWeight: '900', marginBottom: 10 },
  breakRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  breakName: { color: '#fff', fontSize: 14, fontWeight: '600' },
  breakCount: { color: Colors.slate400, fontSize: 14 },
});
