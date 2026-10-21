import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppCard } from '@/components/AppCard';
import { CleanerJobCard } from '@/components/CleanerJobCard';
import { SectionHeader } from '@/components/SectionHeader';
import { Txt } from '@/components/Txt';
import { CLEANER, CLEANER_JOBS } from '@/data/cleaner';
import { colors, radius, spacing } from '@/theme';

function today() {
  return new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
}

export default function CleanerJobs() {
  const insets = useSafeAreaInsets();
  const todo = CLEANER_JOBS.filter((j) => !j.done);
  const urgent = todo.filter((j) => j.urgent);
  const rest = todo.filter((j) => !j.urgent);
  const doneToday = CLEANER_JOBS.filter((j) => j.done).length;
  const multiBuilding = CLEANER.buildings.length > 1;
  // Group the non-urgent jobs by building (only matters when a cleaner covers more than one).
  const restByBuilding = CLEANER.buildings
    .map((b) => ({ building: b, jobs: rest.filter((j) => j.building === b) }))
    .filter((g) => g.jobs.length > 0);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingTop: insets.top + spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl }} showsVerticalScrollIndicator={false}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Txt variant="small" color={colors.textMuted}>{today()}</Txt>
          <Txt variant="h1" style={{ marginTop: 2 }}>Hi, {CLEANER.name}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>
            {multiBuilding ? `${CLEANER.buildings.length} buildings · ${CLEANER.area}` : CLEANER.buildings[0]}
          </Txt>
        </View>
        <Pressable style={styles.roleChip} onPress={() => router.push('/switch-role')}>
          <View style={styles.roleBadge}><MaterialCommunityIcons name="broom" size={16} color={colors.primary} /></View>
          <MaterialCommunityIcons name="swap-horizontal" size={15} color={colors.primary} />
        </Pressable>
      </View>

      {/* Count summary */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Txt variant="display" color={colors.act}>{todo.length}</Txt>
          <Txt variant="small" color={colors.textMuted}>to clean</Txt>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Txt variant="display" color={colors.good}>{doneToday}</Txt>
          <Txt variant="small" color={colors.textMuted}>done today</Txt>
        </View>
      </View>

      {urgent.length > 0 && (
        <>
          <View style={styles.urgentHead}>
            <MaterialCommunityIcons name="alert-circle" size={18} color={colors.act} />
            <Txt variant="h3" color={colors.act}>Clean now</Txt>
          </View>
          {urgent.map((j) => <CleanerJobCard key={j.id} job={j} />)}
        </>
      )}

      {rest.length > 0 && !multiBuilding && (
        <>
          <SectionHeader title="Also to clean" />
          {rest.map((j) => <CleanerJobCard key={j.id} job={j} />)}
        </>
      )}

      {rest.length > 0 && multiBuilding && (
        <>
          <SectionHeader title="Also to clean" />
          {restByBuilding.map((g) => (
            <View key={g.building}>
              <View style={styles.buildingRow}>
                <MaterialCommunityIcons name="office-building-marker-outline" size={15} color={colors.textMuted} />
                <Txt variant="label" color={colors.textMuted}>{g.building}</Txt>
              </View>
              {g.jobs.map((j) => <CleanerJobCard key={j.id} job={j} />)}
            </View>
          ))}
        </>
      )}

      {todo.length === 0 && (
        <AppCard stripe={colors.good} style={{ marginTop: spacing.lg, alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xxl }}>
          <MaterialCommunityIcons name="check-circle" size={40} color={colors.good} />
          <Txt variant="h2">All done!</Txt>
          <Txt variant="body" color={colors.textMuted}>Nothing to clean right now.</Txt>
        </AppCard>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.lg },
  roleChip: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  roleBadge: { width: 26, height: 26, borderRadius: 8, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  summary: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, paddingVertical: spacing.lg },
  summaryItem: { flex: 1, alignItems: 'center', gap: 2 },
  divider: { width: 1, height: 44, backgroundColor: colors.border },
  urgentHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.xl, marginBottom: spacing.sm },
  buildingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.sm, marginBottom: spacing.sm },
});
