import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { AppCard } from './AppCard';
import { Device, blockById } from '@/data/devices';
import { aqiBand, colors, spacing } from '@/theme';

function dotColor(d: Device) {
  // Dot = connection status (as in the original): green online, teal offline.
  return d.online ? colors.good : colors.offline;
}

/**
 * A device line. `nearby` = compact (dashboard), `list` = full (Devices tab).
 */
export function DeviceRow({ device, mode = 'list' }: { device: Device; mode?: 'nearby' | 'list' }) {
  const b = blockById(device.blockId);
  const open = () => router.push(`/device/${device.serial}`);
  const band = aqiBand(device.aqi);

  if (mode === 'nearby') {
    return (
      <AppCard onPress={open} padded={false} style={styles.nearby}>
        <View style={[styles.dot, { backgroundColor: dotColor(device) }]} />
        <View style={{ flex: 1 }}>
          <Txt variant="h3">{device.serial}</Txt>
          <Txt variant="small" color={colors.textMuted} numberOfLines={1}>
            {b?.name} · {device.lastSeen}
          </Txt>
        </View>
        <Txt variant="label" color={device.online ? band.color : colors.textSubtle}>
          {device.online ? `AQI ${device.aqi}` : 'Offline'}
        </Txt>
      </AppCard>
    );
  }

  return (
    <AppCard onPress={open} padded={false} style={styles.list}>
      <View style={[styles.dot, { backgroundColor: dotColor(device) }]} />
      <View style={{ flex: 1 }}>
        <Txt variant="h3">{device.serial}</Txt>
        <Txt variant="small" color={colors.textMuted} numberOfLines={1}>
          {b?.ward} · {b?.area} · {b?.city} · {device.online ? 'Online' : 'Offline'} · {device.lastSeen}
        </Txt>
      </View>
      <MaterialCommunityIcons name="information-outline" size={20} color={colors.textSubtle} />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  nearby: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  list: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  dot: { width: 11, height: 11, borderRadius: 6 },
});
