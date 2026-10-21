import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert as RNAlert, StyleSheet, View } from 'react-native';
import { Button, Switch } from 'react-native-paper';
import { AppCard } from '@/components/AppCard';
import { Scaffold } from '@/components/Scaffold';
import { Txt } from '@/components/Txt';
import { ALERT_RULES } from '@/data/ops';
import { colors, radius, spacing } from '@/theme';

export default function Rules() {
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(ALERT_RULES.map((r) => [r.id, r.enabled])));

  return (
    <Scaffold title="Alert rules" subtitle="When a toilet should raise an alert" back>
      <Txt variant="small" color={colors.textMuted} style={{ marginBottom: spacing.md }}>
        Each rule watches one thing. Below each plain line are the exact thresholds.
      </Txt>

      {ALERT_RULES.map((r) => (
        <AppCard key={r.id} style={{ marginBottom: spacing.sm }}>
          <View style={styles.head}>
            <View style={styles.icon}><MaterialCommunityIcons name={r.metric === 'Smell' ? 'scent' : r.metric === 'Air quality' ? 'weather-windy' : 'wifi-off'} size={20} color={colors.primary} /></View>
            <View style={{ flex: 1 }}>
              <Txt variant="h3">{r.plain}</Txt>
              <Txt variant="tiny" color={colors.textMuted} style={{ marginTop: 1 }}>{r.metric} · {r.appliesTo}</Txt>
            </View>
            <Switch value={on[r.id]} onValueChange={(v) => setOn((s) => ({ ...s, [r.id]: v }))} color={colors.primary} />
          </View>
          <View style={styles.thresholds}>
            <Threshold color={colors.watch} label="Keep an eye at" value={r.warn} />
            <Threshold color={colors.act} label="Clean now at" value={r.critical} />
          </View>
          <View style={styles.channels}>
            <MaterialCommunityIcons name="bell-ring-outline" size={14} color={colors.textSubtle} />
            <Txt variant="tiny" color={colors.textSubtle}>Tells people by: {r.channels}</Txt>
          </View>
        </AppCard>
      ))}

      <Button mode="contained" icon="plus" style={styles.addBtn} labelStyle={styles.btnLabel} onPress={() => RNAlert.alert('New rule', 'Pick a metric, a scope, and the warn / clean-now levels.')}>
        Add a rule
      </Button>
    </Scaffold>
  );
}

function Threshold({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <View style={[styles.th, { backgroundColor: color + '14' }]}>
      <Txt variant="tiny" color={colors.textMuted}>{label}</Txt>
      <Txt variant="label" color={color} style={{ marginTop: 2 }}>{value}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  icon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
  thresholds: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  th: { flex: 1, padding: spacing.md, borderRadius: radius.md },
  channels: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.md },
  addBtn: { marginTop: spacing.sm, borderRadius: radius.md },
  btnLabel: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 15 },
});
