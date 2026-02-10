import { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Zap, LogIn, Smartphone } from 'lucide-react-native';
import { Colors } from '@/lib/constants';
import { useGameStore } from '@/lib/gameStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { NotificationToast } from '@/components/NotificationToast';

const logoImpostor = require('@/assets/images/logo-impostor.png');
const { width: SW } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { user, status, isLoading, room, setUser, saveNickname, loadSavedNickname, createRoom, joinRoom } = useGameStore();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const navRef = useRef(false);

  useEffect(() => { loadSavedNickname().then((s) => { if (s) setName(s); }); }, []);

  useEffect(() => {
    if (status === 'lobby' && room && user && !navRef.current) {
      navRef.current = true;
      const t = setTimeout(() => {
        // Double-check state hasn't changed during the delay
        const s = useGameStore.getState();
        if (s.status === 'lobby' && s.room && s.user) {
          router.push(`/sala/${s.room.code}`);
        } else {
          navRef.current = false;
        }
      }, 150);
      return () => clearTimeout(t);
    }
    if (status === 'home') navRef.current = false;
  }, [status, room, user]);

  const ensureUser = useCallback((): boolean => {
    if (!name.trim()) { Alert.alert('', 'Digite seu nickname'); return false; }
    if (!user || user.name !== name.trim()) { setUser(name.trim()); saveNickname(name.trim()); }
    return true;
  }, [name, user]);

  const handleCreate = useCallback(async () => {
    if (!ensureUser()) return;
    setTimeout(() => useGameStore.getState().createRoom(), 50);
  }, [ensureUser]);

  const handleJoin = useCallback(async () => {
    if (!code.trim()) { Alert.alert('', 'Digite o código da sala'); return; }
    if (!ensureUser()) return;
    setTimeout(async () => {
      const ok = await useGameStore.getState().joinRoom(code.trim());
      if (!ok) Alert.alert('', 'Sala não encontrada ou cheia');
    }, 50);
  }, [code, ensureUser]);

  return (
    <SafeAreaView style={st.safe}>
      <NotificationToast />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={st.scroll} keyboardShouldPersistTaps="handled">
          <View style={st.panel}>
            {/* Logo */}
            <View style={st.logoWrap}>
              <Image source={logoImpostor} style={st.logo} resizeMode="contain" />
            </View>

            <View style={st.form}>
              {/* Nickname */}
              <Input placeholder="Seu nickname" value={name} onChangeText={setName} maxLength={20} autoCapitalize="none" returnKeyType="done" />

              {/* CRIAR SALA */}
              <Button
                title="CRIAR SALA"
                onPress={handleCreate}
                variant="orange"
                size="lg"
                fullWidth
                loading={isLoading}
                icon={<Zap size={22} strokeWidth={3} color="#fff" />}
              />

              {/* Divider */}
              <View style={st.divider}>
                <View style={st.divLine} /><Text style={st.divText}>OU</Text><View style={st.divLine} />
              </View>

              {/* Code */}
              <Input placeholder="CÓDIGO DA SALA" value={code} onChangeText={(v) => setCode(v.toUpperCase())} maxLength={6} autoCapitalize="characters" returnKeyType="go" onSubmitEditing={handleJoin} variant="code" />

              {/* ENTRAR */}
              <Button
                title="ENTRAR NA SALA"
                onPress={handleJoin}
                variant="green"
                size="lg"
                fullWidth
                loading={isLoading}
                icon={<LogIn size={22} strokeWidth={3} color="#fff" />}
              />

              <View style={st.divider}>
                <View style={st.divLine} /><Text style={st.divText}>OU</Text><View style={st.divLine} />
              </View>

              {/* MODO LOCAL */}
              <Button
                title="MODO LOCAL"
                onPress={() => router.push('/modo-local')}
                variant="purple"
                size="lg"
                fullWidth
                icon={<Smartphone size={22} strokeWidth={3} color="#fff" />}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bgMain },
  scroll: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 24 },
  panel: { backgroundColor: Colors.bgPanel, borderRadius: 48, padding: 24, borderWidth: 4, borderColor: Colors.panelBorder, width: '90%', maxWidth: 420, shadowColor: '#000', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.4, shadowRadius: 40, elevation: 20 },
  logoWrap: { alignItems: 'center', marginBottom: 12 },
  logo: { height: 120, width: SW * 0.6 },
  form: { gap: 12 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 4 },
  divLine: { flex: 1, height: 1, backgroundColor: '#4a6a8a' },
  divText: { color: '#8aa0b0', fontSize: 13, fontWeight: '800' },

});
