import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert as RNAlert, Pressable, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { AppCard } from '@/components/AppCard';
import { Scaffold } from '@/components/Scaffold';
import { SectionHeader } from '@/components/SectionHeader';
import { Txt } from '@/components/Txt';
import { RECENT_EXPORTS, REPORT_PERIODS, REPORT_SCOPES } from '@/data/ops';
import { colors, radius, spacing } from '@/theme';

export default function Reports() {
  const [scope, setScope] = useState(REPORT_SCOPES[0]);
  const [period, setPeriod] = useState(REPORT_PERIODS[1]);
  const [format, setFormat] = useState<'PDF' | 'CSV'>('PDF');

  return (
    <Scaffold title="Reports" subtitle="Download what happened" back>
      <AppCard style={{ gap: spacing.lg }}>
        <Picker label="Area" value={scope} options={REPORT_SCOPES} onPick={setScope} />
        <Picker label="Period" value={period} options={REPORT_PERIODS} onPick={setPeriod} />
        <View>
          <Txt variant="label" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>Format</Txt>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            {(['PDF', 'CSV'] as const).map((f) => (
              <Pressable key={f} onPress={() => setFormat(f)} style={[styles.fmt, format === f && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
                <MaterialCommunityIcons name={f === 'PDF' ? 'file-pdf-box' : 'file-delimited-outline'} size={18} color={format === f ? colors.textInverse : colors.textMuted} />
                <Txt variant="label" color={format === f ? colors.textInverse : colors.textMuted}>{f === 'PDF' ? 'Printable PDF' : 'Spreadsheet CSV'}</Txt>
              </Pressable>
            ))}
          </View>
        </View>
        <Button mode="contained" icon="download" style={{ borderRadius: radius.md }} contentStyle={{ height: 48 }} labelStyle={styles.btnLabel} onPress={() => RNAlert.alert('Generating report', `${format} for ${scope} · ${period}. It will appear below when ready.`)}>
          Create report
        </Button>
      </AppCard>

      <SectionHeader title="Recent reports" />
      {RECENT_EXPORTS.map((e) => (
        <AppCard key={e.id} style={{ marginBottom: spacing.sm }}>
          <View style={styles.row}>
            <View style={styles.icon}><MaterialCommunityIcons name={e.format === 'PDF' ? 'file-pdf-box' : 'file-delimited-outline'} size={22} color={colors.primary} /></View>
            <View style={{ flex: 1 }}>
              <Txt variant="bodyMed">{e.scope} · {e.format}</Txt>
              <Txt variant="tiny" color={colors.textMuted} style={{ marginTop: 1 }}>{e.period} · {e.when}</Txt>
            </View>
            {e.status === 'Ready' ? (
              <Button mode="text" compact labelStyle={styles.link} textColor={colors.primary} onPress={() => RNAlert.alert('Download', `${e.format} would download now.`)}>Download</Button>
            ) : (
              <View style={styles.running}><Txt variant="tiny" color={colors.watch}>Running…</Txt></View>
            )}
          </View>
        </AppCard>
      ))}
    </Scaffold>
  );
}

function Picker({ label, value, options, onPick }: { label: string; value: string; options: string[]; onPick: (v: string) => void }) {
  return (
    <View>
      <Txt variant="label" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{label}</Txt>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm }}>
        {options.map((o) => (
          <Pressable key={o} onPress={() => onPick(o)} style={[styles.opt, value === o && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
            <Txt variant="label" color={value === o ? colors.textInverse : colors.textMuted}>{o}</Txt>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  opt: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  fmt: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs, paddingVertical: spacing.md, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  btnLabel: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  icon: { width: 42, height: 42, borderRadius: 12, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
  link: { fontFamily: 'Inter_700Bold', fontSize: 13 },
  running: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, backgroundColor: colors.watchSoft, borderRadius: radius.pill },
});
