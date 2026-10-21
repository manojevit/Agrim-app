import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert as RNAlert, StyleSheet, View } from 'react-native';
import { Button, Switch } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { ALERT_RULES } from '@/data/ops';
import { ScrollView } from 'react-native';
import { colors, radius, spacing } from '@/theme';

export default function Rules() {
  const { t } = useLang();
  const [on, setOn] = useState<Record<string, boolean>>(Object.fromEntries(ALERT_RULES.map((r) => [r.id, r.enabled])));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={t('b.alertRules')} subtitle={t('r.subtitle')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        <Txt variant="small" color={colors.textMuted} style={{ marginBottom: spacing.md }}>
          {t('r.intro')}
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
                <Txt variant="tiny" color={colors.textMuted}>{t('r.keepEyeAt')}</Txt>
                <Txt variant="label" color={colors.watch} style={{ marginTop: 2 }}>{r.warn}</Txt>
              </View>
              <View style={[styles.th, { backgroundColor: colors.actSoft }]}>
                <Txt variant="tiny" color={colors.textMuted}>{t('r.cleanNowAt')}</Txt>
                <Txt variant="label" color={colors.act} style={{ marginTop: 2 }}>{r.critical}</Txt>
              </View>
            </View>
            <View style={styles.channels}>
              <MaterialCommunityIcons name="bell-ring-outline" size={14} color={colors.textSubtle} />
              <Txt variant="tiny" color={colors.textSubtle}>{t('r.tellsBy', { ch: r.channels })}</Txt>
            </View>
          </View>
        ))}

        <Button mode="contained" icon="plus" style={{ borderRadius: radius.md }} contentStyle={{ height: 50 }} labelStyle={styles.btnLabel} onPress={() => RNAlert.alert(t('r.addRule'))}>
          {t('r.addRule')}
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
  btnLabel: { fontFamily: 'Inter_700Bold', fontSize: 15 },
});
