import { useState } from 'react';
import { View, Text, StyleSheet, Switch, Pressable } from 'react-native';
import { ArrowLeft, Play, Settings, Minus, Plus } from 'lucide-react-native';
import { Colors } from '@/lib/constants';
import { useGameStore, GameConfig } from '@/lib/gameStore';
import { Button } from '@/components/ui/Button';
import { HomeButton } from '@/components/HomeButton';

export function GameConfigScreen() {
  const { room, user, backToModeSelect, startGameWithConfig } = useGameStore();
  const isHost = room?.hostId === user?.uid;
  const pc = room?.players.filter((p) => p.connected !== false).length || 0;
  const maxImp = Math.max(1, Math.floor(pc / 3));
  const [imp, setImp] = useState(1);
  const [hints, setHints] = useState(false);
  const [firstOnly, setFirstOnly] = useState(true);
  const [starting, setStarting] = useState(false);

  const handleStart = async () => {
    if (!isHost) return;
    setStarting(true);
    try {
      // For palavraSecreta, the theme is sent via selectedSubmode (AsyncStorage), not themeCode.
      // themeCode is only for palavraComunidade (community-created themes with accessCode).
      await startGameWithConfig({ impostorCount: imp, enableHints: hints, firstPlayerHintOnly: firstOnly });
    }
    catch (e) { console.error(e); }
    finally { setStarting(false); }
  };

  return (
    <View style={s.container}>
      <View style={s.panel}>
        <View style={s.header}>
          <Pressable onPress={backToModeSelect} hitSlop={8} style={s.backBtn}>
            <ArrowLeft size={22} strokeWidth={3} color={Colors.slate300} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <View style={{ padding: 8, backgroundColor: Colors.orange + '15', borderRadius: 12, borderWidth: 2, borderColor: Colors.orange + '30' }}>
                <Settings size={18} strokeWidth={3} color={Colors.orange} />
              </View>
              <Text style={s.title}>Configuração da Partida</Text>
            </View>
            <Text style={s.subtitle}>Personalize as regras do jogo</Text>
          </View>
          <HomeButton />
        </View>

        {!isHost && <View style={s.waitBanner}><Text style={s.waitText}>Aguardando o host configurar...</Text></View>}

        {/* Impostor count */}
        <View style={s.section}>
          <Text style={s.sectionLabel}>Quantidade de Impostores</Text>
          <View style={s.counterRow}>
            <Pressable style={[s.counterBtn, imp <= 1 && { opacity: 0.3 }]} onPress={() => setImp(Math.max(1, imp - 1))} disabled={!isHost || imp <= 1} hitSlop={8}>
              <Minus size={22} strokeWidth={3} color="#fff" />
            </Pressable>
            <Text style={s.counterVal}>{imp}</Text>
            <Pressable style={[s.counterBtn, imp >= maxImp && { opacity: 0.3 }]} onPress={() => setImp(Math.min(maxImp, imp + 1))} disabled={!isHost || imp >= maxImp} hitSlop={8}>
              <Plus size={22} strokeWidth={3} color="#fff" />
            </Pressable>
          </View>
        </View>

        <View style={{ height: 1, backgroundColor: Colors.bgSlate700, marginVertical: 16 }} />

        {/* Hints */}
        <View style={s.section}>
          <Text style={{ color: Colors.slate400, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 12 }}>SISTEMA DE DICAS</Text>
          <View style={s.toggleRow}>
            <View style={{ flex: 1 }}><Text style={s.toggleLabel}>Dica para o Impostor</Text><Text style={s.toggleSub}>O impostor recebe uma pista vaga sobre a palavra.</Text></View>
            <Switch value={hints} onValueChange={setHints} disabled={!isHost} trackColor={{ false: Colors.bgSlate700, true: Colors.green + '60' }} thumbColor={hints ? Colors.green : Colors.slate500} />
          </View>
          {hints && (
            <View style={[s.toggleRow, { marginTop: 12 }]}>
              <View style={{ flex: 1 }}><Text style={s.toggleLabel}>Dica Apenas se for o Primeiro</Text><Text style={s.toggleSub}>Se o impostor não for o primeiro a falar, não recebe dica.</Text></View>
              <Switch value={firstOnly} onValueChange={setFirstOnly} disabled={!isHost} trackColor={{ false: Colors.bgSlate700, true: Colors.green + '60' }} thumbColor={firstOnly ? Colors.green : Colors.slate500} />
            </View>
          )}
        </View>

        {/* Summary */}
        <View style={s.summary}>
          <Text style={s.summaryText}>
            Haverá <Text style={{ color: Colors.rose, fontWeight: '900' }}>{imp} impostor(es)</Text> nesta rodada.
            {hints ? (firstOnly ? ' Dica apenas para o 1º a falar.' : ' Dica ativada.') : ' Sem dicas.'}
          </Text>
        </View>

        {isHost && (
          <View style={{ marginTop: 20 }}>
            <Button title="INICIAR PARTIDA" onPress={handleStart} variant="green" size="lg" fullWidth loading={starting}
              icon={<Play size={22} strokeWidth={3} color="#fff" />} />
          </View>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  panel: { flex: 1, backgroundColor: Colors.bgPanel, borderRadius: 48, padding: 24, borderWidth: 4, borderColor: Colors.panelBorder },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  backBtn: { padding: 12, backgroundColor: Colors.bgSlate800, borderRadius: 16, borderBottomWidth: 4, borderBottomColor: Colors.slateBorder },
  title: { color: '#fff', fontSize: 18, fontWeight: '900' },
  subtitle: { color: Colors.slate400, fontSize: 13, fontWeight: '600' },
  waitBanner: { backgroundColor: Colors.bgSlate800, borderRadius: 16, padding: 14, marginBottom: 14, borderWidth: 2, borderColor: Colors.slateBorder },
  waitText: { color: Colors.slate400, fontSize: 14, textAlign: 'center', fontWeight: '700' },
  section: {},
  sectionLabel: { color: '#fff', fontSize: 15, fontWeight: '800', marginBottom: 14 },
  counterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 28 },
  counterBtn: { width: 52, height: 52, borderRadius: 16, backgroundColor: Colors.bgSlate800, borderBottomWidth: 4, borderBottomColor: Colors.slateBorder, alignItems: 'center', justifyContent: 'center' },
  counterVal: { color: Colors.rose, fontSize: 48, fontWeight: '900', minWidth: 50, textAlign: 'center' },
  toggleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  toggleLabel: { color: '#fff', fontSize: 14, fontWeight: '800' },
  toggleSub: { color: Colors.slate400, fontSize: 12, marginTop: 2 },
  summary: { backgroundColor: '#0f172a80', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: Colors.bgSlate800, marginTop: 16 },
  summaryText: { color: Colors.slate400, fontSize: 12, lineHeight: 18 },
});
