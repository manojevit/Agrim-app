import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { colors, typeScale } from '@/theme';

type Variant = keyof typeof typeScale;

/** Typed text — the single way we render words, so type stays consistent. */
export function Txt({
  variant = 'body',
  color,
  style,
  children,
  ...rest
}: TextProps & { variant?: Variant; color?: string }) {
  return (
    <RNText style={[typeScale[variant] as TextStyle, { color: color ?? colors.text }, style]} {...rest}>
      {children}
    </RNText>
  );
}
