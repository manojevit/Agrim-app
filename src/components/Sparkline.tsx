import { View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { colors } from '@/theme';

/** Tiny inline trend line used on the dashboard metric cards. */
export function Sparkline({
  data,
  color = colors.good,
  width = 90,
  height = 40,
  strokeWidth = 2.4,
}: {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
}) {
  if (!data || data.length < 2) return <View style={{ width, height }} />;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pad = strokeWidth;
  const pts = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (width - pad * 2);
      const y = pad + (1 - (v - min) / span) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <Svg width={width} height={height}>
      <Polyline points={pts} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" />
    </Svg>
  );
}
