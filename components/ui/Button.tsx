import { useRef, useCallback } from 'react';
import { Pressable, Text, ActivityIndicator, ViewStyle, TextStyle, Animated } from 'react-native';
import { Colors } from '@/lib/constants';

type Variant = 'orange' | 'green' | 'purple' | 'rose' | 'slate' | 'blue' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const V: Record<Variant, { bg: string; bb: string; tx: string }> = {
  orange: { bg: Colors.orange, bb: Colors.orangeBorder, tx: '#fff' },
  green:  { bg: Colors.green,  bb: Colors.greenBorder,  tx: '#fff' },
  purple: { bg: Colors.purple, bb: Colors.purpleBorder,  tx: '#fff' },
  rose:   { bg: Colors.rose,   bb: Colors.roseBorder,    tx: '#fff' },
  blue:   { bg: Colors.blue,   bb: '#1e40af',            tx: '#fff' },
  slate:  { bg: Colors.bgSlate800, bb: Colors.slateBorder, tx: Colors.slate400 },
  ghost:  { bg: 'transparent', bb: 'transparent', tx: Colors.slate400 },
};

const S: Record<Size, { pv: number; ph: number; fs: number; r: number; bw: number }> = {
  sm: { pv: 10, ph: 16, fs: 13, r: 16, bw: 3 },
  md: { pv: 14, ph: 20, fs: 15, r: 16, bw: 4 },
  lg: { pv: 18, ph: 28, fs: 19, r: 20, bw: 6 },
};

export function Button({ title, onPress, variant = 'orange', size = 'md', disabled = false, loading = false, icon, style, textStyle, fullWidth = false }: Props) {
  const v = V[variant];
  const s = S[size];
  const lastPress = useRef(0);
  const translateY = useRef(new Animated.Value(0)).current;
  const borderW = useRef(new Animated.Value(s.bw)).current;

  // Debounce: ignore presses within 400ms
  const handlePress = useCallback(() => {
    const now = Date.now();
    if (now - lastPress.current < 400) return;
    lastPress.current = now;
    onPress();
  }, [onPress]);

  const onPressIn = () => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: s.bw, duration: 50, useNativeDriver: true }),
      Animated.timing(borderW, { toValue: 0, duration: 50, useNativeDriver: false }),
    ]).start();
  };

  const onPressOut = () => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 100, useNativeDriver: true }),
      Animated.timing(borderW, { toValue: s.bw, duration: 100, useNativeDriver: false }),
    ]).start();
  };

  const off = disabled || loading;

  return (
    <Animated.View style={[{ transform: [{ translateY }] }, fullWidth && { width: '100%' as any }, style]}>
      <Animated.View style={{
        backgroundColor: off ? Colors.bgSlate700 : v.bg,
        paddingVertical: s.pv,
        paddingHorizontal: s.ph,
        borderRadius: s.r,
        borderBottomWidth: borderW as any,
        borderBottomColor: off ? Colors.slateBorder : v.bb,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        opacity: off ? 0.5 : 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10,
      }}>
        <Pressable
          onPress={handlePress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          disabled={off}
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%' }}
          hitSlop={8}
        >
          {loading ? (
            <ActivityIndicator color={v.tx} size="small" />
          ) : (
            <>
              {icon}
              <Text style={[{ color: off ? Colors.slate500 : v.tx, fontSize: s.fs, fontWeight: '900', letterSpacing: 1 }, textStyle]}>
                {title}
              </Text>
            </>
          )}
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}
