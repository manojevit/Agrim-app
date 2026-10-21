import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlertCard } from '@/components/AlertCard';
import { BuildingCard } from '@/components/BuildingCard';
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
  const good = buildings.filter((b) => b.status === 'good');
  const needNow = buildings.filter((b) => b.status === 'act' || b.status === 'offline');
  const handedUp = blockHandedUp;
  const order: Record<StatusKey, number> = { act: 0, offline: 1, watch: 2, never: 3, good: 4 };
  const others = buildings.filter((b) => !needNow.includes(b)).sort((a, b) => order[a.status] - order[b.status]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingTop: insets.top + spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl }} showsVerticalScrollIndicator={false}>
      <View style={styles.head}>
        <View style={{ flex: 1 }}>
          <Txt variant="small" color={colors.textSubtle}>{t(greetKey())}, {BLOCK.name}</Txt>
          <Txt variant="h1" style={{ marginTop: 2 }}>{BLOCK.area}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{t('b.clusterN', { n: buildings.length })}</Txt>
        </View>
        <Pressable style={styles.switch} onPress={() => router.push('/switch-role')}>
          <MaterialCommunityIcons name="swap-horizontal" size={15} color={colors.text} />
          <Txt variant="tiny" color={colors.text}>{t('common.switch')}</Txt>
        </Pressable>
      </View>

      <View style={styles.stats}>
        <Stat n={needNow.length} label={t('b.needLbl')} tone={needNow.length ? colors.act : colors.text} />
        <View style={styles.divider} />
        <Stat n={handedUp.length} label={t('b.handedLbl')} tone={handedUp.length ? colors.act : colors.text} />
        <View style={styles.divider} />
        <Stat n={good.length} label={t('b.goodLbl')} tone={colors.good} />
      </View>

      {handedUp.length > 0 && (
        <>
          <View style={styles.sectionRow}>
            <MaterialCommunityIcons name="arrow-up" size={16} color={colors.act} />
            <Txt variant="h3">{t('b.handedTitle')}</Txt>
          </View>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: -spacing.xs, marginBottom: spacing.sm }}>{t('b.handedSub')}</Txt>
          {handedUp.map((a) => <AlertCard key={a.id} alert={a} />)}
        </>
      )}

      {needNow.length > 0 && (
        <>
          <Txt variant="overline" color={colors.textSubtle} style={{ marginTop: spacing.xl, marginBottom: spacing.sm }}>{t('b.buildingsNeed').toUpperCase()}</Txt>
          {needNow.map((b) => <BuildingCard key={b.id} building={b} variant="focus" />)}
        </>
      )}

      <Txt variant="overline" color={colors.textSubtle} style={{ marginTop: spacing.xl, marginBottom: spacing.sm }}>{t('b.otherBuildings').toUpperCase()}</Txt>
      {others.map((b) => <BuildingCard key={b.id} building={b} variant="row" />)}
    </ScrollView>
  );
}

function Stat({ n, label, tone }: { n: number; label: string; tone: string }) {
  return (
    <View style={styles.stat}>
      <Txt variant="display" color={tone}>{n}</Txt>
      <Txt variant="small" color={colors.textMuted}>{label}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.lg },
  switch: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  stats: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, paddingVertical: spacing.lg },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  divider: { width: 1, height: 36, backgroundColor: colors.border },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl, marginBottom: spacing.sm },
});
