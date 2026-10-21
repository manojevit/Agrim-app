import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { facilityAlerts } from '@/data/facility';
import { Alert } from '@/data/types';
import { colors, elevation, radius, spacing } from '@/theme';

const sev = {
  act: { color: colors.act, soft: colors.actSoft, icon: 'alert-circle' },
  watch: { color: colors.watch, soft: colors.watchSoft, icon: 'eye-outline' },
  info: { color: colors.offline, soft: colors.offlineSoft, icon: 'information' },
} as const;
const stateLabel: Record<Alert['state'], string> = { new: 'New', onit: 'You\'re on it', handedUp: 'Passed to senior', resolved: 'Sorted' };

type Filter = 'open' | 'resolved';

export default function FacilityAlerts() {
  const [filter, setFilter] = useState<Filter>('open');
  const list = facilityAlerts.filter((a) => (filter === 'open' ? a.state !== 'resolved' : a.state === 'resolved'));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader title="Alerts" subtitle="What needs doing, in plain words" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md }}>
          {(['open', 'resolved'] as Filter[]).map((f) => (
            <Chip key={f} selected={filter === f} onPress={() => setFilter(f)} showSelectedCheck={false}
              style={[styles.chip, filter === f && { backgroundColor: colors.primary }]}
              textStyle={{ fontFamily: 'PlusJakartaSans_600SemiBold', color: filter === f ? '#FFFFFF' : colors.textMuted }}>
              {f === 'open' ? 'Needs action' : 'Sorted'}
            </Chip>
          ))}
        </View>

        {list.length === 0 && <Txt variant="body" color={colors.textMuted}>Nothing here. Nicely done.</Txt>}
        {list.map((a) => {
          const s = sev[a.severity];
          return (
            <Pressable key={a.id} onPress={() => router.push(`/facility-alert/${a.id}`)} style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}>
              <View style={{ flexDirection: 'row', gap: spacing.md }}>
                <View style={[styles.medallion, { backgroundColor: s.color }]}>
                  <MaterialCommunityIcons name={s.icon as any} size={22} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Txt variant="h3">{a.headline}</Txt>
                  <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{a.detail}</Txt>
                  <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 8 }}>{a.toiletName}</Txt>
                </View>
              </View>
              <View style={styles.foot}>
                <View style={[styles.tag, { backgroundColor: s.soft }]}><Txt variant="tiny" color={s.color}>{stateLabel[a.state]}</Txt></View>
                <Txt variant="tiny" color={colors.textSubtle}>{a.age}</Txt>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  card: { backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.md, ...elevation.card },
  medallion: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  foot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
});
