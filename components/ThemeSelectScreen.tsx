import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ArrowLeft, Sparkles, Check, Rocket } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/lib/constants';
import { useGameStore } from '@/lib/gameStore';
import { HomeButton } from '@/components/HomeButton';
import { THEMES } from '@/lib/themes';
import { Button } from '@/components/ui/Button';

export function ThemeSelectScreen() {
  const { room, user, backToModeSelect, goToGameConfig, setSelectedThemeCode } = useGameStore();
  const isHost = room?.hostId === user?.uid;
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (categoryId: string) => {
    if (!isHost) return;
    setSelected(categoryId === selected ? null : categoryId);
  };

  const handleProceed = async () => {
    if (!isHost) return;
    // Save as selectedSubmode in AsyncStorage — the server reads this to pick the word list
    if (selected) {
      await AsyncStorage.setItem('selectedSubmode', selected);
    }
    setSelectedThemeCode(selected);
    goToGameConfig();
  };

  const handleSkip = async () => {
    if (!isHost) return;
    // No theme = classic random words
    await AsyncStorage.setItem('selectedSubmode', 'classico');
    setSelectedThemeCode(null);
    goToGameConfig();
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
              <View style={s.titleIcon}>
                <Sparkles size={18} strokeWidth={3} color={Colors.purple} />
              </View>
              <Text style={s.title}>Escolha o Tema</Text>
            </View>
            <Text style={s.subtitle}>Selecione um tema ou jogue aleatório</Text>
          </View>
          <HomeButton />
        </View>

        {!isHost && (
          <View style={s.waitBanner}>
            <Text style={s.waitText}>Aguardando o host escolher o tema...</Text>
          </View>
        )}

        <ScrollView contentContainerStyle={s.grid} showsVerticalScrollIndicator={false}>
          {THEMES.map((theme) => {
            const isSelected = selected === theme.categoryId;
            return (
              <Pressable
                key={theme.slug}
                style={[s.themeCard, isSelected && s.themeCardSelected]}
                onPress={() => handleSelect(theme.categoryId)}
                disabled={!isHost}
              >
                <Text style={s.themeEmoji}>{theme.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={s.themeTitle}>{theme.name}</Text>
                  <Text style={s.themeSub}>{theme.wordCount} palavras</Text>
                </View>
                {isSelected && (
                  <View style={s.checkBadge}>
                    <Check size={16} strokeWidth={3} color="#fff" />
                  </View>
                )}
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Action buttons */}
        {isHost && (
          <View style={s.actions}>
            {selected ? (
              <Button
                title="CONFIGURAR PARTIDA"
                onPress={handleProceed}
                variant="green"
                size="lg"
                fullWidth
                icon={<Rocket size={22} strokeWidth={3} color="#fff" />}
              />
            ) : (
              <Button
                title="JOGAR ALEATÓRIO"
                onPress={handleSkip}
                variant="blue"
                size="lg"
                fullWidth
                icon={<Rocket size={22} strokeWidth={3} color="#fff" />}
              />
            )}
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
  titleIcon: { padding: 8, backgroundColor: Colors.purple + '15', borderRadius: 12, borderWidth: 2, borderColor: Colors.purple + '30' },
  title: { color: '#fff', fontSize: 20, fontWeight: '900' },
  subtitle: { color: Colors.slate400, fontSize: 13, fontWeight: '600' },
  waitBanner: { backgroundColor: Colors.bgSlate800, borderRadius: 16, padding: 14, marginBottom: 14, borderWidth: 2, borderColor: Colors.slateBorder },
  waitText: { color: Colors.slate400, fontSize: 14, textAlign: 'center', fontWeight: '700' },
  grid: { gap: 10, paddingBottom: 16 },
  themeCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 16, borderRadius: 22,
    backgroundColor: Colors.bgSlate800, borderWidth: 3, borderColor: Colors.slateBorder,
  },
  themeCardSelected: {
    borderColor: Colors.purple, backgroundColor: Colors.purple + '10',
  },
  themeEmoji: { fontSize: 32, width: 48, textAlign: 'center' },
  themeTitle: { color: '#fff', fontSize: 16, fontWeight: '900' },
  themeSub: { color: Colors.slate400, fontSize: 12, marginTop: 2, fontWeight: '600' },
  checkBadge: { width: 30, height: 30, borderRadius: 15, backgroundColor: Colors.purple, alignItems: 'center', justifyContent: 'center' },
  actions: { marginTop: 12 },
});
