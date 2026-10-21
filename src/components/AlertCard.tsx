import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { useLang } from '@/context/lang';
import { Alert } from '@/data/types';
import { colors, elevation, radius, spacing } from '@/theme';

const sev = {
  act: { color: colors.act, soft: colors.actSoft, icon: 'alert-circle' },
  watch: { color: colors.watch, soft: colors.watchSoft, icon: 'eye-outline' },
  info: { color: colors.offline, soft: colors.offlineSoft, icon: 'information' },
} as const;

export function AlertCard({ alert, showPlace = true }: { alert: Alert; showPlace?: boolean }) {
  const { t, lang } = useLang();
  const s = sev[alert.severity];
  return (
    <Pressable onPress={() => router.push(`/facility-alert/${alert.id}`)} style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}>
      <View style={{ flexDirection: 'row', gap: spacing.md }}>
        <View style={[styles.medallion, { backgroundColor: s.color }]}>
          <MaterialCommunityIcons name={s.icon as any} size={22} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1 }}>
          <Txt variant="h3">{lang === 'hi' ? alert.headlineHi : alert.headline}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{lang === 'hi' ? alert.detailHi : alert.detail}</Txt>
          {showPlace && <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 8 }}>{alert.toiletName} · {alert.block}</Txt>}
        </View>
      </View>
      <View style={styles.foot}>
        <View style={[styles.tag, { backgroundColor: s.soft }]}><Txt variant="tiny" color={s.color}>{t(`as.${alert.state}`)}</Txt></View>
        <Txt variant="tiny" color={colors.textSubtle}>{alert.age}</Txt>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.md, ...elevation.card },
  medallion: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  foot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
});
