import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { colors, elevation, radius, spacing } from '@/theme';

/** Surface card. Optional left status stripe and press behaviour. */
export function AppCard({
  children,
  onPress,
  style,
  padded = true,
  stripe,
  flat,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padded?: boolean;
  stripe?: string;
  flat?: boolean;
}) {
  const inner = (
    <View
      style={[
        styles.card,
        !flat && elevation.card,
        padded && styles.padded,
        stripe ? { borderLeftWidth: 4, borderLeftColor: stripe } : null,
        style,
      ]}
    >
      {children}
    </View>
  );
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.9, transform: [{ scale: 0.994 }] }}>
        {inner}
      </Pressable>
    );
  }
  return inner;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  padded: { padding: spacing.lg },
});
