import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert as RNAlert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { CleaningPanel } from '@/components/CleaningPanel';
import { Pill } from '@/components/Pill';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { useSession } from '@/context/session';
import { CHAIN, limitFor } from '@/data/cleaning';
import { alertById, deviceBySerial } from '@/data/devices';
import { ROLES } from '@/data/roles';
import { RoleId } from '@/data/types';
import { colors, radius, spacing } from '@/theme';

const sevColor = { act: colors.act, watch: colors.watch, info: colors.good } as const;
const sevSoft = { act: colors.actSoft, watch: colors.watchSoft, info: colors.goodSoft } as const;

export default function AlertDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLang();
  const { role } = useSession();
  const [acked, setAcked] = useState(false);
  const [passed, setPassed] = useState(false);
  const [resolved, setResolved] = useState(false);

  const a = alertById(id);
  if (!a) return <View style={{ flex: 1, backgroundColor: colors.bg }}><AppHeader back title={t('ad2.title')} /></View>;

  const device = deviceBySerial(a.deviceSerial);
  const color = sevColor[a.severity];
  const limit = limitFor(a.headline);
  const isResolved = a.state === 'resolved' || resolved;

  // Where the alert sits now: the viewer's own level (clamped into the chain).
  const myRole = (role?.id ?? 'facility') as RoleId;
  const myIdx = Math.max(0, CHAIN.indexOf(myRole));
  const curIdx = Math.min(CHAIN.length - 1, myIdx + (passed ? 1 : 0));
  const nextRole = curIdx < CHAIN.length - 1 ? CHAIN[curIdx + 1] : null;

  const sevLabel = a.critical ? t('al.critical') : t('al.active');

  const confirmResolve = () => {
    RNAlert.alert(t('ad2.markResolved'), a.headline, [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('ad2.markResolved'), onPress: () => setResolved(true) },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={t('ad2.title')}>
        <View style={{ marginTop: spacing.sm }}>
          <Txt variant="h1">{a.headline}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>
            {a.blockName} · {a.ward} · {a.deviceSerial}
          </Txt>
          <View style={styles.pills}>
            <Pill text={isResolved ? t('al.resolved') : sevLabel} color={isResolved ? colors.good : color} />
            <Txt variant="small" color={colors.textSubtle}>{t('ad2.firedWhen')} {a.age}</Txt>
          </View>
        </View>
      </AppHeader>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xxxl }}>
        {isResolved && (
          <View style={[styles.note, { backgroundColor: colors.goodSoft, borderColor: colors.good }]}>
            <MaterialCommunityIcons name="check-circle" size={18} color={colors.good} />
            <Txt variant="small" color={colors.good} style={{ flex: 1 }}>{t('ad2.resolvedState')}</Txt>
          </View>
        )}

        {/* Reading vs published limit */}
        {!!a.value && (
          <View style={[styles.reading, { borderColor: color, backgroundColor: sevSoft[a.severity] }]}>
            <View style={{ flex: 1 }}>
              <Txt variant="small" color={colors.textMuted}>{t('ad2.reading')}</Txt>
              <Txt variant="h1" color={color} style={{ marginTop: 2 }}>{a.value}</Txt>
            </View>
            {limit && (
              <View style={{ alignItems: 'flex-end' }}>
                <MaterialCommunityIcons name="arrow-up-bold" size={20} color={color} />
                <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{t('ad2.vsLimit', { limit })}</Txt>
              </View>
            )}
          </View>
        )}

        {/* Escalation ladder */}
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: spacing.xl, marginBottom: spacing.sm }}>{t('ad2.whereNow')}</Txt>
        <View style={styles.ladder}>
          {CHAIN.map((rid, i) => {
            const passedLevel = i < curIdx;
            const current = i === curIdx;
            const name = ROLES[rid].name;
            return (
              <View key={rid} style={styles.step}>
                <View style={styles.rail}>
                  <View style={[
                    styles.node,
                    passedLevel && { backgroundColor: colors.good, borderColor: colors.good },
                    current && { backgroundColor: colors.primary, borderColor: colors.primary },
                  ]}>
                    {passedLevel && <MaterialCommunityIcons name="check" size={12} color="#FFFFFF" />}
                    {current && <View style={styles.pulse} />}
                  </View>
                  {i < CHAIN.length - 1 && <View style={[styles.line, i < curIdx && { backgroundColor: colors.good }]} />}
                </View>
                <View style={{ flex: 1, paddingBottom: spacing.lg }}>
                  <Txt variant={current ? 'h3' : 'bodyMed'} color={current ? colors.text : passedLevel ? colors.textMuted : colors.textSubtle}>
                    {name}
                  </Txt>
                  {current && <Txt variant="small" color={colors.primary} style={{ marginTop: 1 }}>{t('ad2.withNow')}</Txt>}
                </View>
              </View>
            );
          })}
        </View>

        {a.handedUpward && curIdx > 0 && (
          <View style={[styles.note, { backgroundColor: colors.watchSoft, borderColor: colors.watch }]}>
            <MaterialCommunityIcons name="information" size={18} color={colors.watch} />
            <Txt variant="small" color={colors.text} style={{ flex: 1 }}>{t('ad2.handedExplain')}</Txt>
          </View>
        )}

        <Txt variant="small" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.lg }}>
          {nextRole ? t('ad2.nextStep', { role: ROLES[nextRole].name }) : t('ad2.topLevel')}
        </Txt>

        {/* Fix it — cleaning loop */}
        {device && device.online && !isResolved && (
          <>
            <Txt variant="small" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{t('cl2.section')}</Txt>
            <CleaningPanel device={device} />
          </>
        )}

        {/* Actions */}
        {!isResolved && (
          <View style={{ marginTop: spacing.xl, gap: spacing.sm }}>
            {acked && (
              <View style={[styles.note, { backgroundColor: colors.primarySoft, borderColor: colors.primary }]}>
                <MaterialCommunityIcons name="check" size={18} color={colors.primary} />
                <Txt variant="small" color={colors.text} style={{ flex: 1 }}>{t('ad2.ackDone')}</Txt>
              </View>
            )}
            {passed && (
              <View style={[styles.note, { backgroundColor: colors.watchSoft, borderColor: colors.watch }]}>
                <MaterialCommunityIcons name="arrow-up-bold" size={18} color={colors.watch} />
                <Txt variant="small" color={colors.text} style={{ flex: 1 }}>{t('ad2.passedUp')}</Txt>
              </View>
            )}
            <View style={styles.actRow}>
              {!acked && (
                <Pressable style={[styles.btn, styles.btnOutline]} onPress={() => setAcked(true)}>
                  <MaterialCommunityIcons name="check" size={18} color={colors.primary} />
                  <Txt variant="label" color={colors.primary}>{t('ad2.acknowledge')}</Txt>
                </Pressable>
              )}
              {nextRole && !passed && (
                <Pressable style={[styles.btn, styles.btnOutline]} onPress={() => setPassed(true)}>
                  <MaterialCommunityIcons name="arrow-up-bold-outline" size={18} color={colors.primary} />
                  <Txt variant="label" color={colors.primary}>{t('ad2.passUp')}</Txt>
                </Pressable>
              )}
            </View>
            <Pressable style={[styles.btn, styles.btnPrimary]} onPress={confirmResolve}>
              <MaterialCommunityIcons name="check-all" size={18} color="#FFFFFF" />
              <Txt variant="label" color="#FFFFFF">{t('ad2.markResolved')}</Txt>
            </Pressable>
          </View>
        )}

        <Pressable style={[styles.btn, styles.btnGhost, { marginTop: spacing.sm }]} onPress={() => router.push(`/device/${a.deviceSerial}`)}>
          <MaterialCommunityIcons name="chip" size={18} color={colors.text} />
          <Txt variant="label" color={colors.text}>{t('ad2.openDevice')}</Txt>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pills: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.md },
  reading: { flexDirection: 'row', alignItems: 'center', borderRadius: radius.lg, borderWidth: 1, padding: spacing.lg },
  note: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, borderRadius: radius.md, borderWidth: 1, padding: spacing.md, marginBottom: spacing.sm },
  ladder: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, paddingBottom: 0 },
  step: { flexDirection: 'row', gap: spacing.md },
  rail: { alignItems: 'center', width: 20 },
  node: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.borderStrong, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  pulse: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#FFFFFF' },
  line: { flex: 1, width: 2, backgroundColor: colors.border, marginVertical: 2 },
  actRow: { flexDirection: 'row', gap: spacing.sm },
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, borderRadius: radius.md, height: 48, flex: 1 },
  btnPrimary: { backgroundColor: colors.primary },
  btnOutline: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primary },
  btnGhost: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderStrong },
});
