import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert as RNAlert, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AppCard } from '@/components/AppCard';
import { Scaffold } from '@/components/Scaffold';
import { Txt } from '@/components/Txt';
import { alertById } from '@/data/alerts';
import { colors, radius, spacing } from '@/theme';

const sev = {
  act: { color: colors.act, soft: colors.actSoft, icon: 'alert-circle' },
  watch: { color: colors.watch, soft: colors.watchSoft, icon: 'eye-outline' },
  info: { color: colors.offline, soft: colors.offlineSoft, icon: 'information' },
} as const;

const STEPS = ['Smell rose', 'Alert raised', 'You told', 'On it', 'Cleaned', 'Back to normal'];

export default function AlertDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const alert = alertById(id);
  const [state, setState] = useState(alert?.state);
  if (!alert) return <Scaffold title="Alert" back><Txt>Not found.</Txt></Scaffold>;

  const s = sev[alert.severity];
  const stepIndex = state === 'resolved' ? 5 : state === 'onit' ? 3 : 2;

  return (
    <Scaffold title="Alert" back>
      <AppCard stripe={s.color}>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <View style={[styles.icon, { backgroundColor: s.soft }]}><MaterialCommunityIcons name={s.icon as any} size={28} color={s.color} /></View>
          <View style={{ flex: 1 }}>
            <Txt variant="h2">{alert.headline}</Txt>
            <Txt variant="body" color={colors.textMuted} style={{ marginTop: 2 }}>{alert.detail}</Txt>
          </View>
        </View>
        <View style={styles.place}>
          <MaterialCommunityIcons name="map-marker" size={15} color={colors.textMuted} />
          <Txt variant="label">{alert.toiletName} · {alert.block}</Txt>
        </View>
        <Txt variant="tiny" color={colors.textSubtle} style={{ marginLeft: 20, marginTop: 2 }}>{alert.path}</Txt>
      </AppCard>

      <AppCard style={{ marginTop: spacing.md }}>
        <Txt variant="overline" color={colors.textMuted} style={{ marginBottom: spacing.md }}>WHERE THIS IS UP TO</Txt>
        <View style={{ gap: spacing.sm }}>
          {STEPS.map((label, i) => {
            const active = i <= stepIndex;
            return (
              <View key={label} style={styles.step}>
                <View style={[styles.stepDot, active && { backgroundColor: s.color, borderColor: s.color }]}>
                  {active && <MaterialCommunityIcons name="check" size={11} color={colors.textInverse} />}
                </View>
                <Txt variant={active ? 'bodyMed' : 'body'} color={active ? colors.text : colors.textSubtle}>{label}</Txt>
              </View>
            );
          })}
        </View>
        {alert.state === 'handedUp' && alert.handedUpTo && (
          <View style={styles.handed}>
            <MaterialCommunityIcons name="arrow-up-circle" size={16} color={colors.watch} />
            <Txt variant="small" style={{ flex: 1 }}>Passed up to {alert.handedUpTo} because nobody answered in time.</Txt>
          </View>
        )}
      </AppCard>

      {state !== 'resolved' && (
        <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
          {state !== 'onit' && <Button mode="contained" icon="hand-back-right" onPress={() => { setState('onit'); RNAlert.alert("You're on it", 'The clock has stopped. It won’t be passed up while you handle it.'); }} style={styles.btn} contentStyle={{ height: 48 }} labelStyle={styles.btnLabel}>I'm on it</Button>}
          <Button mode="outlined" icon="phone" onPress={() => RNAlert.alert('Send a cleaner', `Ringing the cleaners for ${alert.block}.`)} style={[styles.btn, { borderColor: colors.borderStrong }]} contentStyle={{ height: 48 }} labelStyle={styles.btnLabel} textColor={colors.primary}>Send a cleaner</Button>
          <Button mode="text" icon="arrow-up" onPress={() => { setState('handedUp'); RNAlert.alert('Passed up', 'Your senior has been notified.'); }} labelStyle={styles.btnLabel} textColor={colors.primary}>Pass to my senior</Button>
        </View>
      )}

      <AppCard style={{ marginTop: spacing.md }} padded={false}>
        <Row label="Why it fired" value={alert.tech} />
        <Row label="Sensor ID" value={alert.serial} />
        <Row label="Raised" value={alert.age} last />
      </AppCard>
      <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: spacing.md, lineHeight: 16 }}>Tip: when you record the clean, start the note with this alert’s code so the two can be matched later.</Txt>
    </Scaffold>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, !last && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
      <Txt variant="small" color={colors.textMuted}>{label}</Txt>
      <Txt variant="label" style={{ flexShrink: 1, textAlign: 'right' }}>{value}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: { width: 52, height: 52, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  place: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.md },
  step: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  stepDot: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.borderStrong, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  handed: { flexDirection: 'row', gap: spacing.sm, backgroundColor: colors.watchSoft, padding: spacing.md, borderRadius: radius.md, marginTop: spacing.md },
  btn: { borderRadius: radius.md },
  btnLabel: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: spacing.md, gap: spacing.md },
});
