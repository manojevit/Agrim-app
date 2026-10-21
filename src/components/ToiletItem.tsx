import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { AppCard } from './AppCard';
import { StatusDot } from './StatusChip';
import { Txt } from './Txt';
import { Toilet } from '@/data/types';
import { colors, spacing, statusMeta } from '@/theme';

/** A toilet shown by PLACE, with a plain-language headline. */
export function ToiletItem({ toilet }: { toilet: Toilet }) {
  const m = statusMeta[toilet.status];
  return (
    <AppCard stripe={m.color} style={{ marginBottom: spacing.sm }} onPress={() => router.push(`/toilet/${toilet.id}`)}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <View style={styles.titleRow}>
            <StatusDot status={toilet.status} size={9} />
            <Txt variant="h3">{toilet.name}</Txt>
          </View>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{toilet.block}</Txt>
          <Txt variant="label" color={m.color} style={{ marginTop: 6 }}>{toilet.headline}</Txt>
        </View>
        <View style={styles.right}>
          <Txt variant="tiny" color={colors.textSubtle}>{toilet.lastSeen}</Txt>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} />
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  right: { alignItems: 'flex-end', gap: 2 },
});
