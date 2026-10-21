import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert as RNAlert, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AppCard } from '@/components/AppCard';
import { Scaffold } from '@/components/Scaffold';
import { SectionHeader } from '@/components/SectionHeader';
import { Txt } from '@/components/Txt';
import { CLEANING_JOBS, CLEANING_LOG } from '@/data/cleaning';
import { colors, radius, spacing, statusMeta } from '@/theme';

export default function Cleaning() {
  const [done, setDone] = useState<Record<string, boolean>>(Object.fromEntries(CLEANING_JOBS.map((j) => [j.id, j.done])));

  const markDone = (id: string, block: string) => { setDone((d) => ({ ...d, [id]: true })); RNAlert.alert('Marked as cleaned', `${block} is now logged as cleaned just now.`); };
  const call = (block: string) => RNAlert.alert('Call a cleaner', `The app would ring the cleaners for ${block} and tell them how many toilets need attention.`);

  return (
    <Scaffold title="Cleaning" subtitle="What to clean, and record it when done">
      <SectionHeader title="To clean" />
      {CLEANING_JOBS.map((job) => {
        const isDone = done[job.id];
        const m = statusMeta[isDone ? 'good' : job.status];
        return (
          <AppCard key={job.id} stripe={m.color} style={{ marginBottom: spacing.sm }}>
            <View style={styles.top}>
              <View style={{ flex: 1 }}>
                <Txt variant="h3">{job.block}</Txt>
                <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{job.path}</Txt>
              </View>
              <View style={[styles.tag, { backgroundColor: m.soft }]}><Txt variant="tiny" color={m.color}>{isDone ? 'Cleaned' : m.label}</Txt></View>
            </View>
            <Txt variant="body" style={{ marginTop: spacing.sm }}>{isDone ? 'Cleaned just now · logged' : job.reason}</Txt>
            <View style={styles.meta}>
              <MaterialCommunityIcons name="clock-outline" size={14} color={colors.textSubtle} />
              <Txt variant="tiny" color={colors.textSubtle}>Last cleaned {job.lastCleaned}{job.visitsSince != null ? ` · ${job.visitsSince} visits since` : ''}</Txt>
            </View>
            {!isDone && (
              <View style={styles.actions}>
                <Button mode="contained" icon="check" onPress={() => markDone(job.id, job.block)} style={{ flex: 1, borderRadius: radius.md }} labelStyle={styles.btnSm}>Mark cleaned</Button>
                <Button mode="outlined" icon="phone" onPress={() => call(job.block)} style={{ flex: 1, borderRadius: radius.md, borderColor: colors.borderStrong }} labelStyle={styles.btnSm} textColor={colors.primary}>Call cleaner</Button>
              </View>
            )}
          </AppCard>
        );
      })}

      <SectionHeader title="Recently cleaned" />
      {CLEANING_LOG.map((e) => (
        <AppCard key={e.id} style={{ marginBottom: spacing.sm }}>
          <View style={styles.logRow}>
            <View style={styles.logIcon}><MaterialCommunityIcons name="check-circle" size={20} color={colors.good} /></View>
            <View style={{ flex: 1 }}>
              <Txt variant="h3">{e.block}</Txt>
              <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{e.note}</Txt>
              <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 3 }}>{e.when} · {e.by}</Txt>
            </View>
          </View>
        </AppCard>
      ))}
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  tag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.pill },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.xs },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  btnSm: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  logRow: { flexDirection: 'row', gap: spacing.md },
  logIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.goodSoft, alignItems: 'center', justifyContent: 'center' },
});
