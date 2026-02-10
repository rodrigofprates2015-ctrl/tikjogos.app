import { TextInput, View, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { Colors } from '@/lib/constants';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  variant?: 'default' | 'code';
}

export function Input({ label, error, containerStyle, variant = 'default', style, ...props }: Props) {
  return (
    <View style={[{ width: '100%' }, containerStyle]}>
      {label && <Text style={s.label}>{label}</Text>}
      <TextInput
        placeholderTextColor={Colors.slate500}
        style={[s.input, variant === 'code' && s.code, error && { borderColor: Colors.rose }, style]}
        {...props}
      />
      {error && <Text style={s.error}>{error}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  label: { color: Colors.slate400, fontSize: 12, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 },
  input: { backgroundColor: '#1a2a3a', borderWidth: 3, borderColor: '#2a3a4a', borderRadius: 16, paddingHorizontal: 18, paddingVertical: 16, color: '#fff', fontSize: 16, fontWeight: '700' },
  code: { fontSize: 22, fontWeight: '900', letterSpacing: 6, textAlign: 'center', fontFamily: 'monospace' },
  error: { color: Colors.rose, fontSize: 12, marginTop: 4 },
});
