import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Vote, Eye, RotateCcw, Check } from 'lucide-react-native';
import { Colors, API_BASE_URL } from '@/lib/constants';
import { useGameStore } from '@/lib/gameStore';
import { Button } from '@/components/ui/Button';
import { HomeButton } from '@/components/HomeButton';
import type { PlayerVote } from '@shared/schema';

const impostorImg = require('@/assets/images/impostor.png');

export function VotingScreen() {
  const { room, user, returnToLobby } = useGameStore();
  const [sel, setSel] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isHost = room?.hostId === user?.uid;
  const gd = room?.gameData;
  const players = room?.players.filter((p) => p.connected !== false) || [];
  const votes: PlayerVote[] = gd?.votes || [];
  const revealed = gd?.votesRevealed || false;
  const impIds = gd?.impostorIds || (room?.impostorId ? [room.impostorId] : []);
  const hasVote = votes.some((v) => v.playerId === user?.uid);
  const allVoted = votes.length >= players.length;

  const phase = revealed ? 'result' : hasVote ? 'waiting' : gd?.votingStarted ? 'voting' : 'discussion';

  const vc: Record<string, number> = {};
  votes.forEach((v) => { vc[v.targetId] = (vc[v.targetId] || 0) + 1; });
  const maxV = Math.max(0, ...Object.values(vc));
  const mostV = Object.entries(vc).filter(([, c]) => c === maxV).map(([id]) => id);
  const crewWon = revealed && mostV.some((id) => impIds.includes(id));

  const handleVote = async () => {
    if (!room || !user || !sel) return;
    setSubmitting(true);
    const t = players.find((p) => p.uid === sel);
    try { await fetch(`${API_BASE_URL}/api/rooms/${room.code}/submit-vote`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ playerId: user.uid, playerName: user.name, targetId: sel, targetName: t?.name || '' }) }); } catch (e) { console.error(e); }
    finally { setSubmitting(false); }
  };

  const handleReveal = async () => {
    if (!room || !isHost) return;
    try { await fetch(`${API_BASE_URL}/api/rooms/${room.code}/reveal-impostor`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }); } catch (e) { console.error(e); }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={s.scroll}>
      <View style={s.panel}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 8 }}><HomeButton /></View>

        {/* Phase Header */}
        <View style={s.phaseHead}>
          <Text style={s.phaseEmoji}>{phase === 'result' ? (crewWon ? '🎉' : '😈') : ''}</Text>
          {phase !== 'result' && <Vote size={48} strokeWidth={2} color={Colors.orange} />}
          <Text style={s.phaseTitle}>
            {phase === 'discussion' && 'DISCUSSÃO'}
            {phase === 'voting' && 'VOTE NO IMPOSTOR!'}
            {phase === 'waiting' && 'AGUARDANDO VOTOS...'}
            {phase === 'result' && (crewWon ? 'TRIPULAÇÃO VENCEU!' : 'IMPOSTOR VENCEU!')}
          </Text>
          {phase !== 'result' && <Text style={s.voteCount}>{votes.length}/{players.length} votos</Text>}
        </View>

        {/* Voting */}
        {phase === 'voting' && (
          <View style={{ gap: 10 }}>
            <Text style={s.secTitle}>Quem é o impostor?</Text>
            {players.filter((p) => p.uid !== user?.uid).map((p) => (
              <Pressable key={p.uid} style={[s.voteOpt, sel === p.uid && s.voteOptSel]} onPress={() => setSel(p.uid)}>
                <View style={[s.voteAvatar, sel === p.uid && { backgroundColor: Colors.purple + '30', borderColor: Colors.purple }]}>
                  {sel === p.uid ? <Check size={20} color={Colors.purple} /> : <Text style={{ fontSize: 20 }}>🧑‍🚀</Text>}
                </View>
                <Text style={[s.voteOptName, sel === p.uid && { color: '#fff' }]}>{p.name}</Text>
              </Pressable>
            ))}
            <Button title="CONFIRMAR VOTO" onPress={handleVote} variant="green" size="lg" fullWidth disabled={!sel} loading={submitting} icon={<Check size={20} color="#fff" />} />
          </View>
        )}

        {phase === 'waiting' && (
          <View style={{ alignItems: 'center', paddingVertical: 32, gap: 12 }}>
            <Text style={{ color: Colors.slate400, fontSize: 15, textAlign: 'center', fontWeight: '700' }}>Voto registrado! Aguardando...</Text>
            <Text style={{ color: Colors.orange, fontSize: 36, fontWeight: '900' }}>{votes.length}/{players.length}</Text>
          </View>
        )}

        {phase === 'discussion' && isHost && (
          <View style={{ gap: 16, alignItems: 'center', paddingVertical: 20 }}>
            <Text style={{ color: Colors.slate400, fontSize: 16, textAlign: 'center', fontWeight: '700' }}>Discutam quem é o impostor!</Text>
            <Button title="INICIAR VOTAÇÃO" onPress={async () => { try { await fetch(`${API_BASE_URL}/api/rooms/${room!.code}/start-voting`, { method: 'POST', headers: { 'Content-Type': 'application/json' } }); } catch (e) { console.error(e); } }} variant="rose" size="lg" fullWidth icon={<Vote size={22} color="#fff" />} />
          </View>
        )}

        {/* Result */}
        {phase === 'result' && (
          <View style={{ gap: 16 }}>
            <View style={[s.resultCard, { borderColor: Colors.impostor }]}>
              <Image source={impostorImg} style={{ height: 80, width: 80 }} resizeMode="contain" />
              <Text style={s.resultLabel}>Impostor{impIds.length > 1 ? 'es' : ''}:</Text>
              {impIds.map((id) => { const p = players.find((pl) => pl.uid === id); return <Text key={id} style={s.impName}>{p?.name || id}</Text>; })}
            </View>

            <View style={s.breakCard}>
              <Text style={s.secTitle}>Resultado da Votação</Text>
              {players.map((p) => {
                const c = vc[p.uid] || 0;
                const isI = impIds.includes(p.uid);
                return (
                  <View key={p.uid} style={s.breakRow}>
                    <Text style={s.breakName}>{isI ? '🔴 ' : '🟢 '}{p.name}</Text>
                    <View style={s.bar}><View style={[s.barFill, { width: `${players.length > 0 ? (c / players.length) * 100 : 0}%`, backgroundColor: isI ? Colors.impostor : Colors.blue }]} /></View>
                    <Text style={s.breakCount}>{c}</Text>
                  </View>
                );
              })}
            </View>

            <View style={s.breakCard}>
              <Text style={s.secTitle}>Votos</Text>
              {votes.map((v, i) => <Text key={i} style={s.voteDetail}>{v.playerName} → {v.targetName}</Text>)}
            </View>

            {isHost && <Button title="NOVA RODADA" onPress={returnToLobby} variant="orange" size="lg" fullWidth icon={<RotateCcw size={20} color="#fff" />} />}
          </View>
        )}

        {isHost && (phase === 'waiting' || (gd?.votingStarted && allVoted && !revealed)) && (
          <Button title="REVELAR RESULTADO" onPress={handleReveal} variant="rose" size="lg" fullWidth icon={<Eye size={20} color="#fff" />} />
        )}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { padding: 16, paddingBottom: 40 },
  panel: { backgroundColor: Colors.bgPanel, borderRadius: 48, padding: 24, borderWidth: 4, borderColor: Colors.panelBorder, gap: 16 },
  phaseHead: { alignItems: 'center', paddingVertical: 12 },
  phaseEmoji: { fontSize: 48, marginBottom: 8 },
  phaseTitle: { color: '#fff', fontSize: 24, fontWeight: '900', textAlign: 'center', letterSpacing: 1 },
  voteCount: { color: Colors.slate400, fontSize: 14, marginTop: 4, fontWeight: '700' },
  secTitle: { color: '#fff', fontSize: 16, fontWeight: '900', marginBottom: 8 },
  voteOpt: { backgroundColor: Colors.bgSlate800, borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14, borderWidth: 3, borderColor: Colors.slateBorder },
  voteOptSel: { borderColor: Colors.purple, backgroundColor: Colors.purple + '15' },
  voteAvatar: { width: 44, height: 44, borderRadius: 14, backgroundColor: Colors.bgSlate700, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.bgSlate700 },
  voteOptName: { color: Colors.slate300, fontSize: 17, fontWeight: '800' },
  resultCard: { backgroundColor: Colors.bgSlate800, borderRadius: 24, padding: 24, alignItems: 'center', borderWidth: 4, gap: 8 },
  resultLabel: { color: Colors.slate400, fontSize: 13, fontWeight: '700' },
  impName: { color: Colors.impostor, fontSize: 26, fontWeight: '900' },
  breakCard: { backgroundColor: Colors.bgSlate800, borderRadius: 20, padding: 16, borderWidth: 3, borderColor: Colors.slateBorder },
  breakRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  breakName: { color: '#fff', fontSize: 13, fontWeight: '700', width: 100 },
  bar: { flex: 1, height: 8, backgroundColor: Colors.bgSlate700, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
  breakCount: { color: '#fff', fontSize: 14, fontWeight: '900', width: 24, textAlign: 'right' },
  voteDetail: { color: Colors.slate400, fontSize: 13, marginBottom: 4, fontWeight: '600' },
});
