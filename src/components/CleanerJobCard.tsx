import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { useLang } from '@/context/lang';
import { CleanerJob, JOB_META } from '@/data/cleaner';
import { colors, elevation, radius, spacing } from '@/theme';

const STATUS_LABEL = { act: 'status.cleanNow', watch: 'status.cleanSoon', routine: 'status.routine' } as const;

export function CleanerJobCard({ job, variant = 'focus' }: { job: CleanerJob; variant?: 'focus' | 'row' }) {
  const { t, lang } = useLang();
  const m = JOB_META[job.status];
  const toilet = lang === 'hi' ? job.toiletHi : job.toilet;
  const open = () => router.push(`/cleaner-job/${job.id}`);

  if (variant === 'row') {
    return (
      <Pressable onPress={open} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <View style={[styles.medallionSm, { backgroundColor: m.color }]}>
          <MaterialCommunityIcons name={m.icon as any} size={18} color="#FFFFFF" />
        </View>
        <View style={{ flex: 1 }}>
          <Txt variant="bodyMed">{toilet}</Txt>
          <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 1 }}>{t(`type.${job.type}`)}</Txt>
        </View>
        <Txt variant="tiny" color={m.color} style={{ marginRight: spacing.xs }}>{t(STATUS_LABEL[job.status])}</Txt>
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
          <View style={styles.nameRow}>
            <Txt variant="h3" style={{ flexShrink: 1 }}>{toilet}</Txt>
            <View style={styles.typePill}><Txt variant="tiny" color={colors.textMuted}>{t(`type.${job.type}`)}</Txt></View>
          </View>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 3 }}>{job.building}</Txt>
          <Txt variant="label" color={colors.text} style={{ marginTop: 8 }}>{t(`problem.${job.status}`)}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 1 }}>{lang === 'hi' ? job.reasonHi : job.reason}</Txt>
        </View>
      </View>
      <View style={styles.focusFoot}>
        <View style={styles.clock}>
          <MaterialCommunityIcons name="clock-outline" size={13} color={colors.textSubtle} />
          <Txt variant="tiny" color={colors.textSubtle}>{t('cl.flagged', { t: job.flaggedAt })}</Txt>
        </View>
        <View style={[styles.openBtn, { backgroundColor: m.color }]}>
          <Txt variant="label" color="#FFFFFF">{t('common.open')}</Txt>
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
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  typePill: { backgroundColor: colors.surfaceAlt, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  focusFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  clock: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  openBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  medallionSm: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
});
