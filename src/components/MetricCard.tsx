import { StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { Pill } from './Pill';
import { Sparkline } from './Sparkline';
import { colors, elevation, radius, spacing } from '@/theme';

/** A dashboard summary card: label, optional pill, big number, optional sparkline. */
export function MetricCard({
  label,
  value,
  pill,
  pillColor,
  pillVariant = 'solid',
  spark,
  sparkColor,
}: {
  label: string;
  value: string;
  pill?: string;
  pillColor?: string;
  pillVariant?: 'solid' | 'outline';
  spark?: number[];
  sparkColor?: string;
}) {
  return (
    <View style={[styles.card, elevation.card]}>
      <View style={styles.top}>
        <Txt variant="small" color={colors.textMuted} numberOfLines={1} style={{ flex: 1 }}>{label}</Txt>
        {pill ? <Pill text={pill} color={pillColor ?? colors.act} variant={pillVariant} /> : null}
      </View>
      <View style={styles.body}>
        <Txt variant="metric" color={colors.text}>{value}</Txt>
        {spark && spark.length > 1 ? (
          <Sparkline data={spark} color={sparkColor ?? colors.good} width={88} height={40} />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    minHeight: 112,
  },
  top: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, minHeight: 22 },
  body: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: spacing.sm, gap: spacing.xs },
});
