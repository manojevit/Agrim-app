import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert as RNAlert, StyleSheet, View } from 'react-native';
import { Button, Switch } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { ALERT_RULES } from '@/data/ops';
import { ScrollView } from 'react-native';
import { colors, radius, spacing } from '@/theme';

export default function Rules() {
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(ALERT_RULES.map((r) => [r.id, r.enabled])));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title="Alert rules" subtitle="When a toilet should raise an alert" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        <Txt variant="small" color={colors.textMuted} style={{ marginBottom: spacing.md }}>
          Each rule watches one thing. Under the plain line are the exact levels.
        </Txt>

        {ALERT_RULES.map((r) => (
          <View key={r.id} style={styles.card}>
            <View style={styles.head}>
              <View style={styles.icon}><MaterialCommunityIcons name={r.metric === 'Smell' ? 'scent' : r.metric === 'Air quality' ? 'weather-windy' : 'wifi-off'} size={20} color={colors.primary} /></View>
              <View style={{ flex: 1 }}>
                <Txt variant="h3">{r.plain}</Txt>
                <Txt variant="tiny" color={colors.textMuted} style={{ marginTop: 1 }}>{r.metric} · {r.appliesTo}</Txt>
              </View>
              <Switch value={on[r.id]} onValueChange={(v) => setOn((s) => ({ ...s, [r.id]: v }))} color={colors.primary} />
            </View>
            <View style={styles.thresholds}>
              <View style={[styles.th, { backgroundColor: colors.watchSoft }]}>
                <Txt variant="tiny" color={colors.textMuted}>Keep an eye at</Txt>
                <Txt variant="label" color={colors.watch} style={{ marginTop: 2 }}>{r.warn}</Txt>
              </View>
              <View style={[styles.th, { backgroundColor: colors.actSoft }]}>
                <Txt variant="tiny" color={colors.textMuted}>Clean now at</Txt>
                <Txt variant="label" color={colors.act} style={{ marginTop: 2 }}>{r.critical}</Txt>
              </View>
            </View>
            <View style={styles.channels}>
              <MaterialCommunityIcons name="bell-ring-outline" size={14} color={colors.textSubtle} />
              <Txt variant="tiny" color={colors.textSubtle}>Tells people by: {r.channels}</Txt>
            </View>
          </View>
        ))}

        <Button mode="contained" icon="plus" style={{ borderRadius: radius.md }} contentStyle={{ height: 50 }} labelStyle={styles.btnLabel} onPress={() => RNAlert.alert('New rule', 'Pick a metric, a scope, and the warn / clean-now levels.')}>
          Add a rule
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  icon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
  thresholds: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  th: { flex: 1, padding: spacing.md, borderRadius: radius.md },
  channels: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.md },
  btnLabel: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 15 },
});
