import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { AreaChart } from '@/components/AreaChart';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { BLOCKS } from '@/data/devices';
import { colors, radius, spacing } from '@/theme';

const CURVE = [62, 78, 70, 44, 66, 52, 40, 58, 72, 80, 64, 50, 30, 22, 18, 24, 40];

export default function BlockUsage() {
  const { t } = useLang();
  const [block, setBlock] = useState(BLOCKS[0].id);
  const [range, setRange] = useState<'today' | '7days' | '30days'>('today');

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={t('bu.title')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxxl, width: '100%', maxWidth: 620, alignSelf: 'center' }}>
        <Txt variant="h2">{BLOCKS.find((b) => b.id === block)?.name}</Txt>
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2, marginBottom: spacing.md }}>{t('bu.sub')}</Txt>

        <View style={styles.row}>
          {BLOCKS.map((b) => <Seg key={b.id} label={b.name} active={block === b.id} onPress={() => setBlock(b.id)} />)}
        </View>
        <View style={[styles.row, { marginTop: spacing.sm }]}>
          {(['today', '7days', '30days'] as const).map((r) => <Seg key={r} label={t('bu.' + r)} active={range === r} onPress={() => setRange(r)} />)}
        </View>

        <View style={styles.card}>
          <Txt variant="small" color={colors.textMuted}>{t('bu.visits24')}</Txt>
          <Txt variant="display" style={{ marginVertical: 4 }}>211</Txt>
          <Txt variant="small" color={colors.textMuted}>{t('bu.visitsN', { n: 211 })}</Txt>
          <Txt variant="small" color={colors.textMuted}>{t('bu.busiest', { t: '1:30 pm — 18 visits' })}</Txt>
        </View>

        <View style={styles.card}>
          <Txt variant="h3" style={{ marginBottom: spacing.sm }}>{t('bu.useThroughDay')}</Txt>
          <AreaChart data={CURVE} color={colors.primary} height={130} />
          <View style={styles.axis}>
            <Txt variant="tiny" color={colors.textSubtle}>11:30 am</Txt>
            <Txt variant="tiny" color={colors.textSubtle}>10:30 pm</Txt>
            <Txt variant="tiny" color={colors.textSubtle}>9:30 am</Txt>
          </View>
        </View>

        <View style={styles.note}>
          <Txt variant="h3" color={colors.primary}>{t('bu.howCounted')}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 4 }}>{t('bu.howCountedBody')}</Txt>
        </View>
      </ScrollView>
    </View>
  );
}

function Seg({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.seg, active ? styles.segOn : styles.segOff]}>
      <Txt variant="label" color={active ? colors.primary : colors.textMuted}>{label}</Txt>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  seg: { borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 7 },
  segOn: { backgroundColor: colors.primarySoft },
  segOff: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginTop: spacing.lg },
  axis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xs },
  note: { backgroundColor: colors.primaryTint, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.primarySoft, padding: spacing.lg, marginTop: spacing.lg },
});
