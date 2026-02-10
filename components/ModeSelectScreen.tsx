import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { ArrowLeft, Rocket, MapPin, Swords, Target, HelpCircle, Globe, Check, X, Sparkles } from 'lucide-react-native';
import { Colors, API_BASE_URL } from '@/lib/constants';
import { useGameStore, GameModeType } from '@/lib/gameStore';
import { HomeButton } from '@/components/HomeButton';
import { THEMES, WORD_CATEGORIES, PublicTheme } from '@/lib/themes';

const MODES: Record<string, { Icon: any; bg: string; border: string }> = {
  palavraSecreta:      { Icon: Rocket,     bg: Colors.blue,    border: '#1e40af' },
  palavras:            { Icon: MapPin,     bg: Colors.emerald, border: Colors.greenBorder },
  duasFaccoes:         { Icon: Swords,     bg: Colors.rose,    border: Colors.roseBorder },
  categoriaItem:       { Icon: Target,     bg: Colors.yellow,  border: '#ca8a04' },
  perguntasDiferentes: { Icon: HelpCircle, bg: Colors.purple,  border: Colors.purpleBorder },
  palavraComunidade:   { Icon: Globe,      bg: Colors.pink,    border: '#9d174d' },
};

export function ModeSelectScreen() {
  const { gameModes, selectMode, backToLobby, room, user, goToGameConfig, startGame, selectedThemeCode, setSelectedThemeCode } = useGameStore();
  const isHost = room?.hostId === user?.uid;

  const [selectedModeId, setSelectedModeId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [communityThemes, setCommunityThemes] = useState<PublicTheme[]>([]);
  const [isLoadingThemes, setIsLoadingThemes] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    if (selectedModeId === 'palavraComunidade') {
      loadCommunityThemes();
    }
  }, [selectedModeId]);

  const loadCommunityThemes = async () => {
    setIsLoadingThemes(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/themes/public`);
      if (res.ok) {
        const themes = await res.json();
        setCommunityThemes(themes);
      }
    } catch (err) {
      console.error('Failed to load community themes:', err);
    } finally {
      setIsLoadingThemes(false);
    }
  };

  const handleSelectMode = (id: string) => {
    if (!isHost) return;
    setSelectedModeId(id);
    setSelectedThemeCode(null);
    setSelectedCategory(null);

    // Modes that need theme/category selection stay on this screen
    if (id === 'palavraComunidade' || id === 'palavraSecreta') {
      selectMode(id as GameModeType);
      return;
    }

    // Other modes go directly to game config
    selectMode(id as GameModeType);
    goToGameConfig();
  };

  const handleProceedToConfig = () => {
    if (!isHost || !selectedModeId) return;
    goToGameConfig();
  };

  const handleStartDirect = async () => {
    if (!isHost || !selectedModeId) return;
    setIsStarting(true);
    try {
      if (selectedModeId === 'palavraComunidade' && selectedThemeCode) {
        goToGameConfig();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsStarting(false);
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
          {/* Game Modes */}
          {gameModes.map((mode) => {
            const m = MODES[mode.id] || { Icon: Rocket, bg: Colors.bgSlate800, border: Colors.slateBorder };
            const isSelected = selectedModeId === mode.id;
            return (
              <Pressable
                key={mode.id}
                style={[s.card, { borderColor: isSelected ? m.bg : m.border }, isSelected && { backgroundColor: m.bg + '15' }]}
                onPress={() => handleSelectMode(mode.id)}
                disabled={!isHost}
              >
                <View style={s.cardRow}>
                  <View style={[s.cardIcon, { backgroundColor: m.bg }]}>
                    <m.Icon size={28} strokeWidth={2.5} color="#fff" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.cardTitle}>{mode.title}</Text>
                    <Text style={s.cardDesc} numberOfLines={2}>{mode.desc}</Text>
                  </View>
                  {isSelected && (
                    <View style={[s.checkBadge, { backgroundColor: m.bg }]}>
                      <Check size={16} strokeWidth={3} color="#fff" />
                    </View>
                  )}
                </View>
              </Pressable>
            );
          })}

          {/* Theme Selection for palavraComunidade */}
          {selectedModeId === 'palavraComunidade' && (
            <View style={s.themeSection}>
              <View style={s.themeSectionHeader}>
                <View style={s.themeSectionIcon}>
                  <Globe size={16} strokeWidth={3} color={Colors.pink} />
                </View>
                <Text style={s.themeSectionTitle}>Temas da Comunidade</Text>
              </View>

              {selectedThemeCode && (
                <View style={s.selectedBadge}>
                  <View style={s.selectedBadgeIcon}>
                    <Check size={18} strokeWidth={3} color="#fff" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.selectedBadgeTitle}>Tema Selecionado</Text>
                    <Text style={s.selectedBadgeSub}>Pronto para iniciar!</Text>
                  </View>
                  <Pressable onPress={() => setSelectedThemeCode(null)} hitSlop={8}>
                    <X size={18} strokeWidth={3} color={Colors.slate400} />
                  </Pressable>
                </View>
              )}

              {isLoadingThemes ? (
                <View style={s.loadingWrap}>
                  <ActivityIndicator color={Colors.pink} size="small" />
                  <Text style={s.loadingText}>Carregando temas...</Text>
                </View>
              ) : communityThemes.length === 0 ? (
                <Text style={s.emptyText}>Nenhum tema da comunidade disponível</Text>
              ) : (
                communityThemes.map((theme) => (
                  <Pressable
                    key={theme.id}
                    style={[s.themeCard, selectedThemeCode === theme.accessCode && s.themeCardSelected]}
                    onPress={() => setSelectedThemeCode(theme.accessCode)}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={s.themeCardTitle}>{theme.titulo}</Text>
                      <Text style={s.themeCardSub}>por {theme.autor} · {theme.palavrasCount} palavras</Text>
                    </View>
                    {selectedThemeCode === theme.accessCode && (
                      <View style={[s.checkBadge, { backgroundColor: Colors.pink }]}>
                        <Check size={14} strokeWidth={3} color="#fff" />
                      </View>
                    )}
                  </Pressable>
                ))
              )}

              {/* Built-in themes */}
              <Text style={[s.themeSectionTitle, { marginTop: 16, marginBottom: 8 }]}>Temas Oficiais</Text>
              {THEMES.map((theme) => (
                <Pressable
                  key={theme.slug}
                  style={[s.themeCard, selectedThemeCode === theme.categoryId && s.themeCardSelected]}
                  onPress={() => setSelectedThemeCode(theme.categoryId)}
                >
                  <Text style={s.themeEmoji}>{theme.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={s.themeCardTitle}>{theme.name}</Text>
                    <Text style={s.themeCardSub}>{theme.wordCount} palavras</Text>
                  </View>
                  {selectedThemeCode === theme.categoryId && (
                    <View style={[s.checkBadge, { backgroundColor: Colors.pink }]}>
                      <Check size={14} strokeWidth={3} color="#fff" />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          )}

          {/* Category Selection for palavraSecreta */}
          {selectedModeId === 'palavraSecreta' && (
            <View style={s.themeSection}>
              <View style={s.themeSectionHeader}>
                <View style={[s.themeSectionIcon, { backgroundColor: Colors.purple + '15', borderColor: Colors.purple + '30' }]}>
                  <Sparkles size={16} strokeWidth={3} color={Colors.purple} />
                </View>
                <Text style={s.themeSectionTitle}>Categorias de Palavras</Text>
              </View>

              {WORD_CATEGORIES.map((cat) => {
                const diffColor = cat.difficulty === 'fácil' ? Colors.green : cat.difficulty === 'médio' ? Colors.yellow : Colors.rose;
                return (
                  <Pressable
                    key={cat.id}
                    style={[s.themeCard, selectedCategory === cat.id && { borderColor: Colors.purple, backgroundColor: Colors.purple + '10' }]}
                    onPress={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  >
                    <Text style={s.themeEmoji}>{cat.emoji}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={s.themeCardTitle}>{cat.name}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
                        <View style={[s.diffBadge, { backgroundColor: diffColor + '20' }]}>
                          <Text style={[s.diffText, { color: diffColor }]}>{cat.difficulty.toUpperCase()}</Text>
                        </View>
                      </View>
                    </View>
                    {selectedCategory === cat.id && (
                      <View style={[s.checkBadge, { backgroundColor: Colors.purple }]}>
                        <Check size={14} strokeWidth={3} color="#fff" />
                      </View>
                    )}
                  </Pressable>
                );
              })}

              {/* Built-in themed categories for palavraSecreta */}
              <Text style={[s.themeSectionTitle, { marginTop: 16, marginBottom: 8 }]}>Temas Temáticos</Text>
              {THEMES.filter(t => t.slug !== 'classico').map((theme) => (
                <Pressable
                  key={theme.slug}
                  style={[s.themeCard, selectedCategory === theme.categoryId && { borderColor: Colors.purple, backgroundColor: Colors.purple + '10' }]}
                  onPress={() => setSelectedCategory(theme.categoryId === selectedCategory ? null : theme.categoryId)}
                >
                  <Text style={s.themeEmoji}>{theme.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={s.themeCardTitle}>{theme.name}</Text>
                    <Text style={s.themeCardSub}>{theme.wordCount} palavras</Text>
                  </View>
                  {selectedCategory === theme.categoryId && (
                    <View style={[s.checkBadge, { backgroundColor: Colors.purple }]}>
                      <Check size={14} strokeWidth={3} color="#fff" />
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          )}

          {/* Start / Proceed button */}
          {isHost && selectedModeId && (selectedModeId === 'palavraComunidade' || selectedModeId === 'palavraSecreta') && (
            <View style={{ marginTop: 8 }}>
              {selectedModeId === 'palavraComunidade' ? (
                <Pressable
                  style={[s.startBtn, !selectedThemeCode && s.startBtnDisabled]}
                  onPress={handleStartDirect}
                  disabled={!selectedThemeCode || isStarting}
                >
                  <Rocket size={24} strokeWidth={3} color={!selectedThemeCode ? Colors.slate500 : '#fff'} />
                  <Text style={[s.startBtnText, !selectedThemeCode && { color: Colors.slate500 }]}>
                    {isStarting ? 'INICIANDO...' : selectedThemeCode ? 'CONFIGURAR PARTIDA' : 'SELECIONE UM TEMA'}
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  style={s.startBtn}
                  onPress={handleProceedToConfig}
                >
                  <Rocket size={24} strokeWidth={3} color="#fff" />
                  <Text style={s.startBtnText}>
                    {selectedCategory ? 'CONFIGURAR PARTIDA' : 'CONFIGURAR (ALEATÓRIO)'}
                  </Text>
                </Pressable>
              )}
            </View>
          )}
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
  checkBadge: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },

  themeSection: { marginTop: 8, paddingTop: 16, borderTopWidth: 1, borderTopColor: Colors.bgSlate700 },
  themeSectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  themeSectionIcon: { padding: 8, backgroundColor: Colors.pink + '15', borderRadius: 12, borderWidth: 2, borderColor: Colors.pink + '30' },
  themeSectionTitle: { color: '#fff', fontSize: 16, fontWeight: '900' },

  selectedBadge: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 20, borderWidth: 2, borderColor: Colors.purple, backgroundColor: Colors.purple + '10', marginBottom: 12 },
  selectedBadgeIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.purple, alignItems: 'center', justifyContent: 'center' },
  selectedBadgeTitle: { color: Colors.purple, fontSize: 13, fontWeight: '800' },
  selectedBadgeSub: { color: Colors.slate400, fontSize: 11, marginTop: 2 },

  themeCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 20, backgroundColor: Colors.bgSlate800, borderWidth: 3, borderColor: Colors.slateBorder, marginBottom: 8 },
  themeCardSelected: { borderColor: Colors.pink, backgroundColor: Colors.pink + '10' },
  themeCardTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  themeCardSub: { color: Colors.slate400, fontSize: 12, marginTop: 2 },
  themeEmoji: { fontSize: 28, width: 44, textAlign: 'center' },

  diffBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  diffText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },

  loadingWrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 20 },
  loadingText: { color: Colors.slate400, fontSize: 13, fontWeight: '600' },
  emptyText: { color: Colors.slate500, fontSize: 13, textAlign: 'center', padding: 20 },

  startBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12,
    backgroundColor: Colors.green, paddingVertical: 18, paddingHorizontal: 28, borderRadius: 20,
    borderBottomWidth: 6, borderBottomColor: Colors.greenBorder,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10,
  },
  startBtnDisabled: { backgroundColor: Colors.bgSlate700, borderBottomColor: Colors.slateBorder, opacity: 0.5 },
  startBtnText: { color: '#fff', fontSize: 17, fontWeight: '900', letterSpacing: 1 },
});
