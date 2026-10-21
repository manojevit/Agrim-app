import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert as RNAlert, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { alertById } from '@/data/alerts';
import { colors, radius, spacing } from '@/theme';

const sev = {
  act: { color: colors.act, soft: colors.actSoft, icon: 'alert-circle' },
  watch: { color: colors.watch, soft: colors.watchSoft, icon: 'eye-outline' },
  info: { color: colors.offline, soft: colors.offlineSoft, icon: 'information-outline' },
} as const;

export default function FacilityAlert() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, lang } = useLang();
  const alert = alertById(id);
  const [state, setState] = useState(alert?.state);
  if (!alert) return <View style={{ flex: 1, backgroundColor: colors.bg }}><AppHeader back title="Alert" /></View>;
  const s = sev[alert.severity];
  const stepIndex = state === 'resolved' ? 5 : state === 'onit' ? 3 : 2;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={t('tab.alerts')} subtitle={alert.toiletName} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxxl }}>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.iconTile, { backgroundColor: s.soft }]}><MaterialCommunityIcons name={s.icon as any} size={22} color={s.color} /></View>
            <View style={{ flex: 1 }}>
              <Txt variant="h3">{lang === 'hi' ? alert.headlineHi : alert.headline}</Txt>
              <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{lang === 'hi' ? alert.detailHi : alert.detail}</Txt>
            </View>
          </View>
        </View>

        <Txt variant="overline" color={colors.textSubtle} style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>{t('ad.whereUpTo').toUpperCase()}</Txt>
        <View style={styles.card}>
          <View style={{ gap: spacing.sm }}>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const active = i <= stepIndex;
              return (
                <View key={i} style={styles.step}>
                  <View style={[styles.dot, active && { backgroundColor: s.color, borderColor: s.color }]}>
                    {active && <MaterialCommunityIcons name="check" size={11} color="#FFFFFF" />}
                  </View>
                  <Txt variant={active ? 'bodyMed' : 'body'} color={active ? colors.text : colors.textSubtle}>{t(`step.${i}`)}</Txt>
                </View>
              );
            })}
          </View>
          {alert.state === 'handedUp' && alert.handedUpTo && (
            <View style={styles.handed}>
              <MaterialCommunityIcons name="arrow-up" size={15} color={colors.watch} />
              <Txt variant="small" style={{ flex: 1 }}>{t('ad.handedExplain', { who: alert.handedUpTo })}</Txt>
            </View>
          )}
        </View>

        {state !== 'resolved' && (
          <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
            {state !== 'onit' && <Button mode="contained" icon="hand-back-right-outline" onPress={() => { setState('onit'); RNAlert.alert(t('ad.imOnIt')); }} style={styles.primaryBtn} contentStyle={{ height: 50 }} labelStyle={styles.btnLabel}>{t('ad.imOnIt')}</Button>}
            <Button mode="outlined" icon="phone-outline" onPress={() => RNAlert.alert(t('td.sendCleaner'), alert.toiletName, [{ text: 'OK' }])} style={styles.outlineBtn} contentStyle={{ height: 50 }} labelStyle={styles.btnLabel} textColor={colors.text}>{t('td.sendCleaner')}</Button>
            <Button mode="text" icon="arrow-up" onPress={() => { setState('handedUp'); RNAlert.alert(t('ad.passUp')); }} labelStyle={styles.btnLabel} textColor={colors.textMuted}>{t('ad.passUp')}</Button>
          </View>
        )}

        <Txt variant="overline" color={colors.textSubtle} style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>{t('ad.whyFired').toUpperCase()}</Txt>
        <View style={[styles.card, { padding: 0 }]}>
          <Row label={t('ad.whyFired')} value={alert.tech} />
          <Row label={t('ad.sensorId')} value={alert.serial} />
          <Row label={t('ad.raised')} value={alert.age} last />
        </View>
      </ScrollView>
    </View>
  );
}

function Row({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.infoRow, !last && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
      <Txt variant="small" color={colors.textMuted}>{label}</Txt>
      <Txt variant="label" style={{ flexShrink: 1, textAlign: 'right' }}>{value}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  row: { flexDirection: 'row', gap: spacing.md },
  iconTile: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  step: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dot: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.borderStrong, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  handed: { flexDirection: 'row', gap: spacing.sm, backgroundColor: colors.watchSoft, padding: spacing.md, borderRadius: radius.md, marginTop: spacing.md },
  primaryBtn: { borderRadius: radius.md, backgroundColor: colors.primary },
  outlineBtn: { borderRadius: radius.md, borderColor: colors.borderStrong },
  btnLabel: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', padding: spacing.md, gap: spacing.md },
});
