import { router } from 'expo-router';
import { useMemo } from 'react';
import { MapMarker, OsmMap } from './OsmMap';
import { DEVICES, Device, deviceLatLng } from '@/data/devices';
import { aqiBand, colors } from '@/theme';

function pinColor(d: Device): string {
  if (!d.online) return colors.offline;
  return aqiBand(d.aqi).color;
}

/**
 * Live OpenStreetMap view of the estate, one pin per unit (green/amber/red by
 * air quality, teal when offline). Tap a pin to open that device.
 */
export function MapPreview({
  height = 240,
  controls = true,
  devices = DEVICES,
}: {
  height?: number;
  controls?: boolean;
  devices?: Device[];
}) {
  const markers = useMemo<MapMarker[]>(
    () =>
      devices.map((d) => {
        const { lat, lng } = deviceLatLng(d);
        return { lat, lng, color: pinColor(d), onPress: () => router.push(`/device/${d.serial}`) };
      }),
    [devices]
  );
  return <OsmMap markers={markers} height={height} controls={controls} />;
}
