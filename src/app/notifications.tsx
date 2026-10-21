import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert as RNAlert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Switch } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { colors, radius, spacing } from '@/theme';

export default function Notifications() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [warnings, setWarnings] = useState(true);
  const [info, setInfo] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title="Notifications" subtitle="How alerts reach this phone" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        {/* How it reaches you */}
        <View style={styles.card}>
          <Txt variant="h3" style={{ marginBottom: spacing.md }}>How an alert reaches you</Txt>
          <Line icon="cellphone-check" title="While the app is open" body="A new alert pops up here and tapping it opens the alert." />
          <Line icon="cellphone-arrow-down" title="When the app is closed" body="A push notification still arrives, so you don't miss it." />
          <Line icon="phone-in-talk" title="A critical at night" body="Rings loudly and can also place a voice call to a cleaner." last />
          <Button mode="outlined" icon="bell-ring-outline" style={styles.testBtn} textColor={colors.primary} labelStyle={styles.btnSm} onPress={() => RNAlert.alert('Test sent', 'A test notification was sent to this phone.')}>
            Send a test notification
          </Button>
        </View>

        {/* Channels */}
        <View style={styles.card}>
          <Txt variant="h3" style={{ marginBottom: spacing.sm }}>Where to send alerts</Txt>
          <Toggle icon="cellphone" title="Push notifications" sub="On this phone" value={push} onChange={setPush} />
          <View style={styles.divider} />
          <Toggle icon="email-outline" title="Email digest" sub="A daily summary by email" value={email} onChange={setEmail} />
          <View style={styles.divider} />
          <Toggle icon="message-text-outline" title="SMS" sub="Text message for critical only" value={sms} onChange={setSms} />
        </View>

        {/* What to tell me */}
        <View style={styles.card}>
          <Txt variant="h3" style={{ marginBottom: spacing.sm }}>What to tell me about</Txt>
          <View style={styles.lockRow}>
            <View style={[styles.dot, { backgroundColor: colors.act }]} />
            <View style={{ flex: 1 }}>
              <Txt variant="bodyMed">Clean now (critical)</Txt>
              <Txt variant="tiny" color={colors.textMuted} style={{ marginTop: 1 }}>Always on — these ignore quiet hours</Txt>
            </View>
            <MaterialCommunityIcons name="lock" size={18} color={colors.textSubtle} />
          </View>
          <View style={styles.divider} />
          <Toggle dotColor={colors.watch} title="Keep an eye (warnings)" value={warnings} onChange={setWarnings} />
          <View style={styles.divider} />
          <Toggle dotColor={colors.offline} title="For info only" value={info} onChange={setInfo} />
        </View>

        <View style={styles.quiet}>
          <MaterialCommunityIcons name="moon-waning-crescent" size={15} color={colors.textMuted} />
          <Txt variant="small" color={colors.textMuted}>Quiet hours 9 pm – 7 am. Critical alerts still come through.</Txt>
        </View>
      </ScrollView>
    </View>
  );
}

function Line({ icon, title, body, last }: { icon: string; title: string; body: string; last?: boolean }) {
  return (
    <View style={[styles.line, !last && styles.lineBorder]}>
      <View style={styles.lineIcon}><MaterialCommunityIcons name={icon as any} size={18} color={colors.primary} /></View>
      <View style={{ flex: 1 }}>
        <Txt variant="bodyMed">{title}</Txt>
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: 1 }}>{body}</Txt>
      </View>
    </View>
  );
}

function Toggle({ icon, dotColor, title, sub, value, onChange }: { icon?: string; dotColor?: string; title: string; sub?: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.toggle}>
      {icon ? <View style={styles.lineIcon}><MaterialCommunityIcons name={icon as any} size={18} color={colors.primary} /></View> : null}
      {dotColor ? <View style={[styles.dot, { backgroundColor: dotColor }]} /> : null}
      <View style={{ flex: 1 }}>
        <Txt variant="bodyMed">{title}</Txt>
        {sub ? <Txt variant="tiny" color={colors.textMuted} style={{ marginTop: 1 }}>{sub}</Txt> : null}
      </View>
      <Switch value={value} onValueChange={onChange} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.md },
  line: { flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.md },
  lineBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  lineIcon: { width: 36, height: 36, borderRadius: 11, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
  testBtn: { marginTop: spacing.md, borderRadius: radius.md, borderColor: colors.borderStrong },
  btnSm: { fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  toggle: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  divider: { height: 1, backgroundColor: colors.border },
  dot: { width: 12, height: 12, borderRadius: 6 },
  lockRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  quiet: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surfaceAlt, padding: spacing.md, borderRadius: radius.md },
});
