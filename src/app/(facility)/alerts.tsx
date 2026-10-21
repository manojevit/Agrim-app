import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { AlertCard } from '@/components/AlertCard';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { facilityAlerts } from '@/data/facility';
import { colors, spacing } from '@/theme';

type Filter = 'open' | 'resolved';

export default function FacilityAlerts() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>('open');
  const list = facilityAlerts.filter((a) => (filter === 'open' ? a.state !== 'resolved' : a.state === 'resolved'));
  const FILTERS: { key: Filter; label: string }[] = [
    { key: 'open', label: t('al.needsAction') },
    { key: 'resolved', label: t('al.sorted') },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader title={t('tab.alerts')} subtitle={t('al.plain')} />
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
        {list.length === 0 && <Txt variant="body" color={colors.textMuted}>{t('al.nothing')}</Txt>}
        {list.map((a) => <AlertCard key={a.id} alert={a} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
});
