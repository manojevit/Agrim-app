import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlertCard } from '@/components/AlertCard';
import { BuildingCard } from '@/components/BuildingCard';
import { ProgressRing } from '@/components/ProgressRing';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { BLOCK, BLOCK_BUILDINGS, blockHandedUp } from '@/data/block';
import { StatusKey, colors, radius, spacing } from '@/theme';

function greetKey() {
  const h = new Date().getHours();
  return h < 12 ? 'greet.morning' : h < 17 ? 'greet.afternoon' : 'greet.evening';
}

export default function BlockHome() {
  const insets = useSafeAreaInsets();
  const { t } = useLang();
  const buildings = BLOCK_BUILDINGS;
  const total = buildings.length;
  const good = buildings.filter((b) => b.status === 'good');
  const needNow = buildings.filter((b) => b.status === 'act' || b.status === 'offline');
  const handedUp = blockHandedUp;

  const order: Record<StatusKey, number> = { act: 0, offline: 1, watch: 2, never: 3, good: 4 };
  const others = buildings.filter((b) => !needNow.includes(b)).sort((a, b) => order[a.status] - order[b.status]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
        <View style={[styles.hero, { paddingTop: insets.top + spacing.md }]}>
          <View style={styles.heroTop}>
            <View style={{ flex: 1 }}>
              <Txt variant="small" color="rgba(255,255,255,0.72)">{t(greetKey())}, {BLOCK.name}</Txt>
              <Txt variant="h1" color="#FFFFFF" style={{ marginTop: 2 }}>{BLOCK.area}</Txt>
              <Txt variant="small" color="rgba(255,255,255,0.72)" style={{ marginTop: 2 }}>{t('b.clusterN', { n: total })}</Txt>
            </View>
            <Pressable style={styles.switch} onPress={() => router.push('/switch-role')}>
              <MaterialCommunityIcons name="swap-horizontal" size={16} color="#FFFFFF" />
              <Txt variant="tiny" color="#FFFFFF">{t('common.switch')}</Txt>
            </Pressable>
          </View>

          <View style={styles.statRow}>
            <ProgressRing size={76} stroke={9} progress={total ? good.length / total : 0} color="#FFFFFF" track="rgba(255,255,255,0.22)">
              <View style={{ alignItems: 'center' }}>
                <Txt variant="h2" color="#FFFFFF">{good.length}</Txt>
                <Txt variant="tiny" color="rgba(255,255,255,0.72)">{t('cl.ofN', { n: total })}</Txt>
              </View>
            </ProgressRing>
            <View style={{ flex: 1 }}>
              <Txt variant="h2" color="#FFFFFF">{needNow.length > 0 ? t('b.needYou', { n: needNow.length }) : t('b.allGood')}</Txt>
              <Txt variant="small" color="rgba(255,255,255,0.72)" style={{ marginTop: 2 }}>{t('b.handedN', { n: handedUp.length })}</Txt>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {handedUp.length > 0 && (
            <>
              <View style={styles.sectionRow}>
                <MaterialCommunityIcons name="arrow-up-circle" size={18} color={colors.act} />
                <Txt variant="h3" color={colors.act}>{t('b.handedTitle')}</Txt>
              </View>
              <Txt variant="small" color={colors.textMuted} style={{ marginTop: -spacing.xs, marginBottom: spacing.sm }}>{t('b.handedSub')}</Txt>
              {handedUp.map((a) => <AlertCard key={a.id} alert={a} />)}
            </>
          )}

          {needNow.length > 0 && (
            <>
              <Txt variant="h3" style={{ marginTop: spacing.xl, marginBottom: spacing.sm }}>{t('b.buildingsNeed')}</Txt>
              {needNow.map((b) => <BuildingCard key={b.id} building={b} variant="focus" />)}
            </>
          )}

          <Txt variant="h3" style={{ marginTop: spacing.xl, marginBottom: spacing.sm }}>{t('b.otherBuildings')}</Txt>
          {others.map((b) => <BuildingCard key={b.id} building={b} variant="row" />)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingBottom: spacing.xl, borderBottomLeftRadius: radius.xxl, borderBottomRightRadius: radius.xxl },
  heroTop: { flexDirection: 'row', alignItems: 'flex-start' },
  switch: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  statRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginTop: spacing.xl, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: radius.lg, padding: spacing.md },
  body: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
});
