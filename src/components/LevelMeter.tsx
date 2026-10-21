import { StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { colors, radius, spacing } from '@/theme';

/** Plain good→bad meter with a word — replaces the old mystery gauges. */
export function LevelMeter({
  title,
  word,
  value,
  tone,
  caption,
}: {
  title: string;
  word: string;
  value: number; // 0..1
  tone: string;
  caption?: string;
}) {
  const pct = Math.max(0.03, Math.min(1, value));
  return (
    <View style={{ gap: spacing.sm }}>
      <View style={styles.head}>
        <Txt variant="label" color={colors.textMuted}>{title}</Txt>
        <Txt variant="h3" color={tone}>{word}</Txt>
      </View>
      <View style={styles.track}>
        <View style={styles.segments}>
          <View style={[styles.seg, { backgroundColor: colors.goodSoft }]} />
          <View style={[styles.seg, { backgroundColor: colors.watchSoft }]} />
          <View style={[styles.seg, { backgroundColor: colors.actSoft }]} />
        </View>
        <View style={[styles.marker, { left: `${pct * 100}%`, backgroundColor: tone }]} />
      </View>
      {caption ? <Txt variant="tiny" color={colors.textSubtle}>{caption}</Txt> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  track: { height: 12, justifyContent: 'center' },
  segments: { flexDirection: 'row', height: 12, borderRadius: radius.pill, overflow: 'hidden' },
  seg: { flex: 1 },
  marker: { position: 'absolute', width: 18, height: 18, borderRadius: 9, borderWidth: 3, borderColor: colors.surface, marginLeft: -9 },
});
