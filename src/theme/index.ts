/**
 * Agrim Suchak — design system (v0.2, built on React Native Paper / Material 3).
 * Intentional palette + Plus Jakarta Sans so it reads as a crafted product,
 * not a default template. Colour carries meaning: it is used only for status.
 */
import { MD3LightTheme, configureFonts } from 'react-native-paper';

export const colors = {
  // Surfaces — cool, faintly teal paper
  bg: '#F2F6F7',
  surface: '#FFFFFF',
  surfaceAlt: '#E9F1F2',
  surfaceSunken: '#E1EBEC',
  border: '#DDE8EA',
  borderStrong: '#C8D8DB',

  // Text — deep teal-charcoal, never pure black
  text: '#132421',
  textMuted: '#51626A',
  textSubtle: '#88999F',
  textInverse: '#FFFFFF',

  // Brand — deep teal (water / clean / health)
  primary: '#0E7490',
  primaryDark: '#0B5A72',
  primarySoft: '#D6EDF3',
  primaryTint: '#ECF6F9',

  // Status — the one scale everyone learns (kept apart from the teal brand)
  good: '#16A34A',
  goodSoft: '#E1F5E9',
  watch: '#D98A0B',
  watchSoft: '#FBEED6',
  act: '#E23D3D',
  actSoft: '#FBE4E4',
  offline: '#5B6B72',
  offlineSoft: '#E7EEEF',

  // Warm accent (occasional highlight), complementary to teal
  accent: '#E2663D',
  accentSoft: '#FBE7DD',
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
    shadowColor: '#06333C',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  raised: {
    shadowColor: '#06333C',
    shadowOpacity: 0.11,
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
