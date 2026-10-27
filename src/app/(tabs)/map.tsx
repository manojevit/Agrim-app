import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppCard } from '@/components/AppCard';
import { MapPreview } from '@/components/MapPreview';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { DEVICES } from '@/data/devices';
import { colors, spacing } from '@/theme';

export default function MapTab() {
  const insets = useSafeAreaInsets();
  const { t } = useLang();
  const shown = DEVICES.filter((d) => d.online).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Txt variant="h1" style={{ flex: 1 }}>{t('map.title')}</Txt>
        <MaterialCommunityIcons name="bell-outline" size={23} color={colors.text} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 110 }}>
        <MapPreview height={320} />
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{t('map.onMap', { shown, total: DEVICES.length })}</Txt>

        <Txt variant="h2" style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>{t('map.units')}</Txt>
        {DEVICES.map((d) => (
          <AppCard key={d.serial} onPress={() => router.push(`/device/${d.serial}`)} padded={false} style={styles.row}>
            <View style={[styles.dot, { backgroundColor: d.online ? colors.good : colors.offline }]} />
            <View style={{ flex: 1 }}>
              <Txt variant="h3">{d.serial}</Txt>
              <Txt variant="small" color={colors.textMuted}>{d.online ? t('st.online') : t('st.offline')}</Txt>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSubtle} />
          </AppCard>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  dot: { width: 11, height: 11, borderRadius: 6 },
});
