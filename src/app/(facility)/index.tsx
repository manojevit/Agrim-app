import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProgressRing } from '@/components/ProgressRing';
import { ToiletCard } from '@/components/ToiletCard';
import { Txt } from '@/components/Txt';
import { FACILITY, facilityAlerts, facilityToilets } from '@/data/facility';
import { StatusKey, colors, radius, spacing } from '@/theme';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

export default function FacilityHome() {
  const insets = useSafeAreaInsets();
  const toilets = facilityToilets;
  const total = toilets.length;
  const good = toilets.filter((t) => t.status === 'good');
  const needNow = toilets.filter((t) => t.status === 'act' || t.status === 'offline');
  const reporting = toilets.filter((t) => t.status !== 'offline' && t.status !== 'never').length;
  const openAlerts = facilityAlerts.filter((a) => a.state !== 'resolved').length;

  const order: Record<StatusKey, number> = { act: 0, offline: 1, watch: 2, never: 3, good: 4 };
  const others = toilets.filter((t) => !needNow.includes(t)).sort((a, b) => order[a.status] - order[b.status]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
        {/* Hero */}
        <View style={[styles.hero, { paddingTop: insets.top + spacing.md }]}>
          <View style={styles.heroTop}>
            <View style={{ flex: 1 }}>
              <Txt variant="small" color="rgba(255,255,255,0.72)">{greeting()}, {FACILITY.name}</Txt>
              <Txt variant="h1" color="#FFFFFF" style={{ marginTop: 2 }}>{FACILITY.building}</Txt>
            </View>
            <Pressable style={styles.switch} onPress={() => router.push('/switch-role')}>
              <MaterialCommunityIcons name="swap-horizontal" size={16} color="#FFFFFF" />
              <Txt variant="tiny" color="#FFFFFF">Switch</Txt>
            </Pressable>
          </View>

          <View style={styles.statRow}>
            <ProgressRing size={76} stroke={9} progress={total ? good.length / total : 0} color="#FFFFFF" track="rgba(255,255,255,0.22)">
              <View style={{ alignItems: 'center' }}>
                <Txt variant="h2" color="#FFFFFF">{good.length}</Txt>
                <Txt variant="tiny" color="rgba(255,255,255,0.72)">of {total} good</Txt>
              </View>
            </ProgressRing>
            <View style={{ flex: 1 }}>
              <Txt variant="h2" color="#FFFFFF">{needNow.length > 0 ? `${needNow.length} need you now` : 'All good'}</Txt>
              <Txt variant="small" color="rgba(255,255,255,0.72)" style={{ marginTop: 2 }}>{reporting} of {total} sensors sending readings</Txt>
            </View>
          </View>

          <Pressable style={styles.callBtn} onPress={() => router.push('/staff')}>
            <MaterialCommunityIcons name="phone" size={18} color={colors.primary} />
            <Txt variant="label" color={colors.primary}>Call a cleaner</Txt>
          </Pressable>
        </View>

        <View style={styles.body}>
          {/* Open alerts banner */}
          {openAlerts > 0 && (
            <Pressable style={styles.alertBanner} onPress={() => router.push('/(facility)/alerts')}>
              <View style={styles.bellWrap}><MaterialCommunityIcons name="bell-ring" size={20} color={colors.act} /></View>
              <View style={{ flex: 1 }}>
                <Txt variant="bodyMed">{openAlerts} open {openAlerts === 1 ? 'alert' : 'alerts'}</Txt>
                <Txt variant="tiny" color={colors.textMuted} style={{ marginTop: 1 }}>Acknowledge them so they don't go up to your senior</Txt>
              </View>
              <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} />
            </Pressable>
          )}

          {needNow.length > 0 && (
            <>
              <View style={styles.sectionRow}>
                <View style={styles.liveDot} />
                <Txt variant="h3" color={colors.act}>Needs attention now</Txt>
              </View>
              {needNow.map((t) => <ToiletCard key={t.id} toilet={t} variant="focus" />)}
            </>
          )}

          <Txt variant="h3" style={{ marginTop: needNow.length ? spacing.xl : spacing.md, marginBottom: spacing.sm }}>
            {needNow.length ? 'Other toilets' : 'All toilets'}
          </Txt>
          {others.map((t) => <ToiletCard key={t.id} toilet={t} variant="row" />)}
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
  callBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: '#FFFFFF', borderRadius: radius.md, paddingVertical: spacing.md, marginTop: spacing.md },
  body: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  alertBanner: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md },
  bellWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.actSoft, alignItems: 'center', justifyContent: 'center' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  liveDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.act },
});
