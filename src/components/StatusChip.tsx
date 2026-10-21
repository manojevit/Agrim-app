import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { radius, spacing, statusMeta, StatusKey } from '@/theme';

/** The one status pill. Icon + word, in the status colour. */
export function StatusChip({ status, size = 'md' }: { status: StatusKey; size?: 'sm' | 'md' }) {
  const m = statusMeta[status];
  const sm = size === 'sm';
  return (
    <View style={[styles.pill, { backgroundColor: m.soft, paddingVertical: sm ? 3 : 5, paddingHorizontal: sm ? 8 : 10 }]}>
      <MaterialCommunityIcons name={m.icon as any} size={sm ? 12 : 14} color={m.color} />
      <Txt variant={sm ? 'tiny' : 'label'} color={m.color}>{m.label}</Txt>
    </View>
  );
}

export function StatusDot({ status, size = 10 }: { status: StatusKey; size?: number }) {
  return <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: statusMeta[status].color }} />;
}

const styles = StyleSheet.create({
  pill: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs + 1, borderRadius: radius.pill, alignSelf: 'flex-start' },
});
