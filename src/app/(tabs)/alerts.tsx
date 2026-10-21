import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';
import { AlertItem } from '@/components/AlertItem';
import { Scaffold } from '@/components/Scaffold';
import { Txt } from '@/components/Txt';
import { ALERTS } from '@/data/alerts';
import { colors, spacing } from '@/theme';

type Filter = 'open' | 'act' | 'handedUp' | 'resolved';
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'open', label: 'Needs action' },
  { key: 'act', label: 'Urgent' },
  { key: 'handedUp', label: 'Passed up' },
  { key: 'resolved', label: 'Sorted' },
];

export default function Alerts() {
  const [filter, setFilter] = useState<Filter>('open');
  const list = ALERTS.filter((a) => {
    if (filter === 'open') return a.state !== 'resolved';
    if (filter === 'act') return a.severity === 'act' && a.state !== 'resolved';
    if (filter === 'handedUp') return a.state === 'handedUp';
    return a.state === 'resolved';
  });

  return (
    <Scaffold title="Alerts" subtitle="In plain words — what needs doing">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingRight: spacing.lg }}>
        {FILTERS.map((f) => (
          <Chip key={f.key} selected={filter === f.key} onPress={() => setFilter(f.key)} showSelectedCheck={false}
            style={[styles.chip, filter === f.key && { backgroundColor: colors.primary }]}
            textStyle={{ fontFamily: 'PlusJakartaSans_600SemiBold', color: filter === f.key ? colors.textInverse : colors.textMuted }}>
            {f.label}
          </Chip>
        ))}
      </ScrollView>
      <Txt variant="small" color={colors.textSubtle} style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>Urgent first, then newest.</Txt>
      {list.map((a) => <AlertItem key={a.id} alert={a} />)}
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  chip: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
});
