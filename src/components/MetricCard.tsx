import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { AppCard } from './AppCard';
import { Txt } from './Txt';
import { colors, fontFamily, spacing } from '@/theme';

/** Big-number tile with a plain label. */
export function MetricCard({
  label,
  value,
  sub,
  icon,
  tone = colors.text,
  toneSoft = colors.surfaceAlt,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: string;
  tone?: string;
  toneSoft?: string;
}) {
  return (
    <AppCard style={{ flex: 1 }}>
      <View style={styles.top}>
        <View style={[styles.icon, { backgroundColor: toneSoft }]}>
          <MaterialCommunityIcons name={icon as any} size={15} color={tone} />
        </View>
        <Txt variant="small" color={colors.textMuted} style={{ flex: 1 }}>{label}</Txt>
      </View>
      <Txt style={{ fontFamily: fontFamily.extrabold, fontSize: 30, letterSpacing: -0.6, color: tone }}>{value}</Txt>
      {sub ? <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 1 }}>{sub}</Txt> : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  icon: { width: 26, height: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
});
