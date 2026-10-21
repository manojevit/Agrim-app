import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, Searchbar } from 'react-native-paper';
import { Scaffold } from '@/components/Scaffold';
import { ToiletItem } from '@/components/ToiletItem';
import { Txt } from '@/components/Txt';
import { TOILETS } from '@/data/toilets';
import { StatusKey, colors, radius, spacing } from '@/theme';

type Filter = 'all' | StatusKey;
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'act', label: 'Clean now' },
  { key: 'watch', label: 'Keep an eye' },
  { key: 'good', label: 'Good' },
  { key: 'offline', label: 'No signal' },
];

export default function Toilets() {
  const [filter, setFilter] = useState<Filter>('all');
  const [q, setQ] = useState('');
  const order: Record<StatusKey, number> = { act: 0, watch: 1, offline: 2, never: 3, good: 4 };

  const list = TOILETS
    .filter((t) => (filter === 'all' ? true : t.status === filter))
    .filter((t) => (q ? (t.name + t.block).toLowerCase().includes(q.toLowerCase()) : true))
    .sort((a, b) => order[a.status] - order[b.status]);

  return (
    <Scaffold title="Toilets" subtitle="Shown by place, worst first">
      <Searchbar
        placeholder="Search a toilet or building…"
        value={q}
        onChangeText={setQ}
        style={styles.search}
        inputStyle={{ fontFamily: 'Inter_400Regular', minHeight: 0 }}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: spacing.md }} contentContainerStyle={{ gap: spacing.sm, paddingRight: spacing.lg }}>
        {FILTERS.map((f) => (
          <Chip key={f.key} selected={filter === f.key} onPress={() => setFilter(f.key)} showSelectedCheck={false}
            style={[styles.chip, filter === f.key && { backgroundColor: colors.primary }]}
            textStyle={{ fontFamily: 'Inter_600SemiBold', color: filter === f.key ? colors.textInverse : colors.textMuted }}>
            {f.label}
          </Chip>
        ))}
      </ScrollView>

      <Txt variant="small" color={colors.textSubtle} style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>
        {list.length} {list.length === 1 ? 'toilet' : 'toilets'}
      </Txt>
      {list.map((t) => <ToiletItem key={t.id} toilet={t} />)}
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  search: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  chip: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
});
