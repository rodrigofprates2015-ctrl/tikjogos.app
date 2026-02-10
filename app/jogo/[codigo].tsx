import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/lib/constants';
import { useGameStore } from '@/lib/gameStore';
import { ModeSelectScreen } from '@/components/ModeSelectScreen';
import { GameConfigScreen } from '@/components/GameConfigScreen';
import { GamePlayScreen } from '@/components/GamePlayScreen';
import { NotificationToast } from '@/components/NotificationToast';

export default function GameScreen() {
  const { codigo } = useLocalSearchParams<{ codigo: string }>();
  const router = useRouter();
  const { status, room } = useGameStore();
  const navLock = useRef(false);

  useEffect(() => {
    if (navLock.current) return;
    if (status === 'home' || !room) { navLock.current = true; router.replace('/'); return; }
    if (status === 'lobby') { navLock.current = true; router.replace(`/sala/${codigo}`); return; }
    navLock.current = false;
  }, [status, room]);

  const content = () => {
    switch (status) {
      case 'modeSelect': case 'submodeSelect': return <ModeSelectScreen />;
      case 'gameConfig': return <GameConfigScreen />;
      case 'playing': return <GamePlayScreen />;
      default: return <ModeSelectScreen />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgMain }}>
      <NotificationToast />
      {content()}
    </SafeAreaView>
  );
}
