import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CleanerJobCard } from '@/components/CleanerJobCard';
import { ProgressRing } from '@/components/ProgressRing';
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
  const total = CLEANER_JOBS.length;
  const multiBuilding = CLEANER.buildings.length > 1;
  const restByBuilding = CLEANER.buildings
    .map((b) => ({ building: b, jobs: rest.filter((j) => j.building === b) }))
    .filter((g) => g.jobs.length > 0);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
        <View style={[styles.hero, { paddingTop: insets.top + spacing.md }]}>
          <View style={styles.heroTop}>
            <Txt variant="small" color="rgba(255,255,255,0.72)">{today()}</Txt>
            <Pressable style={styles.switch} onPress={() => router.push('/switch-role')}>
              <MaterialCommunityIcons name="swap-horizontal" size={16} color="#FFFFFF" />
              <Txt variant="tiny" color="#FFFFFF">{t('common.switch')}</Txt>
            </Pressable>
          </View>
          <Txt variant="display" color="#FFFFFF" style={{ marginTop: spacing.sm }}>{t('cl.hi', { name: CLEANER.name })}</Txt>
          <Txt variant="small" color="rgba(255,255,255,0.72)" style={{ marginTop: 2 }}>
            {multiBuilding ? t('cl.buildingsIn', { n: CLEANER.buildings.length, area: CLEANER.area }) : CLEANER.buildings[0]}
          </Txt>

          <View style={styles.progressRow}>
            <ProgressRing size={76} stroke={9} progress={total ? doneToday / total : 0} color="#FFFFFF" track="rgba(255,255,255,0.22)">
              <View style={{ alignItems: 'center' }}>
                <Txt variant="h2" color="#FFFFFF">{doneToday}</Txt>
                <Txt variant="tiny" color="rgba(255,255,255,0.72)">{t('cl.ofN', { n: total })}</Txt>
              </View>
            </ProgressRing>
            <View style={{ flex: 1 }}>
              <Txt variant="h2" color="#FFFFFF">{t('cl.leftToClean', { n: todo.length })}</Txt>
              <Txt variant="small" color="rgba(255,255,255,0.72)" style={{ marginTop: 2 }}>
                {doneToday > 0 ? t('cl.finished', { n: doneToday }) : t('cl.startWith')}
              </Txt>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {urgent.length > 0 && (
            <>
              <View style={styles.sectionRow}>
                <View style={styles.liveDot} />
                <Txt variant="h3" color={colors.act}>{t('cl.cleanNow')}</Txt>
              </View>
              {urgent.map((j) => <CleanerJobCard key={j.id} job={j} variant="focus" />)}
            </>
          )}

          {rest.length > 0 && (
            <>
              <Txt variant="h3" style={{ marginTop: urgent.length ? spacing.xl : spacing.md, marginBottom: spacing.sm }}>{t('cl.later')}</Txt>
              {multiBuilding
                ? restByBuilding.map((g) => (
                    <View key={g.building}>
                      <View style={styles.buildingRow}>
                        <MaterialCommunityIcons name="map-marker-outline" size={14} color={colors.textMuted} />
                        <Txt variant="label" color={colors.textMuted}>{g.building}</Txt>
                      </View>
                      {g.jobs.map((j) => <CleanerJobCard key={j.id} job={j} variant="row" />)}
                    </View>
                  ))
                : rest.map((j) => <CleanerJobCard key={j.id} job={j} variant="row" />)}
            </>
          )}

          {todo.length === 0 && (
            <View style={styles.empty}>
              <View style={styles.emptyIcon}><MaterialCommunityIcons name="check-all" size={34} color={colors.good} /></View>
              <Txt variant="h2" style={{ marginTop: spacing.md }}>{t('cl.allDone')}</Txt>
              <Txt variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: 'center' }}>{t('cl.allDoneSub')}</Txt>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, borderBottomLeftRadius: radius.xxl, borderBottomRightRadius: radius.xxl },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  switch: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginTop: spacing.xl, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: radius.lg, padding: spacing.md },
  body: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  liveDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.act },
  buildingRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.sm, marginBottom: spacing.sm },
  empty: { alignItems: 'center', paddingVertical: spacing.xxxl },
  emptyIcon: { width: 72, height: 72, borderRadius: 24, backgroundColor: colors.goodSoft, alignItems: 'center', justifyContent: 'center' },
});
