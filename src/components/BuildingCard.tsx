import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { useLang } from '@/context/lang';
import { BlockBuilding } from '@/data/block';
import { colors, elevation, radius, spacing, statusMeta } from '@/theme';

export function BuildingCard({ building, variant = 'focus' }: { building: BlockBuilding; variant?: 'focus' | 'row' }) {
  const { t, lang } = useLang();
  const m = statusMeta[building.status];
  const headline = lang === 'hi' ? building.headlineHi : building.headline;
  const open = () => router.push(`/block-building/${building.id}`);

  if (variant === 'row') {
    return (
      <Pressable onPress={open} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <View style={[styles.medallionSm, { backgroundColor: m.color }]}>
          <MaterialCommunityIcons name="office-building" size={17} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1 }}>
          <Txt variant="bodyMed">{building.name}</Txt>
          <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 1 }}>{t('b.sensorsSending', { r: building.reporting, n: building.toilets })}</Txt>
        </View>
        <Txt variant="tiny" color={m.color} style={{ marginRight: spacing.xs }}>{t(`st.${building.status}`)}</Txt>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={open} style={({ pressed }) => [styles.focus, pressed && styles.pressed]}>
      <View style={styles.focusTop}>
        <View style={[styles.medallion, { backgroundColor: m.color }]}>
          <MaterialCommunityIcons name="office-building" size={24} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1 }}>
          <Txt variant="h3">{building.name}</Txt>
          <Txt variant="label" color={m.color} style={{ marginTop: 6 }}>{headline}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 1 }}>{t('b.sensorsCleaners', { r: building.reporting, n: building.toilets, c: building.cleaners })}</Txt>
        </View>
      </View>
      <View style={styles.focusFoot}>
        {building.handedUp > 0 ? (
          <View style={styles.handedTag}>
            <MaterialCommunityIcons name="arrow-up" size={12} color={colors.act} />
            <Txt variant="tiny" color={colors.act}>{t('b.handedToYou', { n: building.handedUp })}</Txt>
          </View>
        ) : (
          <Txt variant="tiny" color={colors.textSubtle}>{t('b.openAlerts', { n: building.openAlerts })}</Txt>
        )}
        <View style={[styles.openBtn, { backgroundColor: m.color }]}>
          <Txt variant="label" color="#FFFFFF">{t('c.open')}</Txt>
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
  handedTag: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.actSoft, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 4 },
  openBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  medallionSm: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
