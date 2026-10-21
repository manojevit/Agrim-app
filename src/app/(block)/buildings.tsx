import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { BuildingCard } from '@/components/BuildingCard';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { BLOCK, BLOCK_BUILDINGS } from '@/data/block';
import { StatusKey, colors, spacing } from '@/theme';

type Filter = 'all' | 'need' | 'good';

export default function BlockBuildings() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>('all');
  const FILTERS: { key: Filter; label: string }[] = [
    { key: 'all', label: t('flt.all') },
    { key: 'need', label: t('b.needFilter') },
    { key: 'good', label: t('st.good') },
  ];
  const order: Record<StatusKey, number> = { act: 0, offline: 1, watch: 2, never: 3, good: 4 };
  const list = BLOCK_BUILDINGS
    .filter((b) => (filter === 'all' ? true : filter === 'good' ? b.status === 'good' : b.status !== 'good'))
    .sort((a, b) => order[a.status] - order[b.status]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader title={t('tab.buildings')} subtitle={BLOCK.area} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md }}>
          {FILTERS.map((f) => (
            <Chip key={f.key} selected={filter === f.key} onPress={() => setFilter(f.key)} showSelectedCheck={false}
              style={[styles.chip, filter === f.key && { backgroundColor: colors.primary }]}
              textStyle={{ fontFamily: 'Inter_600SemiBold', color: filter === f.key ? '#FFFFFF' : colors.textMuted }}>
              {f.label}
            </Chip>
          ))}
        </View>
        <Txt variant="small" color={colors.textSubtle} style={{ marginBottom: spacing.sm }}>{t('b.buildingsCount', { n: list.length })}</Txt>
        {list.map((b) => <BuildingCard key={b.id} building={b} variant="row" />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
});
