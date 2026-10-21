import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CleanerJobCard } from '@/components/CleanerJobCard';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { CLEANER, CLEANER_JOBS } from '@/data/cleaner';
import { colors, radius, spacing } from '@/theme';

function today() {
  return new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
}

export default function CleanerJobs() {
  const insets = useSafeAreaInsets();
  const { t } = useLang();
  const todo = CLEANER_JOBS.filter((j) => !j.done);
  const urgent = todo.filter((j) => j.urgent);
  const rest = todo.filter((j) => !j.urgent);
  const doneToday = CLEANER_JOBS.filter((j) => j.done).length;
  const multiBuilding = CLEANER.buildings.length > 1;
  const restByBuilding = CLEANER.buildings
    .map((b) => ({ building: b, jobs: rest.filter((j) => j.building === b) }))
    .filter((g) => g.jobs.length > 0);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingTop: insets.top + spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl }} showsVerticalScrollIndicator={false}>
      <View style={styles.head}>
        <View style={{ flex: 1 }}>
          <Txt variant="small" color={colors.textSubtle}>{today()}</Txt>
          <Txt variant="display" style={{ marginTop: 2 }}>{t('cl.hi', { name: CLEANER.name })}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>
            {multiBuilding ? t('cl.buildingsIn', { n: CLEANER.buildings.length, area: CLEANER.area }) : CLEANER.buildings[0]}
          </Txt>
        </View>
        <Pressable style={styles.switch} onPress={() => router.push('/switch-role')}>
          <MaterialCommunityIcons name="swap-horizontal" size={15} color={colors.text} />
          <Txt variant="tiny" color={colors.text}>{t('common.switch')}</Txt>
        </Pressable>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Txt variant="display" color={todo.length ? colors.act : colors.text}>{todo.length}</Txt>
          <Txt variant="small" color={colors.textMuted}>{t('cl.toCleanLbl')}</Txt>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Txt variant="display" color={colors.good}>{doneToday}</Txt>
          <Txt variant="small" color={colors.textMuted}>{t('cl.doneLbl')}</Txt>
        </View>
      </View>

      {urgent.length > 0 && (
        <>
          <View style={styles.sectionRow}>
            <View style={styles.liveDot} />
            <Txt variant="h3">{t('cl.cleanNow')}</Txt>
          </View>
          {urgent.map((j) => <CleanerJobCard key={j.id} job={j} variant="focus" />)}
        </>
      )}

      {rest.length > 0 && (
        <>
          <Txt variant="overline" color={colors.textSubtle} style={{ marginTop: urgent.length ? spacing.xl : spacing.lg, marginBottom: spacing.sm }}>{t('cl.later').toUpperCase()}</Txt>
          {multiBuilding
            ? restByBuilding.map((g) => (
                <View key={g.building}>
                  <Txt variant="tiny" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{g.building}</Txt>
                  {g.jobs.map((j) => <CleanerJobCard key={j.id} job={j} variant="row" />)}
                </View>
              ))
            : rest.map((j) => <CleanerJobCard key={j.id} job={j} variant="row" />)}
        </>
      )}

      {todo.length === 0 && (
        <View style={styles.empty}>
          <MaterialCommunityIcons name="check-all" size={30} color={colors.good} />
          <Txt variant="h2" style={{ marginTop: spacing.md }}>{t('cl.allDone')}</Txt>
          <Txt variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: 'center' }}>{t('cl.allDoneSub')}</Txt>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.lg },
  switch: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  stats: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, paddingVertical: spacing.lg, marginBottom: spacing.sm },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  divider: { width: 1, height: 36, backgroundColor: colors.border },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl, marginBottom: spacing.sm },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.act },
  empty: { alignItems: 'center', paddingVertical: spacing.xxxl },
});
