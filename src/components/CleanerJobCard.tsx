import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { useLang } from '@/context/lang';
import { CleanerJob, JOB_META } from '@/data/cleaner';
import { colors, radius, spacing } from '@/theme';

const STATUS_LABEL = { act: 'status.cleanNow', watch: 'status.cleanSoon', routine: 'status.routine' } as const;

export function CleanerJobCard({ job, variant = 'focus' }: { job: CleanerJob; variant?: 'focus' | 'row' }) {
  const { t, lang } = useLang();
  const m = JOB_META[job.status];
  const toilet = lang === 'hi' ? job.toiletHi : job.toilet;
  const open = () => router.push(`/cleaner-job/${job.id}`);

  if (variant === 'row') {
    return (
      <Pressable onPress={open} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <View style={[styles.dot, { backgroundColor: m.color }]} />
        <View style={{ flex: 1 }}>
          <Txt variant="bodyMed">{toilet}</Txt>
          <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 1 }}>{t(`type.${job.type}`)}</Txt>
        </View>
        <Txt variant="tiny" color={m.color} style={{ marginRight: spacing.sm }}>{t(STATUS_LABEL[job.status])}</Txt>
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
        <View style={styles.nameRow}>
          <Txt variant="h3" style={{ flexShrink: 1 }}>{toilet}</Txt>
          <View style={styles.typePill}><Txt variant="tiny" color={colors.textMuted}>{t(`type.${job.type}`)}</Txt></View>
        </View>
        <Txt variant="label" color={m.color} style={{ marginTop: 4 }}>{t(`problem.${job.status}`)}</Txt>
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{lang === 'hi' ? job.reasonHi : job.reason}</Txt>
        <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 8 }}>{t('cl.flagged', { t: job.flaggedAt })}</Txt>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} style={{ marginTop: 2 }} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { backgroundColor: colors.surfaceAlt },
  focus: { flexDirection: 'row', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.sm },
  iconTile: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  typePill: { backgroundColor: colors.surfaceAlt, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  dot: { width: 9, height: 9, borderRadius: 5 },
});
