/**
 * Agrim Suchak — design system (v0.2, built on React Native Paper / Material 3).
 * Intentional palette + Plus Jakarta Sans so it reads as a crafted product,
 * not a default template. Colour carries meaning: it is used only for status.
 */
import { MD3LightTheme, configureFonts } from 'react-native-paper';

export const colors = {
  // Surfaces — soft, slightly cool paper
  bg: '#F4F5F9',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF0F7',
  surfaceSunken: '#E9ECF4',
  border: '#E3E7F0',
  borderStrong: '#D2D8E6',

  // Text
  text: '#14171F',
  textMuted: '#59616F',
  textSubtle: '#8A92A1',
  textInverse: '#FFFFFF',

  // Brand — deep, confident indigo-blue (not generic flat blue)
  primary: '#2743C4',
  primaryDark: '#1C3196',
  primarySoft: '#E7EAFB',
  primaryTint: '#F2F4FD',

  // Status — the one scale everyone learns
  good: '#0E9F6E',
  goodSoft: '#E1F5EC',
  watch: '#C07A05',
  watchSoft: '#FBEFD6',
  act: '#DC2F3A',
  actSoft: '#FBE4E6',
  offline: '#5B6472',
  offlineSoft: '#EAEDF2',

  accent: '#6D4AFF',
  accentSoft: '#ECE6FF',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, xxxl: 40 } as const;
export const radius = { sm: 10, md: 12, lg: 16, xl: 20, xxl: 26, pill: 999 } as const;

/** Font families from @expo-google-fonts/plus-jakarta-sans. */
export const fontFamily = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const;

export const typeScale = {
  display: { fontFamily: fontFamily.extrabold, fontSize: 30, letterSpacing: -0.6, lineHeight: 36 },
  h1: { fontFamily: fontFamily.extrabold, fontSize: 24, letterSpacing: -0.4, lineHeight: 29 },
  h2: { fontFamily: fontFamily.bold, fontSize: 19, letterSpacing: -0.2, lineHeight: 24 },
  h3: { fontFamily: fontFamily.bold, fontSize: 16, letterSpacing: -0.1, lineHeight: 21 },
  body: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 21 },
  bodyMed: { fontFamily: fontFamily.medium, fontSize: 15, lineHeight: 21 },
  label: { fontFamily: fontFamily.semibold, fontSize: 13, lineHeight: 17 },
  small: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 18 },
  tiny: { fontFamily: fontFamily.medium, fontSize: 11, lineHeight: 15, letterSpacing: 0.2 },
  overline: { fontFamily: fontFamily.bold, fontSize: 11, letterSpacing: 1, lineHeight: 14 },
} as const;

export const elevation = {
  card: {
    shadowColor: '#0B1437',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  raised: {
    shadowColor: '#0B1437',
    shadowOpacity: 0.1,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
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

/** Paper MD3 theme, re-skinned with the brand + Plus Jakarta Sans. */
const fonts = configureFonts({
  config: {
    // default family for all Paper components (buttons, chips, lists…)
    fontFamily: fontFamily.medium,
  },
});

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
    outline: colors.border,
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
