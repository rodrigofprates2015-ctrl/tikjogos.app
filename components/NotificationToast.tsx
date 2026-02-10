import { View, Text, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { Colors } from '@/lib/constants';
import { useGameStore } from '@/lib/gameStore';

export function NotificationToast() {
  const notifications = useGameStore((s) => s.notifications);
  if (!notifications.length) return null;
  return (
    <View style={{ position: 'absolute', top: 60, left: 16, right: 16, zIndex: 100, gap: 8 }}>
      {notifications.map((n) => <Toast key={n.id} message={n.message} type={n.type} />)}
    </View>
  );
}

function Toast({ message, type }: { message: string; type: string }) {
  const op = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(op, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(3000),
      Animated.timing(op, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  }, []);
  const bg = type === 'disconnected' ? Colors.rose : type === 'player-kicked' ? Colors.orange : Colors.bgSlate800;
  return (
    <Animated.View style={{ opacity: op, backgroundColor: bg, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16, borderBottomWidth: 3, borderBottomColor: '#000' }}>
      <Text style={{ color: '#fff', fontSize: 14, fontWeight: '800', textAlign: 'center' }}>{message}</Text>
    </Animated.View>
  );
}
