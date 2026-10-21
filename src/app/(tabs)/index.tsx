import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { AppCard } from '@/components/AppCard';
import { MetricCard } from '@/components/MetricCard';
import { SectionHeader } from '@/components/SectionHeader';
import { ToiletItem } from '@/components/ToiletItem';
import { Txt } from '@/components/Txt';
import { useSession } from '@/context/session';
import { TOILETS } from '@/data/toilets';
import { ESTATE, ESTATE_STATS } from '@/data/estate';
import { CLEANING_JOBS } from '@/data/cleaning';
import { EstateNode } from '@/data/types';
import { colors, radius, spacing, statusMeta } from '@/theme';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}
function flatten(n: EstateNode): EstateNode[] {
  return [n, ...(n.children ? n.children.flatMap(flatten) : [])];
}

export default function Home() {
  const insets = useSafeAreaInsets();
  const { role } = useSession();
  if (!role) return null;

  const stats = ESTATE_STATS[role.id];
  const isField = role.id === 'facility' || role.id === 'block';
  const needAction = TOILETS.filter((t) => t.status === 'act');
  const watch = TOILETS.filter((t) => t.status === 'watch');
  const good = TOILETS.filter((t) => t.status === 'good');
  const blocks = ESTATE.flatMap(flatten).filter((n) => n.level === 'block');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingTop: insets.top + spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl }} showsVerticalScrollIndicator={false}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Txt variant="small" color={colors.textMuted}>{greeting()}</Txt>
          <Txt variant="h1" style={{ marginTop: 2 }}>{role.name}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{role.area}</Txt>
        </View>
        <Pressable style={styles.roleChip} onPress={() => router.push('/switch-role')}>
          <View style={styles.roleBadge}><Txt variant="label" color={colors.primary}>{role.short}</Txt></View>
          <MaterialCommunityIcons name="swap-horizontal" size={15} color={colors.primary} />
        </Pressable>
      </View>

      {/* Hero */}
      {needAction.length > 0 ? (
        <AppCard stripe={colors.act} style={{ gap: spacing.sm }}>
          <View style={[styles.heroIcon, { backgroundColor: colors.actSoft }]}>
            <MaterialCommunityIcons name="alert-circle" size={26} color={colors.act} />
          </View>
          <Txt variant="h2" style={{ marginTop: spacing.xs }}>
            {needAction.length} {needAction.length === 1 ? 'toilet needs' : 'toilets need'} cleaning now
          </Txt>
          <Txt variant="body" color={colors.textMuted}>
            {isField ? 'Send a cleaner, then mark it done.' : 'The worst across your area right now.'}
          </Txt>
          <Button mode="contained" onPress={() => router.push('/(tabs)/alerts')} style={{ borderRadius: radius.md, marginTop: spacing.xs }} contentStyle={{ height: 48 }} labelStyle={styles.btnLabel} icon="arrow-right">
            See what needs doing
          </Button>
        </AppCard>
      ) : (
        <AppCard stripe={colors.good} style={{ gap: spacing.sm }}>
          <View style={[styles.heroIcon, { backgroundColor: colors.goodSoft }]}>
            <MaterialCommunityIcons name="check-circle" size={26} color={colors.good} />
          </View>
          <Txt variant="h2">All clear</Txt>
          <Txt variant="body" color={colors.textMuted}>Nothing needs you right now. Nicely done.</Txt>
        </AppCard>
      )}

      {/* Stats */}
      <View style={styles.tiles}>
        {isField ? (
          <>
            <MetricCard label="Need cleaning" value={`${needAction.length}`} icon="alert-circle" tone={colors.act} toneSoft={colors.actSoft} sub="right now" />
            <MetricCard label="All good" value={`${good.length}`} icon="check-circle" tone={colors.good} toneSoft={colors.goodSoft} sub={`of ${TOILETS.length} toilets`} />
          </>
        ) : (
          <>
            <MetricCard label="Blocks need you" value={`${stats.critical}`} icon="office-building" tone={colors.act} toneSoft={colors.actSoft} sub={`of ${stats.blocks} blocks`} />
            <MetricCard label="Open alerts" value={`${stats.alerts}`} icon="bell" tone={colors.watch} toneSoft={colors.watchSoft} sub={`${stats.critical} urgent`} />
          </>
        )}
      </View>
      <View style={styles.tiles}>
        <MetricCard label="Sending readings" value={stats.reporting.split(' ')[0]} icon="access-point" tone={colors.primary} toneSoft={colors.primarySoft} sub={`of ${stats.totalN} units`} />
        <MetricCard label="Keep an eye" value={`${watch.length}`} icon="eye-outline" tone={colors.watch} toneSoft={colors.watchSoft} sub="getting worse" />
      </View>

      {/* List */}
      {isField ? (
        <>
          <SectionHeader title="Your toilets" action="See all" onAction={() => router.push('/(tabs)/toilets')} />
          {[...needAction, ...watch, ...good].slice(0, 4).map((t) => <ToiletItem key={t.id} toilet={t} />)}
        </>
      ) : (
        <>
          <SectionHeader title="Blocks that need you" action="See all" onAction={() => router.push('/(tabs)/toilets')} />
          {blocks.slice(0, 4).map((b) => (
            <AppCard key={b.id} stripe={statusMeta[b.status].color} style={{ marginBottom: spacing.sm }} onPress={() => router.push('/(tabs)/toilets')}>
              <View style={styles.blockRow}>
                <View style={{ flex: 1 }}>
                  <Txt variant="h3">{b.name}</Txt>
                  <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{b.reporting} of {b.toilets} sending · {b.users} staff</Txt>
                </View>
                <View style={[styles.blockTag, { backgroundColor: statusMeta[b.status].soft }]}>
                  <Txt variant="tiny" color={statusMeta[b.status].color}>{statusMeta[b.status].label}</Txt>
                </View>
              </View>
            </AppCard>
          ))}
        </>
      )}

      <SectionHeader title="Cleaning today" action="Open" onAction={() => router.push('/(tabs)/cleaning')} />
      <AppCard onPress={() => router.push('/(tabs)/cleaning')}>
        <View style={styles.blockRow}>
          <View style={styles.cleanIcon}><MaterialCommunityIcons name="broom" size={20} color={colors.primary} /></View>
          <View style={{ flex: 1 }}>
            <Txt variant="h3">{CLEANING_JOBS.filter((j) => !j.done).length} blocks to clean</Txt>
            <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>Record a clean or call a cleaner</Txt>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} />
        </View>
      </AppCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.lg },
  roleChip: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  roleBadge: { width: 26, height: 26, borderRadius: 8, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  heroIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  btnLabel: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  tiles: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  blockRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  blockTag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.pill },
  cleanIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
});
