import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert as RNAlert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { LevelMeter } from '@/components/LevelMeter';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { toiletById } from '@/data/toilets';
import { colors, radius, spacing, statusMeta } from '@/theme';

const ODOUR = {
  en: ['Fresh', 'Fresh', 'Light smell', 'Noticeable', 'Smelly', 'Very smelly'],
  hi: ['ताज़ा', 'ताज़ा', 'हल्की बदबू', 'ध्यान देने योग्य', 'बदबूदार', 'बहुत बदबूदार'],
};
const airWord = (a: number, lang: 'en' | 'hi') => {
  const en = a <= 100 ? 'Clean' : a <= 200 ? 'Okay' : a <= 300 ? 'Poor' : 'Very poor';
  const hi = a <= 100 ? 'साफ़' : a <= 200 ? 'ठीक' : a <= 300 ? 'खराब' : 'बहुत खराब';
  return lang === 'hi' ? hi : en;
};

export default function FacilityToilet() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, lang } = useLang();
  const toilet = toiletById(id);
  const [science, setScience] = useState(false);
  if (!toilet) return <View style={{ flex: 1, backgroundColor: colors.bg }}><AppHeader back title="Toilet" /></View>;
  const m = statusMeta[toilet.status];
  const hasData = toilet.aqi != null;
  const name = lang === 'hi' ? toilet.nameHi : toilet.name;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={name} subtitle={toilet.block} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxxl }}>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.iconTile, { backgroundColor: m.soft }]}><MaterialCommunityIcons name={m.icon as any} size={22} color={m.color} /></View>
            <View style={{ flex: 1 }}>
              <Txt variant="h3" color={m.color}>{lang === 'hi' ? toilet.headlineHi : toilet.headline}</Txt>
              <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{lang === 'hi' ? toilet.reasonHi : toilet.reason}</Txt>
              <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 6 }}>{t('c.lastReading', { t: toilet.lastSeen })}</Txt>
            </View>
          </View>
        </View>

        {hasData && (
          <View style={[styles.card, { gap: spacing.xl, marginTop: spacing.md }]}>
            <LevelMeter title={t('td.smell')} word={ODOUR[lang][toilet.odour!] ?? '—'} value={toilet.odour! / 5} tone={toilet.odour! >= 4 ? colors.act : toilet.odour! >= 3 ? colors.watch : colors.good} caption={t('td.odourOf', { n: toilet.odour! })} />
            <LevelMeter title={t('td.air')} word={airWord(toilet.aqi!, lang)} value={toilet.aqi! / 500} tone={toilet.aqi! > 300 ? colors.act : toilet.aqi! > 200 ? colors.watch : colors.good} caption={t('td.airOf', { n: toilet.aqi! })} />
          </View>
        )}

        <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
          {toilet.status === 'act' && <Button mode="contained" icon="phone-outline" onPress={() => RNAlert.alert(t('td.sendCleaner'), name, [{ text: 'OK' }])} style={styles.primaryBtn} contentStyle={{ height: 50 }} labelStyle={styles.btnLabel}>{t('td.sendCleaner')}</Button>}
          {toilet.status === 'offline' && <Button mode="contained" icon="wrench-outline" onPress={() => RNAlert.alert(t('td.reportSensor'))} style={styles.primaryBtn} contentStyle={{ height: 50 }} labelStyle={styles.btnLabel}>{t('td.reportSensor')}</Button>}
          <Button mode="outlined" icon="check" onPress={() => RNAlert.alert(t('td.markCleaned'), name)} style={styles.outlineBtn} contentStyle={{ height: 50 }} labelStyle={styles.btnLabel} textColor={colors.text}>{t('td.markCleaned')}</Button>
        </View>

        {toilet.readings.length > 0 && (
          <>
            <Pressable style={styles.toggle} onPress={() => setScience((s) => !s)}>
              <Txt variant="label" color={colors.textMuted}>{science ? t('td.hideReadings') : t('td.showReadings')}</Txt>
              <MaterialCommunityIcons name={science ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textMuted} />
            </Pressable>
            {science && (
              <View style={[styles.card, { padding: 0 }]}>
                {toilet.readings.map((rd, i) => (
                  <View key={rd.key} style={[styles.readRow, i < toilet.readings.length - 1 && styles.readBorder]}>
                    <View style={{ flex: 1 }}>
                      <Txt variant="bodyMed">{rd.plain}</Txt>
                      <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 1 }}>{rd.key}</Txt>
                    </View>
                    <Txt variant="h3" color={statusMeta[rd.level].color}>{rd.value} <Txt variant="tiny" color={colors.textSubtle}>{rd.unit}</Txt></Txt>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  row: { flexDirection: 'row', gap: spacing.md },
  iconTile: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  primaryBtn: { borderRadius: radius.md, backgroundColor: colors.primary },
  outlineBtn: { borderRadius: radius.md, borderColor: colors.borderStrong },
  btnLabel: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  toggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginVertical: spacing.lg },
  readRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  readBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
});
