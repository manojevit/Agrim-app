import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { ToiletCard } from '@/components/ToiletCard';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { blockBuildingById, toiletsForBuilding } from '@/data/block';
import { StatusKey, colors, radius, spacing, statusMeta } from '@/theme';

export default function BlockBuilding() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, lang } = useLang();
  const b = blockBuildingById(id);
  if (!b) return <View style={{ flex: 1, backgroundColor: colors.bg }}><AppHeader back title="Building" /></View>;
  const m = statusMeta[b.status];
  const toilets = toiletsForBuilding(b.name);
  const order: Record<StatusKey, number> = { act: 0, offline: 1, watch: 2, never: 3, good: 4 };
  const sorted = [...toilets].sort((x, y) => order[x.status] - order[y.status]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={b.name} subtitle={b.path} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxxl }}>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.iconTile, { backgroundColor: m.soft }]}><MaterialCommunityIcons name="office-building-outline" size={22} color={m.color} /></View>
            <View style={{ flex: 1 }}>
              <Txt variant="h3" color={m.color}>{lang === 'hi' ? b.headlineHi : b.headline}</Txt>
              <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{t('b.sensorsCleaners', { r: b.reporting, n: b.toilets, c: b.cleaners })}</Txt>
            </View>
          </View>
        </View>

        <View style={[styles.stats, { marginTop: spacing.md }]}>
          <Stat label={t('b.needCleaning')} value={`${b.needNow}`} tone={b.needNow ? colors.act : colors.text} />
          <View style={styles.vline} />
          <Stat label={t('b.openLbl')} value={`${b.openAlerts}`} tone={b.openAlerts ? colors.watch : colors.text} />
          <View style={styles.vline} />
          <Stat label={t('b.handedUp')} value={`${b.handedUp}`} tone={b.handedUp ? colors.act : colors.text} />
        </View>

        <Button mode="contained" icon="phone-outline" style={styles.callBtn} contentStyle={{ height: 50 }} labelStyle={styles.btnLabel} onPress={() => router.push('/staff')}>
          {t('b.callForBuilding')}
        </Button>

        <Txt variant="overline" color={colors.textSubtle} style={{ marginTop: spacing.xl, marginBottom: spacing.sm }}>{t('tab.toilets').toUpperCase()}</Txt>
        {sorted.length > 0 ? (
          sorted.map((x) => <ToiletCard key={x.id} toilet={x} variant="row" />)
        ) : (
          <View style={styles.empty}>
            <MaterialCommunityIcons name="wifi-off" size={20} color={colors.textSubtle} />
            <Txt variant="small" color={colors.textMuted} style={{ flex: 1 }}>{t('b.noSensors')}</Txt>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
      <Txt variant="h1" color={tone}>{value}</Txt>
      <Txt variant="tiny" color={colors.textMuted} style={{ textAlign: 'center' }}>{label}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  row: { flexDirection: 'row', gap: spacing.md },
  iconTile: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  stats: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, paddingVertical: spacing.lg },
  vline: { width: 1, height: 36, backgroundColor: colors.border },
  callBtn: { borderRadius: radius.md, marginTop: spacing.md, backgroundColor: colors.primary },
  btnLabel: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  empty: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceAlt, borderRadius: radius.md, padding: spacing.lg },
});
