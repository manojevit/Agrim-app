import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { AlertCard } from '@/components/AlertCard';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { blockAlerts } from '@/data/block';
import { colors, spacing } from '@/theme';

type Filter = 'handedUp' | 'open' | 'resolved';
const FILTERS: { key: Filter; label: string }[] = [
  { key: 'handedUp', label: 'Handed up to me' },
  { key: 'open', label: 'All open' },
  { key: 'resolved', label: 'Sorted' },
];

export default function BlockAlerts() {
  const [filter, setFilter] = useState<Filter>('handedUp');
  const list = blockAlerts.filter((a) => {
    if (filter === 'handedUp') return a.state === 'handedUp';
    if (filter === 'open') return a.state !== 'resolved';
    return a.state === 'resolved';
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader title="Alerts" subtitle="Across your cluster" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.md }}>
          {FILTERS.map((f) => (
            <Chip key={f.key} selected={filter === f.key} onPress={() => setFilter(f.key)} showSelectedCheck={false}
              style={[styles.chip, filter === f.key && { backgroundColor: colors.primary }]}
              textStyle={{ fontFamily: 'PlusJakartaSans_600SemiBold', color: filter === f.key ? '#FFFFFF' : colors.textMuted }}>
              {f.label}
            </Chip>
          ))}
        </ScrollView>
        {filter === 'handedUp' && <Txt variant="small" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>These reached you because nobody below answered in time.</Txt>}
        {list.length === 0 && <Txt variant="body" color={colors.textMuted}>Nothing here right now.</Txt>}
        {list.map((a) => <AlertCard key={a.id} alert={a} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
});
