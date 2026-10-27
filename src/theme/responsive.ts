import { useWindowDimensions } from 'react-native';

/**
 * One place that answers "how big is this screen?" so every screen reads the
 * same. Phones stay full-width; on tablets, foldables and the web the content
 * is capped and centred instead of stretching edge to edge.
 */
export interface Responsive {
  width: number;
  height: number;
  /** ≥ 600dp: tablet / large foldable / web. */
  isTablet: boolean;
  /** ≥ 1024dp: desktop-width web. */
  isLarge: boolean;
  /** Side gutter for the current width. */
  gutter: number;
  /** Max width the reading column is allowed to grow to. */
  maxContent: number;
  /** Columns a card grid should use at this width. */
  gridCols: number;
}

export function useResponsive(): Responsive {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 600;
  const isLarge = width >= 1024;
  return {
    width,
    height,
    isTablet,
    isLarge,
    gutter: isTablet ? 24 : 16,
    // Keep lines and cards readable: a phone-like column, centred on big screens.
    maxContent: isLarge ? 720 : isTablet ? 620 : width,
    gridCols: isTablet ? 4 : 2,
  };
}

/**
 * Style for a scroll view's contentContainer that centres the column and caps
 * its width on large screens. Spread into contentContainerStyle.
 */
export function boundedContent(r: Responsive, paddingBottom = 110) {
  return {
    paddingHorizontal: r.gutter,
    paddingBottom,
    width: '100%' as const,
    maxWidth: r.maxContent,
    alignSelf: 'center' as const,
  };
}
