import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeft, Play, Minus, Plus, Users } from 'lucide-react-native';
import { Colors } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { HomeButton } from '@/components/HomeButton';

// All themes from the web app
const THEMES = [
  { id: 'classico', name: 'Clássico', icon: '🎲' },
  { id: 'natal', name: 'Natal', icon: '🎄' },
  { id: 'clash-royale', name: 'Clash Royale', icon: '⚔️' },
  { id: 'animes', name: 'Mundo dos Animes', icon: '🎌' },
  { id: 'super-herois', name: 'Super-Heróis', icon: '🦸' },
  { id: 'stranger-things', name: 'Stranger Things', icon: '👾' },
  { id: 'futebol', name: 'Futebol', icon: '⚽' },
  { id: 'disney', name: 'Disney', icon: '🏰' },
  { id: 'valorant', name: 'Valorant', icon: '🎯' },
  { id: 'roblox', name: 'Roblox', icon: '🧱' },
  { id: 'supernatural', name: 'Supernatural', icon: '😈' },
  { id: 'dragon-ball', name: 'Dragon Ball', icon: '🐉' },
  { id: 'naruto', name: 'Naruto', icon: '🍥' },
  { id: 'one-piece', name: 'One Piece', icon: '🏴‍☠️' },
  { id: 'comidas', name: 'Comidas', icon: '🍕' },
  { id: 'animais', name: 'Animais', icon: '🐾' },
];

// Words per theme (local mode uses a subset)
const WORDS: Record<string, string[]> = {
  classico: ['Cadeira', 'Hospital', 'Pizza', 'Cachorro', 'Futebol', 'Escola', 'Praia', 'Avião', 'Chocolate', 'Montanha', 'Relógio', 'Espelho', 'Garfo', 'Almofada', 'Tinta', 'Janela', 'Castelo', 'Abacaxi', 'Escada', 'Leão'],
  natal: ['Papai Noel', 'Rena', 'Árvore de Natal', 'Presente', 'Neve', 'Trenó', 'Estrela', 'Meia', 'Boneco de Neve', 'Panetone', 'Guirlanda', 'Sino', 'Vela', 'Peru', 'Presépio'],
  'clash-royale': ['Príncipe', 'Gigante', 'Bruxa', 'Dragão', 'Golem', 'Esqueleto', 'Mago', 'Valquíria', 'Arqueiras', 'Balão', 'Torre', 'Elixir', 'Horda', 'Pekka', 'Lenhador'],
  animes: ['Goku', 'Naruto', 'Luffy', 'Pikachu', 'Sailor Moon', 'Vegeta', 'Sasuke', 'Zoro', 'Light Yagami', 'Eren', 'Tanjiro', 'Gon', 'Saitama', 'Levi', 'Itachi'],
  'super-herois': ['Homem-Aranha', 'Batman', 'Superman', 'Mulher-Maravilha', 'Homem de Ferro', 'Thor', 'Hulk', 'Capitão América', 'Flash', 'Aquaman', 'Pantera Negra', 'Wolverine', 'Deadpool', 'Viúva Negra', 'Gavião Arqueiro'],
  'stranger-things': ['Eleven', 'Demogorgon', 'Mundo Invertido', 'Hawkins', 'Waffle', 'Bicicleta', 'Walkie-Talkie', 'Laboratório', 'Mind Flayer', 'Vecna', 'Max', 'Dustin', 'Steve', 'Hopper', 'Joyce'],
  futebol: ['Gol', 'Pênalti', 'Escanteio', 'Cartão Vermelho', 'Impedimento', 'Drible', 'Goleiro', 'Zagueiro', 'Meia', 'Atacante', 'Falta', 'Torcida', 'Estádio', 'Chuteira', 'Bola'],
  disney: ['Mickey', 'Elsa', 'Simba', 'Buzz Lightyear', 'Ariel', 'Aladdin', 'Mulan', 'Rapunzel', 'Moana', 'Stitch', 'Woody', 'Nemo', 'Cinderela', 'Bambi', 'Dumbo'],
  valorant: ['Jett', 'Sage', 'Phoenix', 'Reyna', 'Omen', 'Sova', 'Killjoy', 'Cypher', 'Viper', 'Brimstone', 'Raze', 'Breach', 'Skye', 'Yoru', 'Chamber'],
  roblox: ['Adopt Me', 'Blox Fruits', 'Tower of Hell', 'Brookhaven', 'Murder Mystery', 'Robux', 'Avatar', 'Obby', 'Noob', 'Piggy', 'Jailbreak', 'Arsenal', 'Bee Swarm', 'Pet Simulator', 'Doors'],
  supernatural: ['Dean', 'Sam', 'Castiel', 'Impala', 'Demônio', 'Anjo', 'Sal', 'Colt', 'Bobby', 'Crowley', 'Lúcifer', 'Apocalipse', 'Caçador', 'Fantasma', 'Crossroads'],
  'dragon-ball': ['Goku', 'Vegeta', 'Freeza', 'Cell', 'Gohan', 'Piccolo', 'Krillin', 'Kamehameha', 'Esfera do Dragão', 'Shenlong', 'Super Saiyajin', 'Namekusei', 'Senzu', 'Buu', 'Trunks'],
  naruto: ['Naruto', 'Sasuke', 'Sakura', 'Kakashi', 'Rasengan', 'Sharingan', 'Akatsuki', 'Hokage', 'Kunai', 'Jutsu', 'Konoha', 'Itachi', 'Gaara', 'Hinata', 'Orochimaru'],
  'one-piece': ['Luffy', 'Zoro', 'Nami', 'Sanji', 'Chopper', 'Robin', 'Franky', 'Brook', 'Jinbe', 'Shanks', 'Barba Negra', 'Ace', 'Going Merry', 'Grand Line', 'Akuma no Mi'],
  comidas: ['Sushi', 'Pastel', 'Feijoada', 'Hambúrguer', 'Panqueca', 'Pizza', 'Lasanha', 'Brigadeiro', 'Açaí', 'Tapioca', 'Coxinha', 'Pão de Queijo', 'Churrasco', 'Sorvete', 'Bolo'],
  animais: ['Gato', 'Elefante', 'Coruja', 'Tubarão', 'Pinguim', 'Leão', 'Girafa', 'Cobra', 'Águia', 'Golfinho', 'Urso', 'Macaco', 'Cavalo', 'Borboleta', 'Tartaruga'],
};

export default function ModoLocalScreen() {
  const router = useRouter();
  const [numP, setNumP] = useState(3);
  const [numI, setNumI] = useState(1);
  const [names, setNames] = useState<string[]>(['', '', '']);
  const [theme, setTheme] = useState('classico');

  useEffect(() => {
    AsyncStorage.getItem('modoLocal_names').then((s) => { if (s) { const n = JSON.parse(s); setNames(n); setNumP(n.length); } });
  }, []);

  useEffect(() => {
    setNames((prev) => prev.length < numP ? [...prev, ...Array(numP - prev.length).fill('')] : prev.slice(0, numP));
  }, [numP]);

  const handleStart = () => {
    const filled = names.map((n, i) => n.trim() || `Jogador ${i + 1}`);
    if (numI >= numP) { Alert.alert('', 'Impostores devem ser menos que jogadores'); return; }
    AsyncStorage.setItem('modoLocal_names', JSON.stringify(filled));
    const words = WORDS[theme] || WORDS.classico;
    const word = words[Math.floor(Math.random() * words.length)];
    const indices = Array.from({ length: numP }, (_, i) => i).sort(() => Math.random() - 0.5);
    const impIdx = indices.slice(0, numI);
    router.push({ pathname: '/modo-local/jogo', params: { players: JSON.stringify(filled), word, impostors: JSON.stringify(impIdx), theme } });
  };

  return (
    <SafeAreaView style={st.safe}>
      <ScrollView contentContainerStyle={st.scroll} keyboardShouldPersistTaps="handled">
        <View style={st.panel}>
          <View style={st.header}>
            <Pressable onPress={() => router.back()} hitSlop={8} style={st.backBtn}>
              <ArrowLeft size={22} strokeWidth={3} color={Colors.slate300} />
            </Pressable>
            <View style={{ flex: 1 }}><Text style={st.title}>Modo Local</Text><Text style={st.subtitle}>Passe o celular entre os jogadores</Text></View>
            <HomeButton />
          </View>

          {/* Players */}
          <View style={st.section}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Users size={18} color={Colors.blue} /><Text style={st.secTitle}>Jogadores</Text>
            </View>
            <View style={st.counterRow}>
              <Pressable style={[st.counterBtn, numP <= 3 && { opacity: 0.3 }]} onPress={() => setNumP(Math.max(3, numP - 1))} hitSlop={8}><Minus size={22} color="#fff" /></Pressable>
              <Text style={st.counterVal}>{numP}</Text>
              <Pressable style={[st.counterBtn, numP >= 15 && { opacity: 0.3 }]} onPress={() => setNumP(Math.min(15, numP + 1))} hitSlop={8}><Plus size={22} color="#fff" /></Pressable>
            </View>
          </View>

          {/* Impostors */}
          <View style={st.section}>
            <Text style={st.secTitle}>Impostores</Text>
            <View style={st.counterRow}>
              <Pressable style={[st.counterBtn, numI <= 1 && { opacity: 0.3 }]} onPress={() => setNumI(Math.max(1, numI - 1))} hitSlop={8}><Minus size={22} color="#fff" /></Pressable>
              <Text style={[st.counterVal, { color: Colors.rose }]}>{numI}</Text>
              <Pressable style={[st.counterBtn, numI >= Math.floor(numP / 2) && { opacity: 0.3 }]} onPress={() => setNumI(Math.min(Math.floor(numP / 2), numI + 1))} hitSlop={8}><Plus size={22} color="#fff" /></Pressable>
            </View>
          </View>

          {/* Names */}
          <View style={st.section}>
            <Text style={st.secTitle}>Nomes</Text>
            {names.map((n, i) => (
              <Input key={i} placeholder={`Jogador ${i + 1}`} value={n} onChangeText={(t) => { const u = [...names]; u[i] = t; setNames(u); }} containerStyle={{ marginBottom: 8 }} />
            ))}
          </View>

          {/* Themes */}
          <View style={st.section}>
            <Text style={st.secTitle}>Tema</Text>
            <View style={st.themeGrid}>
              {THEMES.map((t) => (
                <Pressable key={t.id} style={[st.themeChip, theme === t.id && st.themeChipSel]} onPress={() => setTheme(t.id)}>
                  <Text style={{ fontSize: 18 }}>{t.icon}</Text>
                  <Text style={[st.themeName, theme === t.id && { color: Colors.purple }]}>{t.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Button title="INICIAR JOGO" onPress={handleStart} variant="green" size="lg" fullWidth icon={<Play size={22} color="#fff" />} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgMain },
  scroll: { padding: 16, paddingBottom: 40 },
  panel: { backgroundColor: Colors.bgPanel, borderRadius: 48, padding: 24, borderWidth: 4, borderColor: Colors.panelBorder, gap: 16 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 },
  backBtn: { padding: 12, backgroundColor: Colors.bgSlate800, borderRadius: 16, borderBottomWidth: 4, borderBottomColor: Colors.slateBorder },
  title: { color: '#fff', fontSize: 20, fontWeight: '900' },
  subtitle: { color: Colors.slate400, fontSize: 13, fontWeight: '600' },
  section: {},
  secTitle: { color: '#fff', fontSize: 16, fontWeight: '900', marginBottom: 12 },
  counterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 28 },
  counterBtn: { width: 52, height: 52, borderRadius: 16, backgroundColor: Colors.bgSlate800, borderBottomWidth: 4, borderBottomColor: Colors.slateBorder, alignItems: 'center', justifyContent: 'center' },
  counterVal: { color: Colors.blue, fontSize: 48, fontWeight: '900', minWidth: 50, textAlign: 'center' },
  themeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  themeChip: { backgroundColor: Colors.bgSlate800, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 2, borderColor: Colors.slateBorder },
  themeChipSel: { borderColor: Colors.purple, backgroundColor: Colors.purple + '15' },
  themeName: { color: '#fff', fontSize: 13, fontWeight: '700' },
});
