import { StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { colors, radius } from '@/theme';

/** Small status pill. `solid` = filled colour + white text; `outline` = bordered. */
export function Pill({
  text,
  color,
  variant = 'solid',
}: {
  text: string;
  color: string;
  variant?: 'solid' | 'outline';
}) {
  if (variant === 'outline') {
    return (
      <View style={[styles.base, { borderWidth: 1.4, borderColor: color, backgroundColor: colors.surface }]}>
        <Txt variant="tiny" color={color} style={styles.txt}>{text}</Txt>
      </View>
    );
  }
  return (
    <View style={[styles.base, { backgroundColor: color }]}>
      <Txt variant="tiny" color="#FFFFFF" style={styles.txt}>{text}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignSelf: 'flex-start', borderRadius: radius.pill, paddingHorizontal: 11, paddingVertical: 4 },
  txt: { fontFamily: 'Inter_700Bold' },
});
