import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToiletCard } from '@/components/ToiletCard';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { FACILITY, facilityAlerts, facilityToilets } from '@/data/facility';
import { StatusKey, colors, radius, spacing } from '@/theme';

function greetKey() {
  const h = new Date().getHours();
  return h < 12 ? 'greet.morning' : h < 17 ? 'greet.afternoon' : 'greet.evening';
}

export default function FacilityHome() {
  const insets = useSafeAreaInsets();
  const { t } = useLang();
  const toilets = facilityToilets;
  const total = toilets.length;
  const good = toilets.filter((x) => x.status === 'good');
  const needNow = toilets.filter((x) => x.status === 'act' || x.status === 'offline');
  const reporting = toilets.filter((x) => x.status !== 'offline' && x.status !== 'never').length;
  const openAlerts = facilityAlerts.filter((a) => a.state !== 'resolved').length;
  const order: Record<StatusKey, number> = { act: 0, offline: 1, watch: 2, never: 3, good: 4 };
  const others = toilets.filter((x) => !needNow.includes(x)).sort((a, b) => order[a.status] - order[b.status]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingTop: insets.top + spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl }} showsVerticalScrollIndicator={false}>
      <View style={styles.head}>
        <View style={{ flex: 1 }}>
          <Txt variant="small" color={colors.textSubtle}>{t(greetKey())}, {FACILITY.name}</Txt>
          <Txt variant="h1" style={{ marginTop: 2 }}>{FACILITY.building}</Txt>
        </View>
        <Pressable style={styles.switch} onPress={() => router.push('/switch-role')}>
          <MaterialCommunityIcons name="swap-horizontal" size={15} color={colors.text} />
          <Txt variant="tiny" color={colors.text}>{t('common.switch')}</Txt>
        </Pressable>
      </View>

      <View style={styles.stats}>
        <Stat n={needNow.length} label={t('f.needLbl')} tone={needNow.length ? colors.act : colors.text} />
        <View style={styles.divider} />
        <Stat n={good.length} label={t('f.goodLbl')} tone={colors.good} />
        <View style={styles.divider} />
        <Stat n={`${reporting}/${total}`} label={t('f.sendingLbl')} tone={colors.text} />
      </View>

      <Pressable style={styles.callBtn} onPress={() => router.push('/staff')}>
        <MaterialCommunityIcons name="phone-outline" size={18} color={colors.textInverse} />
        <Txt variant="label" color={colors.textInverse}>{t('f.callCleaner')}</Txt>
      </Pressable>

      {openAlerts > 0 && (
        <Pressable style={styles.banner} onPress={() => router.push('/(facility)/alerts')}>
          <View style={[styles.bannerIcon, { backgroundColor: colors.actSoft }]}><MaterialCommunityIcons name="bell-outline" size={18} color={colors.act} /></View>
          <View style={{ flex: 1 }}>
            <Txt variant="bodyMed">{t('f.openAlerts', { n: openAlerts })}</Txt>
            <Txt variant="tiny" color={colors.textMuted} style={{ marginTop: 1 }}>{t('f.ackThem')}</Txt>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} />
        </Pressable>
      )}

      {needNow.length > 0 && (
        <>
          <View style={styles.sectionRow}>
            <View style={styles.liveDot} />
            <Txt variant="h3">{t('f.needsAttention')}</Txt>
          </View>
          {needNow.map((x) => <ToiletCard key={x.id} toilet={x} variant="focus" />)}
        </>
      )}

      <Txt variant="overline" color={colors.textSubtle} style={{ marginTop: needNow.length ? spacing.xl : spacing.lg, marginBottom: spacing.sm }}>
        {(needNow.length ? t('f.otherToilets') : t('f.allToilets')).toUpperCase()}
      </Txt>
      {others.map((x) => <ToiletCard key={x.id} toilet={x} variant="row" />)}
    </ScrollView>
  );
}

function Stat({ n, label, tone }: { n: number | string; label: string; tone: string }) {
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
  callBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: spacing.md, marginTop: spacing.md },
  banner: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.md, marginTop: spacing.md },
  bannerIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl, marginBottom: spacing.sm },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.act },
});
