import { Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Home } from 'lucide-react-native';
import { Colors } from '@/lib/constants';
import { useGameStore } from '@/lib/gameStore';

// Shown on every screen except Home. Confirms before leaving if in a room.
export function HomeButton() {
  const router = useRouter();
  const { room, leaveGame } = useGameStore();

  const handlePress = () => {
    if (room) {
      Alert.alert('Voltar ao Início', 'Você vai sair da sala. Continuar?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => { leaveGame(); router.replace('/'); } },
      ]);
    } else {
      router.replace('/');
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={12}
      style={{
        padding: 12,
        backgroundColor: Colors.bgSlate800,
        borderRadius: 16,
        borderBottomWidth: 4,
        borderBottomColor: Colors.slateBorder,
      }}
    >
      <Home size={22} strokeWidth={3} color={Colors.slate300} />
    </Pressable>
  );
}
