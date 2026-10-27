import { View } from 'react-native';
import Svg, { Path, Line } from 'react-native-svg';
import { Txt } from './Txt';
import { colors } from '@/theme';

/** 0° = top, clockwise positive. */
function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 0) * Math.PI) / 180;
  return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polar(cx, cy, r, start);
  const e = polar(cx, cy, r, end);
  const large = Math.abs(end - start) > 180 ? 1 : 0;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

const START = -135; // bottom-left
const SWEEP = 270; // open 90° at the bottom

/**
 * Speedometer-style gauge (AQI / Odour), faithful to the original but cleaner:
 * a soft track, a coloured value arc, light tick marks, and the value in the middle.
 */
export function Gauge({
  value,
  max,
  color,
  unit,
  label,
  size = 150,
}: {
  value: number | null;
  max: number;
  color: string;
  unit: string; // "index" | "level"
  label: string; // "AQI" | "Odour"
  size?: number;
}) {
  const stroke = 13;
  const r = (size - stroke) / 2 - 6;
  const cx = size / 2;
  const cy = size / 2;
  const frac = value == null ? 0 : Math.max(0, Math.min(1, value / max));
  const valEnd = START + frac * SWEEP;

  const ticks = Array.from({ length: 11 }, (_, i) => START + (i / 10) * SWEEP);

  return (
    <View style={{ alignItems: 'center', width: size }}>
      <Svg width={size} height={size - 18}>
        {/* ticks */}
        {ticks.map((a, i) => {
          const p1 = polar(cx, cy, r + stroke / 2 + 3, a);
          const p2 = polar(cx, cy, r + stroke / 2 + 9, a);
          return <Line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={colors.borderStrong} strokeWidth={1.6} strokeLinecap="round" />;
        })}
        {/* track */}
        <Path d={arcPath(cx, cy, r, START, START + SWEEP)} stroke={colors.surfaceSunken} strokeWidth={stroke} fill="none" strokeLinecap="round" />
        {/* value */}
        {value != null && frac > 0 && (
          <Path d={arcPath(cx, cy, r, START, valEnd)} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
        )}
      </Svg>
      <View style={{ position: 'absolute', top: 0, height: size - 18, width: size, alignItems: 'center', justifyContent: 'center' }}>
        <Txt variant="display" color={colors.text}>{value == null ? '—' : value}</Txt>
        <Txt variant="small" color={colors.textMuted}>{unit}</Txt>
      </View>
      <Txt variant="label" color={colors.textMuted} style={{ marginTop: 2 }}>{label}</Txt>
    </View>
  );
}
