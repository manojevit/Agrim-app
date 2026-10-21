import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { CLEANER_JOBS } from '@/data/cleaner';
import { colors, radius, spacing } from '@/theme';

export default function CleanerHistory() {
  const done = CLEANER_JOBS.filter((j) => j.done);
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader title="Done" subtitle={`${done.length} cleaned today`} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        {done.length === 0 && <Txt variant="body" color={colors.textMuted}>Nothing logged yet today.</Txt>}
        {done.map((j) => (
          <View key={j.id} style={styles.card}>
            <View style={styles.photo}><MaterialCommunityIcons name="image-check" size={24} color={colors.good} /></View>
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Txt variant="h3" style={{ flexShrink: 1 }}>{j.toilet}</Txt>
                <View style={styles.typePill}><Txt variant="tiny" color={colors.textMuted}>{j.type}</Txt></View>
              </View>
              <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{j.building}</Txt>
              {j.note ? <Txt variant="small" color={colors.text} style={{ marginTop: 6 }}>“{j.note}”</Txt> : null}
              <View style={styles.meta}>
                <MaterialCommunityIcons name="check-circle" size={13} color={colors.good} />
                <Txt variant="tiny" color={colors.textSubtle}>Cleaned {j.cleanedAt}</Txt>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.sm },
  photo: { width: 52, height: 52, borderRadius: radius.md, backgroundColor: colors.goodSoft, alignItems: 'center', justifyContent: 'center' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  typePill: { backgroundColor: colors.surfaceAlt, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.sm },
});
