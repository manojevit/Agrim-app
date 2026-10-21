import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert as RNAlert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Switch } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { STAFF } from '@/data/cleaning';
import { AUTO_CALL } from '@/data/ops';
import { CALL_COST, CALL_HISTORY, voiceMessage, voiceMessageEnglish } from '@/data/calls';
import { FACILITY } from '@/data/facility';
import { colors, radius, spacing } from '@/theme';

export default function Staff() {
  const [count, setCount] = useState(2);
  const [smell, setSmell] = useState(AUTO_CALL.smell.on);
  const [air, setAir] = useState(AUTO_CALL.air.on);
  const [showMsg, setShowMsg] = useState(false);
  const [hindi, setHindi] = useState(true);
  const staff = STAFF;

  const call = (who: string) =>
    RNAlert.alert('Placing an automated call', `${who} will get a voice call saying ${FACILITY.building} needs ${count} ${count === 1 ? 'toilet' : 'toilets'} cleaned. Cost ${CALL_COST}.`, [{ text: 'OK' }]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title="Cleaners & calls" subtitle={FACILITY.building} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        {/* Call now */}
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View style={[styles.hIcon, { backgroundColor: colors.primaryTint }]}><MaterialCommunityIcons name="phone-outline" size={20} color={colors.primary} /></View>
            <Txt variant="h3" style={{ flex: 1 }}>Call a cleaner now</Txt>
          </View>
          <Txt variant="small" color={colors.textMuted}>An automated voice call tells them how many toilets need cleaning.</Txt>

          <View style={styles.stepRow}>
            <Txt variant="bodyMed">Toilets that need cleaning</Txt>
            <View style={styles.stepper}>
              <Pressable style={styles.stepBtn} onPress={() => setCount((c) => Math.max(1, c - 1))}><MaterialCommunityIcons name="minus" size={18} color={colors.primary} /></Pressable>
              <Txt variant="h3" style={{ width: 28, textAlign: 'center' }}>{count}</Txt>
              <Pressable style={styles.stepBtn} onPress={() => setCount((c) => Math.min(6, c + 1))}><MaterialCommunityIcons name="plus" size={18} color={colors.primary} /></Pressable>
            </View>
          </View>

          <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
            <Button mode="contained" icon="phone" style={{ flex: 1, borderRadius: radius.md }} labelStyle={styles.btnSm} onPress={() => call(`Everyone (${staff.length})`)}>Call everyone</Button>
            <Button mode="outlined" icon="account" style={{ flex: 1, borderRadius: radius.md, borderColor: colors.borderStrong }} labelStyle={styles.btnSm} textColor={colors.primary} onPress={() => call('one cleaner')}>Choose one</Button>
          </View>

          <Pressable style={styles.hearRow} onPress={() => setShowMsg((s) => !s)}>
            <MaterialCommunityIcons name="volume-high" size={16} color={colors.primary} />
            <Txt variant="label" color={colors.primary}>{showMsg ? 'Hide what the call says' : 'Hear what the call says'}</Txt>
          </Pressable>
          {showMsg && (
            <View style={styles.msgBox}>
              <View style={styles.msgTop}>
                <View style={styles.aiTag}><MaterialCommunityIcons name="account-voice" size={13} color={colors.primary} /><Txt variant="tiny" color={colors.primary}>Automated voice</Txt></View>
                <View style={styles.langToggle}>
                  <Pressable onPress={() => setHindi(true)} style={[styles.lang, hindi && styles.langOn]}><Txt variant="tiny" color={hindi ? '#FFFFFF' : colors.textMuted}>हिन्दी</Txt></Pressable>
                  <Pressable onPress={() => setHindi(false)} style={[styles.lang, !hindi && styles.langOn]}><Txt variant="tiny" color={!hindi ? '#FFFFFF' : colors.textMuted}>English</Txt></Pressable>
                </View>
              </View>
              <Txt variant="small" color={colors.text} style={{ marginTop: spacing.sm, lineHeight: 20 }}>
                “{hindi ? voiceMessage(count, FACILITY.building) : voiceMessageEnglish(count, FACILITY.building)}”
              </Txt>
              <Button mode="text" icon="play-circle" compact labelStyle={styles.btnSm} textColor={colors.primary} onPress={() => RNAlert.alert('Playing', 'Playing the message so you know what the cleaner will hear.')} style={{ alignSelf: 'flex-start', marginTop: spacing.xs }}>Play the message</Button>
            </View>
          )}
          <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: spacing.sm }}>Cost {CALL_COST}. No charge if nobody answers.</Txt>
        </View>

        {/* Automatic calls */}
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View style={[styles.hIcon, { backgroundColor: colors.primaryTint }]}><MaterialCommunityIcons name="phone-in-talk" size={20} color={colors.primary} /></View>
            <Txt variant="h3" style={{ flex: 1 }}>Automatic calls</Txt>
          </View>
          <Txt variant="small" color={colors.textMuted}>Nobody presses anything. When a toilet stays bad, the app calls a cleaner by itself.</Txt>

          <AutoTrigger title="When it smells bad" on={smell} setOn={setSmell} cfg={AUTO_CALL.smell} />
          <View style={styles.divider} />
          <AutoTrigger title="When air gets very poor" on={air} setOn={setAir} cfg={AUTO_CALL.air} />
          <View style={styles.quiet}>
            <MaterialCommunityIcons name="moon-waning-crescent" size={15} color={colors.textMuted} />
            <Txt variant="small" color={colors.textMuted}>No calls between {AUTO_CALL.quietHours}.</Txt>
          </View>
        </View>

        {/* Staff */}
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View style={[styles.hIcon, { backgroundColor: colors.primaryTint }]}><MaterialCommunityIcons name="account-group" size={20} color={colors.primary} /></View>
            <Txt variant="h3" style={{ flex: 1 }}>Cleaners for this building</Txt>
          </View>
          {staff.map((s, i) => (
            <View key={s.id} style={[styles.staffRow, i < staff.length - 1 && styles.border]}>
              <View style={styles.avatar}><Txt variant="label" color={colors.primary}>{s.name[0]}</Txt></View>
              <View style={{ flex: 1 }}>
                <Txt variant="bodyMed">{s.name}</Txt>
                <Txt variant="tiny" color={colors.textMuted} style={{ marginTop: 1 }}>{s.phone}</Txt>
              </View>
              <MaterialCommunityIcons name="phone" size={20} color={colors.primary} />
            </View>
          ))}
          <Button mode="outlined" icon="account-plus" style={{ marginTop: spacing.md, borderRadius: radius.md, borderColor: colors.borderStrong }} textColor={colors.primary} labelStyle={styles.btnSm} onPress={() => RNAlert.alert('Add a cleaner', 'Enter a name and mobile number.')}>Add a cleaner</Button>
        </View>

        {/* History */}
        <View style={styles.card}>
          <View style={styles.cardHead}>
            <View style={[styles.hIcon, { backgroundColor: colors.primaryTint }]}><MaterialCommunityIcons name="history" size={20} color={colors.primary} /></View>
            <Txt variant="h3" style={{ flex: 1 }}>Recent calls</Txt>
          </View>
          {CALL_HISTORY.map((c, i) => {
            const ok = c.status === 'Completed';
            return (
              <View key={c.id} style={[styles.callRow, i < CALL_HISTORY.length - 1 && styles.border]}>
                <View style={[styles.callIcon, { backgroundColor: ok ? colors.goodSoft : colors.actSoft }]}>
                  <MaterialCommunityIcons name={ok ? 'phone-check' : 'phone-missed'} size={18} color={ok ? colors.good : colors.act} />
                </View>
                <View style={{ flex: 1 }}>
                  <Txt variant="bodyMed">{c.target}</Txt>
                  <Txt variant="tiny" color={colors.textMuted} style={{ marginTop: 1 }}>
                    {c.mode === 'auto' ? 'Automatic' : 'By hand'} · {c.toilets} {c.toilets === 1 ? 'toilet' : 'toilets'} · {c.when}
                  </Txt>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Txt variant="tiny" color={ok ? colors.good : colors.act}>{c.status}</Txt>
                  <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 1 }}>{c.cost}</Txt>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function AutoTrigger({ title, on, setOn, cfg }: { title: string; on: boolean; setOn: (v: boolean) => void; cfg: { ringAt: string; forAtLeast: string; notAgainFor: string } }) {
  return (
    <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
      <View style={styles.autoHead}>
        <Txt variant="bodyMed" style={{ flex: 1 }}>{title}</Txt>
        <Switch value={on} onValueChange={setOn} color={colors.primary} />
      </View>
      {on && (
        <>
          <Detail label="Ring at" value={cfg.ringAt} />
          <Detail label="Only if it stays bad for" value={cfg.forAtLeast} />
          <Detail label="Don't call again for" value={cfg.notAgainFor} />
        </>
      )}
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
  card: { backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.md },
  cardHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  hIcon: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  stepRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.lg },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceAlt, borderRadius: radius.pill, padding: spacing.xs },
  stepBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  btnSm: { fontFamily: 'PlusJakartaSans_600SemiBold', fontSize: 13 },
  hearRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.md },
  msgBox: { backgroundColor: colors.surfaceAlt, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.sm },
  msgTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  aiTag: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.primaryTint, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  langToggle: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radius.pill, padding: 2 },
  lang: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.pill },
  langOn: { backgroundColor: colors.primary },
  divider: { height: 1, backgroundColor: colors.border, marginTop: spacing.lg },
  quiet: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.surfaceAlt, padding: spacing.md, borderRadius: radius.md, marginTop: spacing.lg },
  autoHead: { flexDirection: 'row', alignItems: 'center' },
  staffRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  avatar: { width: 38, height: 38, borderRadius: 11, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  border: { borderBottomWidth: 1, borderBottomColor: colors.border },
  callRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  callIcon: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
});
