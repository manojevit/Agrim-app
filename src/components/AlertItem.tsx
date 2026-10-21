import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppCard } from './AppCard';
import { Txt } from './Txt';
import { Alert } from '@/data/types';
import { colors, spacing } from '@/theme';

const sev = {
  act: { color: colors.act, soft: colors.actSoft, label: 'Clean now', icon: 'alert-circle' },
  watch: { color: colors.watch, soft: colors.watchSoft, label: 'Keep an eye', icon: 'eye-outline' },
  info: { color: colors.offline, soft: colors.offlineSoft, label: 'For info', icon: 'information' },
} as const;

const stateLabel: Record<Alert['state'], string> = {
  new: 'New',
  onit: 'Someone is on it',
  handedUp: 'Passed to senior',
  resolved: 'Sorted',
};

export function AlertItem({ alert }: { alert: Alert }) {
  const s = sev[alert.severity];
  return (
    <AppCard stripe={s.color} style={{ marginBottom: spacing.sm }} onPress={() => router.push(`/alert/${alert.id}`)}>
      <View style={styles.row}>
        <View style={[styles.icon, { backgroundColor: s.soft }]}>
          <MaterialCommunityIcons name={s.icon as any} size={22} color={s.color} />
        </View>
        <View style={{ flex: 1 }}>
          <Txt variant="h3">{alert.headline}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{alert.detail}</Txt>
          <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 8 }}>{alert.toiletName} · {alert.block}</Txt>
          <View style={styles.tags}>
            <View style={[styles.tag, { backgroundColor: s.soft }]}>
              <Txt variant="tiny" color={s.color}>{s.label}</Txt>
            </View>
            <Txt variant="tiny" color={colors.textMuted}>{stateLabel[alert.state]}</Txt>
            <Txt variant="tiny" color={colors.textSubtle} style={{ marginLeft: 'auto' }}>{alert.age}</Txt>
          </View>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md },
  icon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  tags: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
});
