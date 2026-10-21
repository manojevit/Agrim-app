import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { ToiletCard } from '@/components/ToiletCard';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { FACILITY, facilityToilets } from '@/data/facility';
import { StatusKey, colors, spacing } from '@/theme';

type Filter = 'all' | StatusKey;

export default function FacilityToilets() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>('all');
  const FILTERS: { key: Filter; label: string }[] = [
    { key: 'all', label: t('flt.all') },
    { key: 'act', label: t('st.act') },
    { key: 'watch', label: t('st.watch') },
    { key: 'good', label: t('st.good') },
    { key: 'offline', label: t('st.offline') },
  ];
  const order: Record<StatusKey, number> = { act: 0, offline: 1, watch: 2, never: 3, good: 4 };
  const list = facilityToilets
    .filter((x) => (filter === 'all' ? true : x.status === filter))
    .sort((a, b) => order[a.status] - order[b.status]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader title={t('tab.toilets')} subtitle={FACILITY.building} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.sm }}>
          {FILTERS.map((f) => (
            <Chip key={f.key} selected={filter === f.key} onPress={() => setFilter(f.key)} showSelectedCheck={false}
              style={[styles.chip, filter === f.key && { backgroundColor: colors.primary }]}
              textStyle={{ fontFamily: 'PlusJakartaSans_600SemiBold', color: filter === f.key ? '#FFFFFF' : colors.textMuted }}>
              {f.label}
            </Chip>
          ))}
        </ScrollView>
        <Txt variant="small" color={colors.textSubtle} style={{ marginTop: spacing.sm, marginBottom: spacing.sm }}>{t('f.toiletCount', { n: list.length })}</Txt>
        {list.map((x) => <ToiletCard key={x.id} toilet={x} variant="row" />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
});
