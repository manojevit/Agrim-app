import { View } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '@/theme';

/** Filled area line chart — AQI trend and block-usage curve. */
export function AreaChart({
  data,
  color = colors.primary,
  width = 300,
  height = 130,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}) {
  if (!data || data.length < 2) return <View style={{ width, height }} />;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pad = 4;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = pad + (1 - (v - min) / span) * (height - pad * 2);
    return { x, y };
  });
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;
  const id = `g${Math.round(min)}${Math.round(max)}${data.length}`;
  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity={0.22} />
          <Stop offset="1" stopColor={color} stopOpacity={0.02} />
        </LinearGradient>
      </Defs>
      <Path d={area} fill={`url(#${id})`} />
      <Path d={line} fill="none" stroke={color} strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  );
}
