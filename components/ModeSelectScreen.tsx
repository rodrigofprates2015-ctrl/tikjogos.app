import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ArrowLeft, Rocket, MapPin, Swords, Target, HelpCircle, Globe } from 'lucide-react-native';
import { Colors } from '@/lib/constants';
import { useGameStore, GameModeType } from '@/lib/gameStore';
import { HomeButton } from '@/components/HomeButton';

const MODES: Record<string, { Icon: any; bg: string; border: string }> = {
  palavraSecreta:      { Icon: Rocket,     bg: Colors.blue,    border: '#1e40af' },
  palavras:            { Icon: MapPin,     bg: Colors.emerald, border: Colors.greenBorder },
  duasFaccoes:         { Icon: Swords,     bg: Colors.rose,    border: Colors.roseBorder },
  categoriaItem:       { Icon: Target,     bg: Colors.yellow,  border: '#ca8a04' },
  perguntasDiferentes: { Icon: HelpCircle, bg: Colors.purple,  border: Colors.purpleBorder },
  palavraComunidade:   { Icon: Globe,      bg: Colors.pink,    border: '#9d174d' },
};

export function ModeSelectScreen() {
  const { gameModes, selectMode, backToLobby, room, user, goToGameConfig } = useGameStore();
  const isHost = room?.hostId === user?.uid;

  const handleSelect = (id: string) => {
    if (!isHost) return;
    selectMode(id as GameModeType);
    // palavraSecreta → submodeSelect (theme selection screen) via the store
    // all other modes → gameConfig directly
    if (id !== 'palavraSecreta') {
      goToGameConfig();
    }
  };

  return (
    <View style={s.container}>
      <View style={s.panel}>
        <View style={s.header}>
          <Pressable onPress={backToLobby} hitSlop={8} style={s.backBtn}>
            <ArrowLeft size={22} strokeWidth={3} color={Colors.slate300} />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={s.title}>Modo de Jogo</Text>
            <Text style={s.subtitle}>Escolha como jogar</Text>
          </View>
          <HomeButton />
        </View>

        {!isHost && (
          <View style={s.waitBanner}><Text style={s.waitText}>Aguardando o host escolher o modo...</Text></View>
        )}

        <ScrollView contentContainerStyle={s.grid} showsVerticalScrollIndicator={false}>
          {gameModes.map((mode) => {
            const m = MODES[mode.id] || { Icon: Rocket, bg: Colors.bgSlate800, border: Colors.slateBorder };
            return (
              <Pressable key={mode.id} style={[s.card, { borderColor: m.border }]} onPress={() => handleSelect(mode.id)} disabled={!isHost}>
                <View style={s.cardRow}>
                  <View style={[s.cardIcon, { backgroundColor: m.bg }]}>
                    <m.Icon size={28} strokeWidth={2.5} color="#fff" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.cardTitle}>{mode.title}</Text>
                    <Text style={s.cardDesc} numberOfLines={2}>{mode.desc}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  panel: { flex: 1, backgroundColor: Colors.bgPanel, borderRadius: 48, padding: 24, borderWidth: 4, borderColor: Colors.panelBorder },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  backBtn: { padding: 12, backgroundColor: Colors.bgSlate800, borderRadius: 16, borderBottomWidth: 4, borderBottomColor: Colors.slateBorder },
  title: { color: '#fff', fontSize: 24, fontWeight: '900' },
  subtitle: { color: Colors.slate400, fontSize: 13, fontWeight: '600' },
  waitBanner: { backgroundColor: Colors.bgSlate800, borderRadius: 16, padding: 14, marginBottom: 14, borderWidth: 2, borderColor: Colors.slateBorder },
  waitText: { color: Colors.slate400, fontSize: 14, textAlign: 'center', fontWeight: '700' },
  grid: { gap: 12, paddingBottom: 20 },
  card: { backgroundColor: Colors.bgSlate800, borderRadius: 24, padding: 16, borderWidth: 4 },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  cardIcon: { width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(0,0,0,0.15)' },
  cardTitle: { color: '#fff', fontSize: 17, fontWeight: '900', marginBottom: 2 },
  cardDesc: { color: Colors.slate400, fontSize: 12, lineHeight: 17 },
});
