import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { useLang } from '@/context/lang';
import { BlockBuilding } from '@/data/block';
import { colors, radius, spacing, statusMeta } from '@/theme';

export function BuildingCard({ building, variant = 'focus' }: { building: BlockBuilding; variant?: 'focus' | 'row' }) {
  const { t, lang } = useLang();
  const m = statusMeta[building.status];
  const open = () => router.push(`/block-building/${building.id}`);

  if (variant === 'row') {
    return (
      <Pressable onPress={open} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <View style={[styles.dot, { backgroundColor: m.color }]} />
        <View style={{ flex: 1 }}>
          <Txt variant="bodyMed">{building.name}</Txt>
          <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 1 }}>{t('b.sensorsSending', { r: building.reporting, n: building.toilets })}</Txt>
        </View>
        <Txt variant="tiny" color={m.color} style={{ marginRight: spacing.sm }}>{t(`st.${building.status}`)}</Txt>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={open} style={({ pressed }) => [styles.focus, pressed && styles.pressed]}>
      <View style={[styles.iconTile, { backgroundColor: m.soft }]}>
        <MaterialCommunityIcons name="office-building-outline" size={20} color={m.color} />
      </View>
      <View style={{ flex: 1 }}>
        <Txt variant="h3">{building.name}</Txt>
        <Txt variant="label" color={m.color} style={{ marginTop: 4 }}>{lang === 'hi' ? building.headlineHi : building.headline}</Txt>
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{t('b.sensorsCleaners', { r: building.reporting, n: building.toilets, c: building.cleaners })}</Txt>
        {building.handedUp > 0 && (
          <View style={styles.handed}>
            <MaterialCommunityIcons name="arrow-up" size={12} color={colors.act} />
            <Txt variant="tiny" color={colors.act}>{t('b.handedToYou', { n: building.handedUp })}</Txt>
          </View>
        )}
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} style={{ marginTop: 2 }} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { backgroundColor: colors.surfaceAlt },
  focus: { flexDirection: 'row', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.sm },
  iconTile: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  handed: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  dot: { width: 9, height: 9, borderRadius: 5 },
});
