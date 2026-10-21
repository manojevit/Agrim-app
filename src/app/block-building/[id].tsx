import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { ToiletCard } from '@/components/ToiletCard';
import { Txt } from '@/components/Txt';
import { blockBuildingById, toiletsForBuilding } from '@/data/block';
import { StatusKey, colors, radius, spacing, statusMeta } from '@/theme';

export default function BlockBuilding() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const b = blockBuildingById(id);
  if (!b) return <View style={{ flex: 1, backgroundColor: colors.bg }}><AppHeader back title="Building" /></View>;
  const m = statusMeta[b.status];
  const toilets = toiletsForBuilding(b.name);
  const order: Record<StatusKey, number> = { act: 0, offline: 1, watch: 2, never: 3, good: 4 };
  const sorted = [...toilets].sort((x, y) => order[x.status] - order[y.status]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={b.name} subtitle={b.path}>
        <View style={styles.statusCard}>
          <View style={[styles.medallion, { backgroundColor: m.color }]}>
            <MaterialCommunityIcons name="office-building" size={24} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Txt variant="h3" color="#FFFFFF">{b.headline}</Txt>
            <Txt variant="small" color="rgba(255,255,255,0.8)" style={{ marginTop: 2 }}>{b.reporting} of {b.toilets} sensors sending · {b.cleaners} cleaners</Txt>
          </View>
        </View>
      </AppHeader>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        {/* quick stats */}
        <View style={styles.stats}>
          <Stat label="Need cleaning" value={`${b.needNow}`} tone={b.needNow ? colors.act : colors.good} />
          <View style={styles.vline} />
          <Stat label="Open alerts" value={`${b.openAlerts}`} tone={b.openAlerts ? colors.watch : colors.good} />
          <View style={styles.vline} />
          <Stat label="Handed up" value={`${b.handedUp}`} tone={b.handedUp ? colors.act : colors.good} />
        </View>

        <Button mode="contained" icon="phone" style={styles.callBtn} contentStyle={{ height: 50 }} labelStyle={styles.btnLabel} onPress={() => router.push('/staff')}>
          Call a cleaner for this building
        </Button>

        <Txt variant="h3" style={{ marginTop: spacing.xl, marginBottom: spacing.sm }}>Toilets</Txt>
        {sorted.length > 0 ? (
          sorted.map((t) => <ToiletCard key={t.id} toilet={t} variant="row" />)
        ) : (
          <View style={styles.empty}>
            <MaterialCommunityIcons name="wifi-off" size={22} color={colors.textSubtle} />
            <Txt variant="small" color={colors.textMuted} style={{ flex: 1 }}>No sensors are reporting here yet. Someone should check the units.</Txt>
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
      <Txt variant="tiny" color={colors.textMuted}>{label}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  statusCard: { flexDirection: 'row', gap: spacing.md, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: radius.lg, padding: spacing.md, marginTop: spacing.lg },
  medallion: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  stats: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.xl, paddingVertical: spacing.lg },
  vline: { width: 1, height: 40, backgroundColor: colors.border },
  callBtn: { borderRadius: radius.md, marginTop: spacing.md },
  btnLabel: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 15 },
  empty: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceAlt, borderRadius: radius.md, padding: spacing.lg },
});
