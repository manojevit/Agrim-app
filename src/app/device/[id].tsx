import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { AreaChart } from '@/components/AreaChart';
import { Gauge } from '@/components/Gauge';
import { Pill } from '@/components/Pill';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { Reading, blockById, deviceBySerial } from '@/data/devices';
import { aqiBand, colors, odourColor, radius, spacing } from '@/theme';

const levelColor = { good: colors.good, watch: colors.watch, warn: colors.warn, act: colors.act } as const;

export default function DeviceDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLang();
  const [tab, setTab] = useState<'live' | 'trend' | 'info'>('live');
  const d = deviceBySerial(id);
  if (!d) return <View style={{ flex: 1, backgroundColor: colors.bg }}><AppHeader back title={t('dd.title')} /></View>;
  const b = blockById(d.blockId);
  const band = aqiBand(d.aqi);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={t('dd.title')}>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Txt variant="h1">{d.serial}</Txt>
            <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{b?.ward} · {b?.area} · {b?.city}</Txt>
            <View style={styles.online}>
              <View style={[styles.dot, { backgroundColor: d.online ? colors.good : colors.offline }]} />
              <Txt variant="small" color={colors.textMuted}>{d.online ? t('st.online') : t('st.offline')} · {d.lastSeen}</Txt>
            </View>
          </View>
          {d.aqi != null && <Pill text={`AQI ${d.aqi} · ${band.label}`} color={band.color} />}
        </View>
      </AppHeader>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xxxl }}>
        {d.online ? (
          <>
            <View style={styles.gauges}>
              <Gauge value={d.aqi} max={500} color={band.color} unit={t('dd.index')} label={t('dd.aqi')} />
              <Gauge value={d.odour} max={5} color={odourColor(d.odour)} unit={t('dd.level')} label={t('dd.odour')} />
            </View>

            <View style={styles.tabs}>
              <Tab label={t('dd.live')} active={tab === 'live'} onPress={() => setTab('live')} />
              <Tab label={t('dd.trend')} active={tab === 'trend'} onPress={() => setTab('trend')} />
              <Tab label={t('dd.info')} active={tab === 'info'} onPress={() => setTab('info')} />
            </View>

            {tab === 'live' && (
              <View style={{ marginTop: spacing.lg }}>
                <Txt variant="small" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{t('dd.readingsAsOf')}</Txt>
                {d.readings.map((r) => <ReadingRow key={r.key} r={r} />)}
              </View>
            )}

            {tab === 'trend' && (
              <View style={styles.card}>
                <View style={styles.cardHead}>
                  <Txt variant="h3">{t('dd.aqi24h')}</Txt>
                  <Txt variant="small" color={colors.textMuted}>{t('dd.avg', { n: Math.round(d.aqiTrend.reduce((s, v) => s + v, 0) / d.aqiTrend.length) })}</Txt>
                </View>
                <AreaChart data={d.aqiTrend} color={band.color} width={300} height={130} />
                <View style={styles.axis}>
                  <Txt variant="tiny" color={colors.textSubtle}>11:30 am</Txt>
                  <Txt variant="tiny" color={colors.textSubtle}>10:30 pm</Txt>
                  <Txt variant="tiny" color={colors.textSubtle}>9:30 am</Txt>
                </View>
              </View>
            )}

            {tab === 'info' && (
              <View style={[styles.card, { padding: 0, marginTop: spacing.lg }]}>
                <InfoRow label={t('dd.block')} value={`${b?.city} › ${b?.area} › ${b?.ward} › ${b?.name}`} />
                <InfoRow label={t('dd.serial')} value={d.serial} />
                <InfoRow label={t('dd.model')} value={d.model} />
                <InfoRow label={t('dd.hwRev')} value={d.hardwareRev} />
                <InfoRow label={t('dd.firmware')} value={d.firmware} />
                <InfoRow label={t('dd.lastSeen')} value={d.lastSeen} />
                <InfoRow label={t('dd.labels')} value={d.label ?? '—'} last />
              </View>
            )}

            <Txt variant="label" color={colors.primary} style={{ textAlign: 'center', marginTop: spacing.xl }} onPress={() => router.push('/block-usage')}>
              {t('dd.useOfBlock')}
            </Txt>
          </>
        ) : (
          <View style={styles.offline}>
            <View style={styles.offlineIcon}><MaterialCommunityIcons name="wifi-off" size={28} color={colors.offline} /></View>
            <Txt variant="h3" style={{ marginTop: spacing.md }}>{t('dd.offlineTitle')}</Txt>
            <Txt variant="small" color={colors.textMuted} style={{ textAlign: 'center', marginTop: 4 }}>{t('dd.offlineBody')}</Txt>
            <View style={[styles.card, { padding: 0, marginTop: spacing.xl, alignSelf: 'stretch' }]}>
              <InfoRow label={t('dd.block')} value={`${b?.name}`} />
              <InfoRow label={t('dd.serial')} value={d.serial} />
              <InfoRow label={t('dd.model')} value={d.model} />
              <InfoRow label={t('dd.firmware')} value={d.firmware} />
              <InfoRow label={t('dd.lastSeen')} value={d.lastSeen} last />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function Tab({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Txt variant={active ? 'h3' : 'bodyMed'} color={active ? colors.text : colors.textSubtle} onPress={onPress} style={[styles.tab, active && styles.tabOn]}>
      {label}
    </Txt>
  );
}

function ReadingRow({ r }: { r: Reading }) {
  return (
    <View style={styles.reading}>
      <View style={[styles.rdot, { backgroundColor: levelColor[r.level] }]} />
      <Txt variant="h3" style={{ flex: 1 }}>{r.name}</Txt>
      <Txt variant="h3">{r.value}</Txt>
      <Txt variant="small" color={colors.textSubtle} style={{ marginLeft: 4, width: 44 }}>{r.unit}</Txt>
    </View>
  );
}

function InfoRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.infoRow, !last && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
      <Txt variant="small" color={colors.textMuted}>{label}</Txt>
      <Txt variant="label" style={{ flexShrink: 1, textAlign: 'right', marginLeft: spacing.lg }}>{value}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm, marginTop: spacing.sm },
  online: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  dot: { width: 9, height: 9, borderRadius: 5 },
  gauges: { flexDirection: 'row', justifyContent: 'space-around', marginTop: spacing.sm, marginBottom: spacing.lg },
  tabs: { flexDirection: 'row', gap: spacing.xl, borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { paddingVertical: spacing.sm, paddingBottom: spacing.md },
  tabOn: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  reading: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, paddingVertical: 15, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  rdot: { width: 10, height: 10, borderRadius: 5 },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginTop: spacing.lg },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  axis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xs },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: spacing.lg },
  offline: { alignItems: 'center', paddingTop: spacing.xxxl },
  offlineIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.offlineSoft, alignItems: 'center', justifyContent: 'center' },
});
