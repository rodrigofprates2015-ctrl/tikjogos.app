import { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { Copy, LogOut, Users, Crown, Send, MessageCircle, Gamepad2 } from 'lucide-react-native';
import { Colors } from '@/lib/constants';
import { useGameStore } from '@/lib/gameStore';
import { Button } from '@/components/ui/Button';
import { HomeButton } from '@/components/HomeButton';
import { NotificationToast } from '@/components/NotificationToast';

export default function LobbyScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();
  const router = useRouter();
  const { user, room, status, isDisconnected, lobbyChatMessages, goToModeSelect, leaveGame, sendLobbyChat, kickPlayer } = useGameStore();
  const [chatMsg, setChatMsg] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [copied, setCopied] = useState(false);
  const chatRef = useRef<FlatList>(null);
  const navLock = useRef(false);

  useEffect(() => {
    if (navLock.current) return;
    if (status === 'modeSelect' || status === 'submodeSelect' || status === 'gameConfig' || status === 'playing') {
      navLock.current = true;
      router.push(`/jogo/${codigo}`);
    }
    // Only go home if explicitly set (leaveGame was called)
    if (status === 'home' && !room) {
      navLock.current = true;
      router.replace('/');
    }
    if (status === 'lobby') navLock.current = false;
  }, [status]);

  const isHost = room?.hostId === user?.uid;
  const players = room?.players || [];
  const active = players.filter((p) => p.connected !== false);

  const handleCopy = async () => {
    if (room?.code) { await Clipboard.setStringAsync(room.code); setCopied(true); setTimeout(() => setCopied(false), 2000); }
  };

  const handleLeave = () => {
    Alert.alert('Sair da Sala', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => {
        leaveGame();
        // leaveGame already sets status='home', the useEffect will handle navigation
        // but also navigate explicitly as backup
        setTimeout(() => router.replace('/'), 50);
      }},
    ]);
  };

  const handleKick = (pid: string, pname: string) => {
    if (!isHost) return;
    Alert.alert('Expulsar Jogador', `Expulsar ${pname} da sala?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Expulsar', style: 'destructive', onPress: () => kickPlayer(pid) },
    ]);
  };

  const handleSend = () => { if (chatMsg.trim()) { sendLobbyChat(chatMsg); setChatMsg(''); } };

  return (
    <SafeAreaView style={s.safe}>
      <NotificationToast />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={s.container}>
          <View style={s.panel}>
            {/* Header */}
            <View style={s.header}>
              <View style={{ flex: 1 }}>
                <Text style={s.codeLabel}>CÓDIGO DA SALA</Text>
                <Pressable onPress={handleCopy} style={s.codeRow} hitSlop={8}>
                  <Text style={s.codeText}>{room?.code || codigo}</Text>
                  <View style={s.copyBtn}>
                    <Copy size={18} strokeWidth={3} color={Colors.orange} />
                  </View>
                </Pressable>
                <Text style={s.copyHint}>{copied ? '✓ Copiado!' : 'Toque para copiar'}</Text>
              </View>
              <View style={s.headerBtns}>
                <HomeButton />
                <Pressable onPress={handleLeave} hitSlop={8} style={s.iconBtn}>
                  <LogOut size={22} strokeWidth={3} color={Colors.rose} />
                </Pressable>
              </View>
            </View>

            {isDisconnected && (
              <View style={s.discBar}><Text style={s.discText}>Conexão perdida. Reconectando...</Text></View>
            )}

            {/* Players */}
            <View style={s.playersHead}>
              <View style={s.playersHeadLeft}>
                <View style={s.iconBadge}><Users size={16} strokeWidth={3} color={Colors.blue} /></View>
                <Text style={s.playersTitle}>Tripulantes na Nave</Text>
                <View style={s.countBadge}><Text style={s.countText}>{active.length}</Text></View>
              </View>
            </View>

            <FlatList
              data={players}
              keyExtractor={(p) => p.uid}
              style={s.playerList}
              contentContainerStyle={{ gap: 10 }}
              renderItem={({ item }) => {
                const isMe = item.uid === user?.uid;
                const isH = item.uid === room?.hostId;
                const disc = item.connected === false;
                return (
                  <Pressable
                    style={[s.pCard, isMe && s.pCardMe, disc && { opacity: 0.5 }]}
                    onLongPress={() => { if (isHost && !isMe) handleKick(item.uid, item.name); }}
                  >
                    <View style={s.pLeft}>
                      <View style={[s.pAvatar, isH && { backgroundColor: Colors.orange + '20', borderColor: Colors.orange + '40' }]}>
                        {isH ? <Crown size={18} strokeWidth={3} color={Colors.orange} /> : <Users size={18} strokeWidth={3} color={Colors.slate400} />}
                      </View>
                      <View>
                        <Text style={[s.pName, disc && { color: Colors.slate500 }]}>{item.name}{isMe ? ' (você)' : ''}</Text>
                        {isH && <Text style={s.hostLabel}>Host da Sala</Text>}
                        {disc && <Text style={s.discLabel}>Desconectado</Text>}
                      </View>
                    </View>
                  </Pressable>
                );
              }}
            />

            {/* Chat */}
            {showChat && (
              <View style={s.chatBox}>
                <FlatList ref={chatRef} data={lobbyChatMessages} keyExtractor={(m) => m.id} style={s.chatList}
                  onContentSizeChange={() => chatRef.current?.scrollToEnd()}
                  renderItem={({ item }) => (
                    <View style={s.chatRow}><Text style={s.chatSender}>{item.senderName}:</Text><Text style={s.chatText}>{item.message}</Text></View>
                  )}
                  ListEmptyComponent={<Text style={s.chatEmpty}>Nenhuma mensagem</Text>}
                />
                <View style={s.chatInputRow}>
                  <TextInput style={s.chatInput} value={chatMsg} onChangeText={setChatMsg} placeholder="Mensagem..." placeholderTextColor={Colors.slate500} returnKeyType="send" onSubmitEditing={handleSend} />
                  <Pressable onPress={handleSend} style={s.chatSendBtn} hitSlop={8}>
                    <Send size={16} strokeWidth={3} color="#fff" />
                  </Pressable>
                </View>
              </View>
            )}

            {/* Actions */}
            <View style={s.actions}>
              <Button title={showChat ? 'FECHAR CHAT' : 'CHAT'} onPress={() => setShowChat(!showChat)} variant="slate" size="sm"
                icon={<MessageCircle size={16} strokeWidth={3} color={Colors.slate400} />} />

              {isHost ? (
                <Button title="ESCOLHER MODO DE JOGO" onPress={goToModeSelect} variant="green" size="lg" fullWidth disabled={active.length < 3}
                  icon={<Gamepad2 size={22} strokeWidth={3} color="#fff" />} />
              ) : (
                <View style={s.waitHost}><Text style={s.waitHostText}>Aguardando o host iniciar o jogo...</Text></View>
              )}
              {isHost && active.length < 3 && <Text style={s.minHint}>Mínimo de 3 tripulantes para iniciar</Text>}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgMain },
  container: { flex: 1, paddingHorizontal: 16, paddingVertical: 16 },
  panel: { flex: 1, backgroundColor: Colors.bgPanel, borderRadius: 48, padding: 24, borderWidth: 4, borderColor: Colors.panelBorder },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  codeLabel: { color: Colors.slate400, fontSize: 10, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 },
  codeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  codeText: { fontSize: 36, fontWeight: '900', letterSpacing: 8, color: Colors.orange, fontFamily: 'monospace' },
  copyBtn: { padding: 10, backgroundColor: Colors.orange + '15', borderRadius: 16, borderWidth: 2, borderColor: Colors.orange + '30' },
  copyHint: { color: Colors.slate500, fontSize: 11, marginTop: 4, fontWeight: '600' },
  headerBtns: { flexDirection: 'row', gap: 8 },
  iconBtn: { padding: 12, backgroundColor: Colors.bgSlate800, borderRadius: 16, borderBottomWidth: 4, borderBottomColor: Colors.slateBorder },
  discBar: { backgroundColor: Colors.rose + '20', borderRadius: 12, padding: 12, marginBottom: 12 },
  discText: { color: Colors.rose, fontSize: 13, fontWeight: '700', textAlign: 'center' },
  playersHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  playersHeadLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBadge: { padding: 8, backgroundColor: Colors.blue + '15', borderRadius: 12, borderWidth: 2, borderColor: Colors.blue + '30' },
  playersTitle: { color: '#fff', fontSize: 16, fontWeight: '900' },
  countBadge: { backgroundColor: Colors.blue, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99, borderWidth: 2, borderColor: '#1e40af' },
  countText: { color: '#fff', fontSize: 13, fontWeight: '900' },
  playerList: { maxHeight: 260 },
  pCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: Colors.bgSlate800, borderRadius: 20, padding: 14, borderWidth: 3, borderColor: Colors.slateBorder },
  pCardMe: { borderColor: Colors.purple + '50', backgroundColor: Colors.purple + '10' },
  pLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  pAvatar: { width: 44, height: 44, borderRadius: 14, backgroundColor: Colors.bgSlate700, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.bgSlate700 },
  pName: { color: '#fff', fontSize: 15, fontWeight: '800' },
  hostLabel: { color: Colors.orange, fontSize: 11, fontWeight: '800' },
  discLabel: { color: Colors.slate500, fontSize: 11, fontWeight: '600' },
  chatBox: { backgroundColor: Colors.bgSlate800, borderRadius: 16, borderWidth: 2, borderColor: Colors.slateBorder, maxHeight: 180, marginTop: 12, overflow: 'hidden' },
  chatList: { maxHeight: 120, paddingHorizontal: 12, paddingTop: 8 },
  chatRow: { flexDirection: 'row', gap: 6, marginBottom: 4 },
  chatSender: { color: Colors.orange, fontSize: 13, fontWeight: '800' },
  chatText: { color: '#fff', fontSize: 13, flex: 1 },
  chatEmpty: { color: Colors.slate500, fontSize: 13, textAlign: 'center', padding: 16 },
  chatInputRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: Colors.panelBorder, alignItems: 'center' },
  chatInput: { flex: 1, color: '#fff', paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 },
  chatSendBtn: { backgroundColor: Colors.orange, borderRadius: 10, padding: 10, marginRight: 6 },
  actions: { marginTop: 16, gap: 10, alignItems: 'center' },
  waitHost: { backgroundColor: Colors.bgSlate800, borderRadius: 16, padding: 16, width: '100%', alignItems: 'center', borderWidth: 2, borderColor: Colors.slateBorder },
  waitHostText: { color: Colors.slate400, fontSize: 15, fontWeight: '700' },
  minHint: { color: Colors.slate500, fontSize: 12, fontWeight: '700', textAlign: 'center' },
});
