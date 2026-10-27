import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useRef, useState } from 'react';
import { Image, LayoutChangeEvent, PanResponder, Pressable, StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { colors, radius, spacing } from '@/theme';

/**
 * A live slippy map built straight from OpenStreetMap raster tiles — plain
 * <Image> tiles in a grid, no map SDK, no API key, no billing. Supports drag
 * to pan, +/- zoom, recenter, and tappable pins. "Open map, no API, no money."
 */
const TILE = 256;
const OSM = (z: number, x: number, y: number) => `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;

export interface MapMarker {
  lat: number;
  lng: number;
  color: string;
  label?: string;
  onPress?: () => void;
}

const lngToX = (lng: number, z: number) => ((lng + 180) / 360) * Math.pow(2, z);
const latToY = (lat: number, z: number) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * Math.pow(2, z);
};
const xToLng = (x: number, z: number) => (x / Math.pow(2, z)) * 360 - 180;
const yToLat = (y: number, z: number) => {
  const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
};

/** Pick a center + zoom that fits all markers inside w×h. */
function fit(markers: MapMarker[], w: number, h: number) {
  if (!markers.length) return { lat: 28.6139, lng: 77.209, zoom: 11 };
  const lats = markers.map((m) => m.lat);
  const lngs = markers.map((m) => m.lng);
  const lat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const lng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
  if (markers.length === 1) return { lat, lng, zoom: 15 };
  for (let z = 18; z >= 3; z--) {
    const xs = lngs.map((v) => lngToX(v, z) * TILE);
    const ys = lats.map((v) => latToY(v, z) * TILE);
    const spanX = Math.max(...xs) - Math.min(...xs);
    const spanY = Math.max(...ys) - Math.min(...ys);
    if (spanX < w - 80 && spanY < h - 80) return { lat, lng, zoom: z };
  }
  return { lat, lng, zoom: 11 };
}

export function OsmMap({
  markers,
  height = 300,
  controls = true,
  minZoom = 4,
  maxZoom = 18,
}: {
  markers: MapMarker[];
  height?: number;
  controls?: boolean;
  minZoom?: number;
  maxZoom?: number;
}) {
  const [w, setW] = useState(0);
  const [view, setView] = useState<{ lat: number; lng: number; zoom: number } | null>(null);
  const viewRef = useRef(view);
  viewRef.current = view;
  const initial = useMemo(() => (w > 0 ? fit(markers, w, height) : null), [w, height, markers]);
  const v = view ?? initial;

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dx) > 3 || Math.abs(g.dy) > 3,
      onPanResponderMove: (_e, g) => {
        const cur = viewRef.current ?? initial;
        if (!cur) return;
        const z = cur.zoom;
        const gx = lngToX(cur.lng, z) * TILE - g.dx;
        const gy = latToY(cur.lat, z) * TILE - g.dy;
        setView({ lat: yToLat(gy / TILE, z), lng: xToLng(gx / TILE, z), zoom: z });
      },
    })
  ).current;

  const onLayout = (e: LayoutChangeEvent) => setW(Math.round(e.nativeEvent.layout.width));
  const zoomBy = (d: number) => v && setView({ ...v, zoom: Math.max(minZoom, Math.min(maxZoom, v.zoom + d)) });
  const recenter = () => w > 0 && setView(fit(markers, w, height));

  // Tile grid + marker positions for the current view.
  const render = (() => {
    if (!v || w <= 0) return null;
    const z = Math.round(v.zoom);
    const n = Math.pow(2, z);
    const gcx = lngToX(v.lng, z) * TILE;
    const gcy = latToY(v.lat, z) * TILE;
    const originX = gcx - w / 2;
    const originY = gcy - height / 2;
    const x0 = Math.floor(originX / TILE);
    const x1 = Math.floor((originX + w) / TILE);
    const y0 = Math.max(0, Math.floor(originY / TILE));
    const y1 = Math.min(n - 1, Math.floor((originY + height) / TILE));
    const tiles = [];
    for (let tx = x0; tx <= x1; tx++) {
      for (let ty = y0; ty <= y1; ty++) {
        const wx = ((tx % n) + n) % n;
        tiles.push({ key: `${z}-${tx}-${ty}`, uri: OSM(z, wx, ty), left: tx * TILE - originX, top: ty * TILE - originY });
      }
    }
    const pins = markers.map((m, i) => ({
      m,
      i,
      left: lngToX(m.lng, z) * TILE - originX,
      top: latToY(m.lat, z) * TILE - originY,
    }));
    return { tiles, pins };
  })();

  return (
    <View style={[styles.map, { height }]} onLayout={onLayout} {...pan.panHandlers}>
      {render?.tiles.map((t) => (
        <Image key={t.key} source={{ uri: t.uri }} style={[styles.tile, { left: t.left, top: t.top }]} />
      ))}

      {render?.pins.map(({ m, i, left, top }) =>
        left < -30 || left > w + 30 || top < -30 || top > height + 30 ? null : (
          <Pressable
            key={i}
            onPress={m.onPress}
            style={[styles.pin, { left: left - 14, top: top - 30 }]}
            hitSlop={6}
          >
            <View style={[styles.pinHead, { backgroundColor: m.color }]}>
              {m.label ? <Txt variant="tiny" color="#FFFFFF">{m.label}</Txt> : null}
            </View>
            <View style={[styles.pinTail, { borderTopColor: m.color }]} />
          </Pressable>
        )
      )}

      {controls && (
        <View style={styles.controls}>
          <Ctrl icon="plus" onPress={() => zoomBy(1)} />
          <Ctrl icon="minus" onPress={() => zoomBy(-1)} />
          <Ctrl icon="crosshairs-gps" onPress={recenter} />
        </View>
      )}
      <View style={styles.attr}>
        <Txt variant="tiny" color={colors.textMuted}>© OpenStreetMap</Txt>
      </View>
    </View>
  );
}

function Ctrl({ icon, onPress }: { icon: string; onPress: () => void }) {
  return (
    <Pressable style={styles.ctrl} onPress={onPress} hitSlop={6}>
      <MaterialCommunityIcons name={icon as any} size={18} color={colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  map: { borderRadius: radius.xl, backgroundColor: '#E6EBF2', borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  tile: { position: 'absolute', width: TILE, height: TILE },
  pin: { position: 'absolute', alignItems: 'center' },
  pinHead: { minWidth: 28, height: 28, paddingHorizontal: 6, borderRadius: 14, borderWidth: 2, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#1A2A44', shadowOpacity: 0.3, shadowRadius: 3, shadowOffset: { width: 0, height: 1 }, elevation: 3 },
  pinTail: { width: 0, height: 0, borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 7, borderLeftColor: 'transparent', borderRightColor: 'transparent', marginTop: -1 },
  controls: { position: 'absolute', top: spacing.md, right: spacing.md, gap: spacing.sm },
  ctrl: { width: 38, height: 38, borderRadius: 10, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#1A2A44', shadowOpacity: 0.14, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  attr: { position: 'absolute', bottom: 6, right: 10, backgroundColor: 'rgba(255,255,255,0.72)', paddingHorizontal: 6, borderRadius: 6 },
});
