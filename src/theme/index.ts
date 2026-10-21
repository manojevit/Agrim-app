/**
 * Agrim Suchak — design system (v0.5, "minimal & light").
 * White/light surfaces, charcoal ink, flat hairline cards (no colour bands,
 * minimal shadow). One interactive colour = ink. Colour is reserved for status.
 * Typeface: Inter.
 */
import { MD3LightTheme, configureFonts } from 'react-native-paper';

export const colors = {
  // Surfaces
  bg: '#F7F8FA',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F2F5',
  surfaceSunken: '#EAEBEF',
  border: '#EAEBEF', // hairline
  borderStrong: '#DCDEE4',

  // Text (ink)
  text: '#15171C',
  textMuted: '#5E636E',
  textSubtle: '#9BA1AC',
  textInverse: '#FFFFFF',

  // Interactive = ink (the single accent). Colour used sparingly.
  primary: '#17181D',
  primaryDark: '#000000',
  primarySoft: '#EEEFF2',
  primaryTint: '#F4F5F7',

  // Status — the only hues; used only to signal state
  good: '#15924E',
  goodSoft: '#E6F4EC',
  watch: '#B4780A',
  watchSoft: '#F7EFDA',
  act: '#D5333A',
  actSoft: '#FBE7E8',
  offline: '#6B7280',
  offlineSoft: '#EEF0F2',

  accent: '#17181D',
  accentSoft: '#EEEFF2',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 40 } as const;
export const radius = { sm: 8, md: 10, lg: 14, xl: 16, xxl: 20, pill: 999 } as const;

export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
} as const;

export const typeScale = {
  display: { fontFamily: fontFamily.extrabold, fontSize: 28, letterSpacing: -0.6, lineHeight: 34 },
  h1: { fontFamily: fontFamily.bold, fontSize: 22, letterSpacing: -0.5, lineHeight: 28 },
  h2: { fontFamily: fontFamily.semibold, fontSize: 18, letterSpacing: -0.3, lineHeight: 24 },
  h3: { fontFamily: fontFamily.semibold, fontSize: 15.5, letterSpacing: -0.2, lineHeight: 21 },
  body: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 22 },
  bodyMed: { fontFamily: fontFamily.medium, fontSize: 15, lineHeight: 21 },
  label: { fontFamily: fontFamily.semibold, fontSize: 13, lineHeight: 17 },
  small: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 18 },
  tiny: { fontFamily: fontFamily.medium, fontSize: 11.5, lineHeight: 15, letterSpacing: 0.1 },
  overline: { fontFamily: fontFamily.semibold, fontSize: 11, letterSpacing: 0.6, lineHeight: 14 },
} as const;

/** Near-flat: minimal/no shadow — the look is carried by hairline borders. */
export const elevation = {
  card: { shadowColor: '#0B0C0F', shadowOpacity: 0.03, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 0 },
  raised: { shadowColor: '#0B0C0F', shadowOpacity: 0.08, shadowRadius: 14, shadowOffset: { width: 0, height: 8 }, elevation: 4 },
};

export type StatusKey = 'good' | 'watch' | 'act' | 'offline' | 'never';

export const statusMeta: Record<
  StatusKey,
  { label: string; color: string; soft: string; icon: string }
> = {
  good: { label: 'Good', color: colors.good, soft: colors.goodSoft, icon: 'check-circle' },
  watch: { label: 'Keep an eye', color: colors.watch, soft: colors.watchSoft, icon: 'eye-outline' },
  act: { label: 'Clean now', color: colors.act, soft: colors.actSoft, icon: 'alert-circle' },
  offline: { label: 'No signal', color: colors.offline, soft: colors.offlineSoft, icon: 'wifi-off' },
  never: { label: 'Not set up', color: colors.textSubtle, soft: colors.surfaceAlt, icon: 'help-circle-outline' },
};

const fonts = configureFonts({ config: { fontFamily: fontFamily.medium } });

export const paperTheme = {
  ...MD3LightTheme,
  roundness: 2,
  fonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    onPrimary: colors.textInverse,
    primaryContainer: colors.primarySoft,
    onPrimaryContainer: colors.text,
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
