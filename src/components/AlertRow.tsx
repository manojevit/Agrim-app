import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { AppCard } from './AppCard';
import { Alert } from '@/data/devices';
import { colors, spacing } from '@/theme';

const sevColor = { act: colors.act, watch: colors.watch, info: colors.good } as const;

/** One alert line — dot + headline + meta, time on the right. */
export function AlertRow({ alert }: { alert: Alert }) {
  const color = sevColor[alert.severity];
  const parts = [
    alert.critical ? 'CRITICAL' : alert.state === 'resolved' ? 'Resolved' : 'Open',
    alert.blockName,
    alert.ward,
    alert.deviceSerial,
    alert.value,
    alert.handedUpward ? 'Handed upward' : '',
  ].filter(Boolean);

  return (
    <AppCard onPress={() => router.push(`/device/${alert.deviceSerial}`)} padded={false} style={styles.card}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <View style={{ flex: 1 }}>
        <Txt variant="h3">{alert.headline}</Txt>
        <Txt variant="small" color={colors.textMuted} numberOfLines={2} style={{ marginTop: 1 }}>
          {parts.join(' · ')}
        </Txt>
      </View>
      <Txt variant="small" color={colors.textSubtle}>{alert.age}</Txt>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  dot: { width: 11, height: 11, borderRadius: 6, marginTop: 5 },
});
