import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { Toilet } from '@/data/types';
import { colors, elevation, radius, spacing, statusMeta } from '@/theme';

/** A toilet shown in the facility app. Focus = needs attention, row = compact. */
export function ToiletCard({ toilet, variant = 'focus' }: { toilet: Toilet; variant?: 'focus' | 'row' }) {
  const m = statusMeta[toilet.status];
  const open = () => router.push(`/facility-toilet/${toilet.id}`);

  if (variant === 'row') {
    return (
      <Pressable onPress={open} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <View style={[styles.medallionSm, { backgroundColor: m.color }]}>
          <MaterialCommunityIcons name={m.icon as any} size={17} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1 }}>
          <Txt variant="bodyMed">{toilet.name}</Txt>
          <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 1 }}>Last reading {toilet.lastSeen}</Txt>
        </View>
        <Txt variant="tiny" color={m.color} style={{ marginRight: spacing.xs }}>{m.label}</Txt>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={open} style={({ pressed }) => [styles.focus, pressed && styles.pressed]}>
      <View style={styles.focusTop}>
        <View style={[styles.medallion, { backgroundColor: m.color }]}>
          <MaterialCommunityIcons name={m.icon as any} size={24} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1 }}>
          <Txt variant="h3">{toilet.name}</Txt>
          <Txt variant="label" color={m.color} style={{ marginTop: 6 }}>{toilet.headline}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 1 }}>{toilet.reason}</Txt>
        </View>
      </View>
      <View style={styles.focusFoot}>
        <View style={styles.clock}>
          <MaterialCommunityIcons name="clock-outline" size={13} color={colors.textSubtle} />
          <Txt variant="tiny" color={colors.textSubtle}>Last reading {toilet.lastSeen}</Txt>
        </View>
        <View style={[styles.openBtn, { backgroundColor: m.color }]}>
          <Txt variant="label" color="#FFFFFF">Open</Txt>
          <MaterialCommunityIcons name="arrow-right" size={16} color="#FFFFFF" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.92, transform: [{ scale: 0.995 }] },
  focus: { backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.md, ...elevation.card },
  focusTop: { flexDirection: 'row', gap: spacing.md },
  medallion: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  focusFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  clock: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  openBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  medallionSm: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
