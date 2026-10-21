import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { useLang } from '@/context/lang';
import { Toilet } from '@/data/types';
import { colors, radius, spacing, statusMeta } from '@/theme';

export function ToiletCard({ toilet, variant = 'focus' }: { toilet: Toilet; variant?: 'focus' | 'row' }) {
  const { t, lang } = useLang();
  const m = statusMeta[toilet.status];
  const name = lang === 'hi' ? toilet.nameHi : toilet.name;
  const open = () => router.push(`/facility-toilet/${toilet.id}`);

  if (variant === 'row') {
    return (
      <Pressable onPress={open} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <View style={[styles.dot, { backgroundColor: m.color }]} />
        <View style={{ flex: 1 }}>
          <Txt variant="bodyMed">{name}</Txt>
          <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 1 }}>{t('c.lastReading', { t: toilet.lastSeen })}</Txt>
        </View>
        <Txt variant="tiny" color={m.color} style={{ marginRight: spacing.sm }}>{t(`st.${toilet.status}`)}</Txt>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={open} style={({ pressed }) => [styles.focus, pressed && styles.pressed]}>
      <View style={[styles.iconTile, { backgroundColor: m.soft }]}>
        <MaterialCommunityIcons name={m.icon as any} size={20} color={m.color} />
      </View>
      <View style={{ flex: 1 }}>
        <Txt variant="h3">{name}</Txt>
        <Txt variant="label" color={m.color} style={{ marginTop: 4 }}>{lang === 'hi' ? toilet.headlineHi : toilet.headline}</Txt>
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{lang === 'hi' ? toilet.reasonHi : toilet.reason}</Txt>
        <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 8 }}>{t('c.lastReading', { t: toilet.lastSeen })}</Txt>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} style={{ marginTop: 2 }} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { backgroundColor: colors.surfaceAlt },
  focus: { flexDirection: 'row', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.sm },
  iconTile: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  dot: { width: 9, height: 9, borderRadius: 5 },
});
