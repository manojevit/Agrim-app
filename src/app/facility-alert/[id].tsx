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
  act: { color: colors.act, icon: 'alert-circle' },
  watch: { color: colors.watch, icon: 'eye-outline' },
  info: { color: colors.offline, icon: 'information' },
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
      <AppHeader back title={t('tab.alerts')} subtitle={alert.toiletName}>
        <View style={styles.statusCard}>
          <View style={[styles.medallion, { backgroundColor: s.color }]}>
            <MaterialCommunityIcons name={s.icon as any} size={24} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Txt variant="h3" color="#FFFFFF">{lang === 'hi' ? alert.headlineHi : alert.headline}</Txt>
            <Txt variant="small" color="rgba(255,255,255,0.8)" style={{ marginTop: 2 }}>{lang === 'hi' ? alert.detailHi : alert.detail}</Txt>
          </View>
        </View>
      </AppHeader>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        <View style={styles.card}>
          <Txt variant="h3" style={{ marginBottom: spacing.md }}>{t('ad.whereUpTo')}</Txt>
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
              <MaterialCommunityIcons name="arrow-up-circle" size={16} color={colors.watch} />
              <Txt variant="small" style={{ flex: 1 }}>{t('ad.handedExplain', { who: alert.handedUpTo })}</Txt>
            </View>
          )}
        </View>

        {state !== 'resolved' && (
          <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
            {state !== 'onit' && <Button mode="contained" icon="hand-back-right" onPress={() => { setState('onit'); RNAlert.alert(t('ad.imOnIt')); }} style={styles.btn} contentStyle={{ height: 50 }} labelStyle={styles.btnLabel}>{t('ad.imOnIt')}</Button>}
            <Button mode="outlined" icon="phone" onPress={() => RNAlert.alert(t('td.sendCleaner'), `${alert.toiletName}`, [{ text: 'OK' }])} style={[styles.btn, { borderColor: colors.borderStrong }]} contentStyle={{ height: 50 }} labelStyle={styles.btnLabel} textColor={colors.primary}>{t('td.sendCleaner')}</Button>
            <Button mode="text" icon="arrow-up" onPress={() => { setState('handedUp'); RNAlert.alert(t('ad.passUp')); }} labelStyle={styles.btnLabel} textColor={colors.primary}>{t('ad.passUp')}</Button>
          </View>
        )}

        <View style={[styles.card, { padding: 0, marginTop: spacing.md }]}>
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
  statusCard: { flexDirection: 'row', gap: spacing.md, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: radius.lg, padding: spacing.md, marginTop: spacing.lg },
  medallion: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  step: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dot: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.borderStrong, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  handed: { flexDirection: 'row', gap: spacing.sm, backgroundColor: colors.watchSoft, padding: spacing.md, borderRadius: radius.md, marginTop: spacing.md },
  btn: { borderRadius: radius.md },
  btnLabel: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', padding: spacing.md, gap: spacing.md },
});
