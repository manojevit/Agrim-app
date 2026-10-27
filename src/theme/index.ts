/**
 * Agrim Suchak — design system (v0.6).
 * Faithful to the original app: blue primary, light blue-grey background,
 * white rounded cards with a soft shadow. The job here is to reproduce that
 * look, only smoother — tighter spacing, cleaner type, softer cards.
 * Device parameters and data are kept in full.
 */
import { MD3LightTheme, configureFonts } from 'react-native-paper';

export const colors = {
  // Surfaces — light blue-grey ground, white cards
  bg: '#EDF2F8',
  bgTint: '#E7EEF6', // slightly deeper, for the top of the gradient
  surface: '#FFFFFF',
  surfaceAlt: '#F3F6FA',
  surfaceSunken: '#E9EEF5',
  border: '#E2E8F1', // hairline
  borderStrong: '#D2DBE8',

  // Text
  text: '#141B2A',
  textMuted: '#5B6577',
  textSubtle: '#94A0B3',
  textInverse: '#FFFFFF',

  // Interactive = blue (the brand accent)
  primary: '#2563EB',
  primaryDark: '#1D4FD7',
  primaryPressed: '#1A46C2',
  primarySoft: '#DCE7FD',
  primaryTint: '#EEF3FD',

  // Status — device / air-quality signalling
  good: '#16A34A', // online / healthy
  goodSoft: '#E4F6EC',
  offline: '#0E9BB0', // teal — the "offline / silent" dot in the original
  offlineSoft: '#DCF1F4',
  watch: '#D98A0B', // amber — "poor / moderate"
  watchSoft: '#FBEFD6',
  warn: '#EA6A1E', // orange — "high"
  warnSoft: '#FCE9DC',
  act: '#DC2626', // red — "severe / critical"
  actSoft: '#FBE3E3',
  muted: '#6B7686',
  mutedSoft: '#EDF0F4',

  accent: '#2563EB',
  accentSoft: '#DCE7FD',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 40 } as const;
export const radius = { sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, pill: 999 } as const;

export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
} as const;

export const typeScale = {
  display: { fontFamily: fontFamily.extrabold, fontSize: 30, letterSpacing: -0.6, lineHeight: 36 },
  h1: { fontFamily: fontFamily.bold, fontSize: 23, letterSpacing: -0.5, lineHeight: 29 },
  h2: { fontFamily: fontFamily.bold, fontSize: 19, letterSpacing: -0.3, lineHeight: 25 },
  h3: { fontFamily: fontFamily.semibold, fontSize: 16, letterSpacing: -0.2, lineHeight: 22 },
  body: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22 },
  bodyMed: { fontFamily: fontFamily.medium, fontSize: 15, lineHeight: 21 },
  label: { fontFamily: fontFamily.semibold, fontSize: 13, lineHeight: 17 },
  small: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 18 },
  tiny: { fontFamily: fontFamily.medium, fontSize: 11.5, lineHeight: 15, letterSpacing: 0.1 },
  overline: { fontFamily: fontFamily.semibold, fontSize: 11, letterSpacing: 0.4, lineHeight: 14 },
  metric: { fontFamily: fontFamily.extrabold, fontSize: 34, letterSpacing: -1, lineHeight: 38 },
} as const;

/** Soft, lifted cards — the original look leans on a gentle shadow, not borders. */
export const elevation = {
  card: { shadowColor: '#1A2A44', shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  raised: { shadowColor: '#1A2A44', shadowOpacity: 0.12, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 6 },
};

/** Device / reading status. Kept compatible with existing StatusKey usage. */
export type StatusKey = 'good' | 'watch' | 'warn' | 'act' | 'offline' | 'never';

export const statusMeta: Record<
  StatusKey,
  { label: string; color: string; soft: string; icon: string }
> = {
  good: { label: 'Online', color: colors.good, soft: colors.goodSoft, icon: 'check-circle' },
  watch: { label: 'Poor', color: colors.watch, soft: colors.watchSoft, icon: 'alert' },
  warn: { label: 'High', color: colors.warn, soft: colors.warnSoft, icon: 'alert' },
  act: { label: 'Severe', color: colors.act, soft: colors.actSoft, icon: 'alert-circle' },
  offline: { label: 'Offline', color: colors.offline, soft: colors.offlineSoft, icon: 'wifi-off' },
  never: { label: 'Never reported', color: colors.textSubtle, soft: colors.surfaceAlt, icon: 'help-circle-outline' },
};

/** Map an AQI value to a band (colour + word), mirroring the original app. */
export function aqiBand(aqi: number | null): { label: string; color: string; soft: string } {
  if (aqi == null) return { label: 'No data', color: colors.textSubtle, soft: colors.surfaceAlt };
  if (aqi <= 50) return { label: 'Good', color: colors.good, soft: colors.goodSoft };
  if (aqi <= 100) return { label: 'Satisfactory', color: '#86B817', soft: '#EEF5DC' };
  if (aqi <= 200) return { label: 'Moderate', color: colors.watch, soft: colors.watchSoft };
  if (aqi <= 300) return { label: 'Poor', color: colors.warn, soft: colors.warnSoft };
  if (aqi <= 400) return { label: 'Very poor', color: '#C2410C', soft: '#F6E2D6' };
  return { label: 'Severe', color: colors.act, soft: colors.actSoft };
}

/** Odour level 1..5 → colour. */
export function odourColor(level: number | null): string {
  if (level == null) return colors.textSubtle;
  if (level <= 1) return colors.good;
  if (level === 2) return '#86B817';
  if (level === 3) return colors.watch;
  if (level === 4) return colors.warn;
  return colors.act;
}

const fonts = configureFonts({ config: { fontFamily: fontFamily.medium } });

export const paperTheme = {
  ...MD3LightTheme,
  roundness: 3,
  fonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    onPrimary: colors.textInverse,
    primaryContainer: colors.primarySoft,
    onPrimaryContainer: colors.primaryDark,
    secondary: colors.primary,
    background: colors.bg,
    surface: colors.surface,
    surfaceVariant: colors.surfaceAlt,
    onSurface: colors.text,
    onSurfaceVariant: colors.textMuted,
    outline: colors.borderStrong,
    outlineVariant: colors.border,
    error: colors.act,
    elevation: {
      level0: 'transparent',
      level1: colors.surface,
      level2: colors.surface,
      level3: colors.surface,
      level4: colors.surface,
      level5: colors.surface,
    },
  },
};
