import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Txt } from './Txt';
import { colors, spacing } from '@/theme';

/** A screen with a clean title area and scrollable, gutter-padded body. */
export function Scaffold({
  title,
  subtitle,
  back,
  right,
  children,
  scroll = true,
}: {
  title?: string;
  subtitle?: string;
  back?: boolean;
  right?: React.ReactNode;
  children: React.ReactNode;
  scroll?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const inner = (
    <View style={{ paddingTop: insets.top + spacing.md, paddingHorizontal: spacing.lg }}>
      {(title || back) && (
        <View style={styles.header}>
          {back && (
            <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backBtn}>
              <MaterialCommunityIcons name="chevron-left" size={28} color={colors.text} />
            </Pressable>
          )}
          <View style={{ flex: 1 }}>
            {title ? <Txt variant="h1">{title}</Txt> : null}
            {subtitle ? <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{subtitle}</Txt> : null}
          </View>
          {right}
        </View>
      )}
      {children}
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {scroll ? (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxxl }}>
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.lg },
  backBtn: { marginLeft: -spacing.sm },
});
