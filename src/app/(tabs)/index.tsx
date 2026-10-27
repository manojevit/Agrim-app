import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert as RNAlert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MetricCard } from '@/components/MetricCard';
import { AlertRow } from '@/components/AlertRow';
import { MapPreview } from '@/components/MapPreview';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { useSession } from '@/context/session';
import { ALERTS, summary } from '@/data/devices';
import { personForRole } from '@/data/roles';
import { aqiBand, colors, odourColor, radius, spacing } from '@/theme';
import { boundedContent, useResponsive } from '@/theme/responsive';

function greetKey() {
  const h = new Date().getHours();
  if (h < 12) return 'greet.morning';
  if (h < 17) return 'greet.afternoon';
  return 'greet.evening';
}

export default function Home() {
  const insets = useSafeAreaInsets();
  const { role } = useSession();
  const { t } = useLang();
  const r = useResponsive();
  const [tab, setTab] = useState<'dashboard' | 'map'>('dashboard');

  const s = summary();
  const band = aqiBand(s.avgAqi);
  const roleName = role ? t('role.' + role.id) : '';
  const person = role ? personForRole(role.id) : null;
  const newest = ALERTS.filter((a) => a.state === 'active').slice(0, 3);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm, paddingHorizontal: r.gutter }]}>
        <Txt variant="h1" style={{ flex: 1 }}>{t('home.title')}</Txt>
        <Pressable hitSlop={10} onPress={() => router.push('/search')}><MaterialCommunityIcons name="magnify" size={24} color={colors.text} /></Pressable>
        <Pressable hitSlop={10} onPress={() => router.push('/(tabs)/alerts')} style={{ marginLeft: spacing.md }}><MaterialCommunityIcons name="bell-outline" size={23} color={colors.text} /></Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={boundedContent(r, 120)}>
        <View style={styles.toggle}>
          <Seg label={t('home.dashboard')} active={tab === 'dashboard'} onPress={() => setTab('dashboard')} />
          <Seg label={t('home.map')} active={tab === 'map'} onPress={() => setTab('map')} />
        </View>

        {tab === 'map' && <View style={{ marginBottom: spacing.lg }}><MapPreview height={230} /></View>}

        <Txt variant="small" color={colors.textMuted}>{t(greetKey())}</Txt>
        <Txt variant="h1" style={{ marginTop: 2 }}>{person?.name ?? ''}</Txt>
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{t('home.areas', { role: roleName, n: s.blocks })}</Txt>
        <Txt variant="small" color={colors.textSubtle} style={{ marginTop: spacing.md, marginBottom: spacing.sm }}>{t('home.asOf')}</Txt>

        <View style={styles.grid}>
          <MetricCard label={t('home.devicesOnline')} value={`${s.devicesReporting}/${s.devicesTotal}`} spark={[7, 7, 7, 7, 6, 7, 6, 4]} sparkColor={colors.good} />
          <MetricCard label={t('home.activeAlerts')} value={`${s.activeAlerts}`} pill={t('home.criticalN', { n: s.critical })} pillColor={colors.act} pillVariant="outline" />
        </View>
        <View style={[styles.grid, { marginTop: spacing.md }]}>
          <MetricCard label={t('home.avgAqi')} value={`${s.avgAqi}`} pill={band.label} pillColor={band.color} spark={[180, 210, 190, 230, 205, 240, 206]} sparkColor={band.color} />
          <MetricCard label={t('home.odourIndex')} value={`${s.odourIndex}`} pill={s.odourIndex >= 4 ? 'High' : 'Moderate'} pillColor={odourColor(s.odourIndex)} spark={[2, 2, 3, 2, 3, 4, 4]} sparkColor={odourColor(s.odourIndex)} />
        </View>

        <Txt variant="small" color={colors.textMuted} style={{ marginTop: spacing.lg }}>
          {t('home.summary', { blocks: s.blocks, healthy: s.healthy, need: s.needAttention, silent: s.silent })}
        </Txt>

        <View style={styles.sectionHead}>
          <Txt variant="h2">{t('home.newest')}</Txt>
          <Pressable onPress={() => router.push('/(tabs)/alerts')}><Txt variant="label" color={colors.primary}>{t('common.seeAll')}</Txt></Pressable>
        </View>
        {newest.map((a) => <AlertRow key={a.id} alert={a} />)}
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => RNAlert.alert('Voice assistant', 'Ask about your area by voice. (Prototype)')}>
        <MaterialCommunityIcons name="microphone" size={26} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

function Seg({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.seg, active ? styles.segOn : styles.segOff]}>
      <Txt variant="label" color={active ? colors.primary : colors.textMuted}>{label}</Txt>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  toggle: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md, marginBottom: spacing.lg },
  seg: { borderRadius: radius.pill, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  segOn: { backgroundColor: colors.primarySoft },
  segOff: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  grid: { flexDirection: 'row', gap: spacing.md },
  sectionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xl, marginBottom: spacing.sm },
  fab: { position: 'absolute', right: spacing.lg, bottom: spacing.xl, width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', shadowColor: colors.primary, shadowOpacity: 0.4, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 8 },
});
