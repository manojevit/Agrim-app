import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { useLang } from '@/context/lang';
import { Alert } from '@/data/types';
import { colors, radius, spacing } from '@/theme';

const sev = {
  act: { color: colors.act, soft: colors.actSoft, icon: 'alert-circle' },
  watch: { color: colors.watch, soft: colors.watchSoft, icon: 'eye-outline' },
  info: { color: colors.offline, soft: colors.offlineSoft, icon: 'information-outline' },
} as const;

export function AlertCard({ alert, showPlace = true }: { alert: Alert; showPlace?: boolean }) {
  const { t, lang } = useLang();
  const s = sev[alert.severity];
  return (
    <Pressable onPress={() => router.push(`/facility-alert/${alert.id}`)} style={({ pressed }) => [styles.card, pressed && { backgroundColor: colors.surfaceAlt }]}>
      <View style={[styles.iconTile, { backgroundColor: s.soft }]}>
        <MaterialCommunityIcons name={s.icon as any} size={20} color={s.color} />
      </View>
      <View style={{ flex: 1 }}>
        <Txt variant="h3">{lang === 'hi' ? alert.headlineHi : alert.headline}</Txt>
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{lang === 'hi' ? alert.detailHi : alert.detail}</Txt>
        {showPlace && <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 8 }}>{alert.toiletName} · {alert.block}</Txt>}
        <View style={styles.meta}>
          <Txt variant="tiny" color={s.color}>{t(`as.${alert.state}`)}</Txt>
          <Txt variant="tiny" color={colors.textSubtle}>· {alert.age}</Txt>
        </View>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} style={{ marginTop: 2 }} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.sm },
  iconTile: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: 6 },
});
