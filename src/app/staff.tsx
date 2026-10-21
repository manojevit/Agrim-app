import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert as RNAlert, StyleSheet, View } from 'react-native';
import { Button, Switch } from 'react-native-paper';
import { AppCard } from '@/components/AppCard';
import { Scaffold } from '@/components/Scaffold';
import { SectionHeader } from '@/components/SectionHeader';
import { Txt } from '@/components/Txt';
import { STAFF } from '@/data/cleaning';
import { AUTO_CALL } from '@/data/ops';
import { colors, radius, spacing } from '@/theme';

export default function Staff() {
  const [smell, setSmell] = useState(AUTO_CALL.smell.on);
  const [air, setAir] = useState(AUTO_CALL.air.on);

  return (
    <Scaffold title="Staff & calls" subtitle="CTC Saket Block A" back>
      <SectionHeader title="Cleaners for this building" />
      <AppCard padded={false}>
        {STAFF.map((s, i) => (
          <View key={s.id} style={[styles.row, i < STAFF.length - 1 && styles.border]}>
            <View style={styles.avatar}><Txt variant="label" color={colors.primary}>{s.name[0]}</Txt></View>
            <View style={{ flex: 1 }}>
              <Txt variant="bodyMed">{s.name}</Txt>
              <Txt variant="tiny" color={colors.textMuted} style={{ marginTop: 1 }}>{s.phone} · {s.role}</Txt>
            </View>
            <MaterialCommunityIcons name="phone" size={20} color={colors.primary} />
          </View>
        ))}
      </AppCard>
      <Button mode="outlined" icon="account-plus" style={styles.addBtn} textColor={colors.primary} labelStyle={styles.btnLabel} onPress={() => RNAlert.alert('Add a cleaner', 'Enter a name and mobile number.')}>Add a cleaner</Button>

      <SectionHeader title="Call now" />
      <AppCard>
        <Txt variant="body" color={colors.textMuted}>Tell someone this building needs cleaning.</Txt>
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
          <Button mode="contained" icon="phone" style={{ flex: 1, borderRadius: radius.md }} labelStyle={styles.btnLabel} onPress={() => RNAlert.alert('Calling', 'Ringing everyone on the list (3).')}>Call everyone</Button>
        </View>
      </AppCard>

      <SectionHeader title="Automatic calls" />
      <Txt variant="small" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>Nobody presses anything — the app reads the sensors and calls a cleaner by itself.</Txt>
      <AppCard style={{ gap: spacing.lg }}>
        <AutoRow title="When it smells bad" on={smell} setOn={setSmell} cfg={AUTO_CALL.smell} />
        <View style={styles.border} />
        <AutoRow title="When air gets very poor" on={air} setOn={setAir} cfg={AUTO_CALL.air} />
        <View style={styles.quiet}>
          <MaterialCommunityIcons name="moon-waning-crescent" size={15} color={colors.textMuted} />
          <Txt variant="small" color={colors.textMuted}>No calls between {AUTO_CALL.quietHours}.</Txt>
        </View>
      </AppCard>
    </Scaffold>
  );
}

function AutoRow({ title, on, setOn, cfg }: { title: string; on: boolean; setOn: (v: boolean) => void; cfg: { ringAt: string; forAtLeast: string; notAgainFor: string } }) {
  return (
    <View style={{ gap: spacing.sm }}>
      <View style={styles.autoHead}>
        <Txt variant="h3" style={{ flex: 1 }}>{title}</Txt>
        <Switch value={on} onValueChange={setOn} color={colors.primary} />
      </View>
      <Detail label="Ring at" value={cfg.ringAt} />
      <Detail label="Only if it stays bad for" value={cfg.forAtLeast} />
      <Detail label="Don’t call again for" value={cfg.notAgainFor} />
    </View>
  );
}
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Txt variant="small" color={colors.textMuted}>{label}</Txt>
      <Txt variant="label">{value}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  border: { borderBottomWidth: 1, borderBottomColor: colors.border },
  avatar: { width: 38, height: 38, borderRadius: 11, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  addBtn: { marginTop: spacing.sm, borderRadius: radius.md, borderColor: colors.borderStrong },
  btnLabel: { fontFamily: 'PlusJakartaSans_600SemiBold', fontSize: 14 },
  autoHead: { flexDirection: 'row', alignItems: 'center' },
  quiet: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surfaceAlt, padding: spacing.md, borderRadius: radius.md },
});
