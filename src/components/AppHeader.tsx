import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Txt } from './Txt';
import { colors, spacing } from '@/theme';
import { useResponsive } from '@/theme/responsive';

/** Light, minimal screen header — ink title on the page background, no colour band. */
export function AppHeader({
  title,
  subtitle,
  back,
  right,
  children,
}: {
  title?: string;
  subtitle?: string;
  back?: boolean;
  right?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const r = useResponsive();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + spacing.sm, paddingHorizontal: r.gutter }]}>
      <View style={{ width: '100%', maxWidth: r.maxContent, alignSelf: 'center' }}>
        <View style={styles.row}>
          {back && (
            <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
              <MaterialCommunityIcons name="chevron-left" size={26} color={colors.text} />
            </Pressable>
          )}
          <View style={{ flex: 1 }}>
            {title ? <Txt variant="h1">{title}</Txt> : null}
            {subtitle ? <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{subtitle}</Txt> : null}
          </View>
          {right}
        </View>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: colors.bg, paddingBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, minHeight: 40 },
  back: { marginLeft: -spacing.sm },
});
