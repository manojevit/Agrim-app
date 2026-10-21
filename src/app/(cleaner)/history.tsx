import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { AppCard } from '@/components/AppCard';
import { Scaffold } from '@/components/Scaffold';
import { Txt } from '@/components/Txt';
import { CLEANER_JOBS } from '@/data/cleaner';
import { colors, radius, spacing } from '@/theme';

export default function CleanerHistory() {
  const done = CLEANER_JOBS.filter((j) => j.done);
  return (
    <Scaffold title="Done" subtitle="What you cleaned today">
      {done.length === 0 && <Txt variant="body" color={colors.textMuted}>Nothing logged yet today.</Txt>}
      {done.map((j) => (
        <AppCard key={j.id} style={{ marginBottom: spacing.sm }}>
          <View style={styles.row}>
            <View style={styles.photo}><MaterialCommunityIcons name="image-check" size={22} color={colors.good} /></View>
            <View style={{ flex: 1 }}>
              <Txt variant="h3">{j.toilet}</Txt>
              <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{j.building} · {j.type}</Txt>
              {j.note ? <Txt variant="small" color={colors.textMuted} style={{ marginTop: 4 }}>“{j.note}”</Txt> : null}
              <View style={styles.meta}>
                <MaterialCommunityIcons name="check-circle" size={13} color={colors.good} />
                <Txt variant="tiny" color={colors.textSubtle}>Cleaned {j.cleanedAt}</Txt>
              </View>
            </View>
          </View>
        </AppCard>
      ))}
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md },
  photo: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.goodSoft, alignItems: 'center', justifyContent: 'center' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.sm },
});
