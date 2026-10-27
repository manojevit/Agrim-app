import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { colors, radius, spacing } from '@/theme';

/**
 * Stylised map placeholder with clustered pins — stands in for the live
 * OpenStreetMap view in the original (no map SDK in this prototype build).
 */
export function MapPreview({ height = 240, controls = true }: { height?: number; controls?: boolean }) {
  return (
    <View style={[styles.map, { height }]}>
      {/* faint roads */}
      <View style={[styles.road, { top: '46%', left: 0, right: 0, height: 10 }]} />
      <View style={[styles.road, { left: '54%', top: 0, bottom: 0, width: 10 }]} />
      <View style={[styles.road, { top: '20%', left: '-10%', right: '40%', height: 7, transform: [{ rotate: '24deg' }] }]} />
      {/* park */}
      <View style={styles.park} />

      {/* cluster bubbles */}
      <View style={[styles.cluster, { top: '26%', left: '42%' }]}><Txt variant="label" color="#FFFFFF">4</Txt></View>
      <View style={[styles.cluster, { top: '62%', left: '34%' }]}><Txt variant="label" color="#FFFFFF">2</Txt></View>

      {controls && (
        <View style={styles.controls}>
          <Ctrl icon="plus" />
          <Ctrl icon="minus" />
          <Ctrl icon="crosshairs-gps" />
        </View>
      )}
      <Txt variant="tiny" color={colors.textSubtle} style={styles.attr}>© OpenStreetMap</Txt>
    </View>
  );
}

function Ctrl({ icon }: { icon: string }) {
  return (
    <View style={styles.ctrl}><MaterialCommunityIcons name={icon as any} size={18} color={colors.text} /></View>
  );
}

const styles = StyleSheet.create({
  map: { borderRadius: radius.xl, backgroundColor: '#E6EBF2', borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  road: { position: 'absolute', backgroundColor: '#FFFFFF' },
  park: { position: 'absolute', top: '8%', left: '6%', width: 110, height: 76, borderRadius: 16, backgroundColor: '#D9E8DC' },
  cluster: { position: 'absolute', width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFFFFF' },
  controls: { position: 'absolute', top: spacing.md, right: spacing.md, gap: spacing.sm },
  ctrl: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#1A2A44', shadowOpacity: 0.12, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  attr: { position: 'absolute', bottom: 6, right: 10 },
});
