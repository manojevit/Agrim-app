import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Txt } from './Txt';
import { colors, radius, spacing } from '@/theme';

/** The indigo header band — the brand's visual anchor, shared across the field apps. */
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
  return (
    <View style={[styles.band, { paddingTop: insets.top + spacing.md }]}>
      <View style={styles.topRow}>
        {back && (
          <Pressable onPress={() => router.back()} hitSlop={12} style={styles.back}>
            <MaterialCommunityIcons name="chevron-left" size={26} color="#FFFFFF" />
          </Pressable>
        )}
        <View style={{ flex: 1 }}>
          {title ? <Txt variant="h1" color="#FFFFFF">{title}</Txt> : null}
          {subtitle ? <Txt variant="small" color="rgba(255,255,255,0.72)" style={{ marginTop: 2 }}>{subtitle}</Txt> : null}
        </View>
        {right}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  band: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  back: { marginLeft: -spacing.sm },
});
