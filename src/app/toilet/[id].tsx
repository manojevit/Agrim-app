import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert as RNAlert, Pressable, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AppCard } from '@/components/AppCard';
import { LevelMeter } from '@/components/LevelMeter';
import { Scaffold } from '@/components/Scaffold';
import { StatusChip } from '@/components/StatusChip';
import { Txt } from '@/components/Txt';
import { toiletById } from '@/data/toilets';
import { colors, radius, spacing, statusMeta } from '@/theme';

const odourWord = (n: number) => ['Fresh', 'Fresh', 'Light smell', 'Noticeable', 'Smelly', 'Very smelly'][n] ?? '—';
const airWord = (a: number) => (a <= 100 ? 'Clean' : a <= 200 ? 'Okay' : a <= 300 ? 'Poor' : 'Very poor');

export default function ToiletDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const toilet = toiletById(id);
  const [showScience, setShowScience] = useState(false);
  if (!toilet) return <Scaffold title="Toilet" back><Txt>Not found.</Txt></Scaffold>;

  const m = statusMeta[toilet.status];
  const hasData = toilet.aqi != null;

  return (
    <Scaffold title={toilet.name} subtitle={toilet.block} back>
      <AppCard stripe={m.color}>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <View style={[styles.bigIcon, { backgroundColor: m.soft }]}><MaterialCommunityIcons name={m.icon as any} size={30} color={m.color} /></View>
          <View style={{ flex: 1 }}>
            <Txt variant="h2" color={m.color}>{toilet.headline}</Txt>
            <Txt variant="body" color={colors.textMuted} style={{ marginTop: 2 }}>{toilet.reason}</Txt>
          </View>
        </View>
        <View style={styles.metaRow}>
          <StatusChip status={toilet.status} size="sm" />
          <Txt variant="small" color={colors.textSubtle}>· Last reading {toilet.lastSeen}</Txt>
        </View>
      </AppCard>

      {hasData && (
        <AppCard style={{ marginTop: spacing.md, gap: spacing.xl }}>
          <LevelMeter title="Smell" word={odourWord(toilet.odour!)} value={toilet.odour! / 5} tone={toilet.odour! >= 4 ? colors.act : toilet.odour! >= 3 ? colors.watch : colors.good} caption={`Odour level ${toilet.odour} of 5`} />
          <LevelMeter title="Air" word={airWord(toilet.aqi!)} value={toilet.aqi! / 500} tone={toilet.aqi! > 300 ? colors.act : toilet.aqi! > 200 ? colors.watch : colors.good} caption={`Air quality index ${toilet.aqi} of 500`} />
        </AppCard>
      )}

      <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
        {toilet.status === 'act' && <Button mode="contained" icon="phone" onPress={() => RNAlert.alert('Send a cleaner', `Ringing the cleaners for ${toilet.block}.`)} style={styles.btn} contentStyle={{ height: 48 }} labelStyle={styles.btnLabel}>Send a cleaner</Button>}
        {toilet.status === 'offline' && <Button mode="contained" icon="wrench" onPress={() => RNAlert.alert('Reported', 'A maintenance check has been logged for this unit.')} style={styles.btn} contentStyle={{ height: 48 }} labelStyle={styles.btnLabel}>Report sensor problem</Button>}
        <Button mode="outlined" icon="check" onPress={() => RNAlert.alert('Cleaned', `${toilet.name} logged as cleaned just now.`)} style={[styles.btn, { borderColor: colors.borderStrong }]} contentStyle={{ height: 48 }} labelStyle={styles.btnLabel} textColor={colors.primary}>Mark toilet as cleaned</Button>
      </View>

      {toilet.readings.length > 0 && (
        <>
          <Pressable style={styles.scienceToggle} onPress={() => setShowScience((s) => !s)}>
            <MaterialCommunityIcons name="flask-outline" size={16} color={colors.textMuted} />
            <Txt variant="label" color={colors.textMuted}>{showScience ? 'Hide the detailed readings' : 'Show the detailed readings'}</Txt>
            <MaterialCommunityIcons name={showScience ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textMuted} />
          </Pressable>
          {showScience && (
            <AppCard padded={false} style={{ marginTop: spacing.sm }}>
              {toilet.readings.map((rd, i) => (
                <View key={rd.key} style={[styles.readRow, i < toilet.readings.length - 1 && styles.border]}>
                  <View style={{ flex: 1 }}>
                    <Txt variant="bodyMed">{rd.plain}</Txt>
                    <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 1 }}>{rd.key}</Txt>
                  </View>
                  <Txt variant="h3" color={statusMeta[rd.level].color}>{rd.value} <Txt variant="tiny" color={colors.textSubtle}>{rd.unit}</Txt></Txt>
                </View>
              ))}
            </AppCard>
          )}
        </>
      )}

      <AppCard style={{ marginTop: spacing.md }} padded={false}>
        <Info label="Building" value={toilet.block} />
        <Info label="Area" value={toilet.path} />
        <Info label="Sensor ID" value={toilet.serial} last />
      </AppCard>
    </Scaffold>
  );
}

function Info({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.infoRow, !last && styles.border]}>
      <Txt variant="small" color={colors.textMuted}>{label}</Txt>
      <Txt variant="label" style={{ flexShrink: 1, textAlign: 'right' }}>{value}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  bigIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.md },
  btn: { borderRadius: radius.md },
  btnLabel: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  scienceToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.lg, paddingVertical: spacing.sm },
  readRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  border: { borderBottomWidth: 1, borderBottomColor: colors.border },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, gap: spacing.lg },
});
