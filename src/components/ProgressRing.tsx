import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

/** Circular progress — the one bold element on the cleaner's home. */
export function ProgressRing({
  size = 84,
  stroke = 9,
  progress,
  color,
  track,
  children,
}: {
  size?: number;
  stroke?: number;
  progress: number; // 0..1
  color: string;
  track: string;
  children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(1, progress)));
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
      </Svg>
      {children}
    </View>
  );
}
