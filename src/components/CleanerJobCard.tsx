import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppCard } from './AppCard';
import { Txt } from './Txt';
import { CleanerJob, JOB_META } from '@/data/cleaner';
import { colors, radius, spacing } from '@/theme';

/** A cleaning job for the cleaner — place + plain reason + one clear tap target. */
export function CleanerJobCard({ job }: { job: CleanerJob }) {
  const m = JOB_META[job.status];
  return (
    <AppCard stripe={m.color} style={{ marginBottom: spacing.sm }} onPress={() => router.push(`/cleaner-job/${job.id}`)}>
      <View style={styles.row}>
        <View style={[styles.icon, { backgroundColor: m.soft }]}>
          <MaterialCommunityIcons name={m.icon as any} size={22} color={m.color} />
        </View>
        <View style={{ flex: 1 }}>
          <Txt variant="h3">{job.toilet}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{job.building} · {job.type}</Txt>
          <Txt variant="label" color={m.color} style={{ marginTop: 6 }}>{job.headline}</Txt>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSubtle} />
      </View>
      <View style={styles.footer}>
        <View style={[styles.chip, { backgroundColor: m.soft }]}>
          <Txt variant="tiny" color={m.color}>{m.label}</Txt>
        </View>
        <Txt variant="tiny" color={colors.textSubtle}>· {job.flaggedAt}</Txt>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  icon: { width: 44, height: 44, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  footer: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.md },
  chip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
});
