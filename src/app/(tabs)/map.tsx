import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppCard } from '@/components/AppCard';
import { MapPreview } from '@/components/MapPreview';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { useSession } from '@/context/session';
import { DEVICES } from '@/data/devices';
import { aqiBand, colors, spacing } from '@/theme';
import { boundedContent, useResponsive } from '@/theme/responsive';

export default function MapTab() {
  const insets = useSafeAreaInsets();
  const { t } = useLang();
  const { role } = useSession();
  const r = useResponsive();
  const shown = DEVICES.filter((d) => d.online).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm, paddingHorizontal: r.gutter }]}>
        <Txt variant="h1" style={{ flex: 1 }}>{t('map.title')}</Txt>
        <Pressable hitSlop={10} onPress={() => router.push('/(tabs)/alerts')}>
          <MaterialCommunityIcons name="bell-outline" size={23} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={boundedContent(r)}>
        {role ? (
          <Txt variant="small" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>
            {t('map.scope', { area: role.area })}
          </Txt>
        ) : null}

        <MapPreview height={r.isTablet ? 420 : 320} />
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{t('map.onMap', { shown, total: DEVICES.length })}</Txt>

        {/* Legend so every role reads the pins the same way */}
        <View style={styles.legend}>
          <LegendDot color={colors.good} label={t('map.lgGood')} />
          <LegendDot color={aqiBand(250).color} label={t('map.lgPoor')} />
          <LegendDot color={colors.act} label={t('map.lgSevere')} />
          <LegendDot color={colors.offline} label={t('map.lgOffline')} />
        </View>
        <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: spacing.xs }}>{t('map.tapHint')}</Txt>

        <Txt variant="h2" style={{ marginTop: spacing.xl, marginBottom: spacing.sm }}>{t('map.units')}</Txt>
        {DEVICES.map((d) => (
          <AppCard key={d.serial} onPress={() => router.push(`/device/${d.serial}`)} padded={false} style={styles.row}>
            <View style={[styles.dot, { backgroundColor: d.online ? aqiBand(d.aqi).color : colors.offline }]} />
            <View style={{ flex: 1 }}>
              <Txt variant="h3">{d.serial}</Txt>
              <Txt variant="small" color={colors.textMuted}>
                {d.online ? `${t('st.online')} · AQI ${d.aqi}` : t('st.offline')}
              </Txt>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSubtle} />
          </AppCard>
        ))}
      </ScrollView>
    </View>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.lg}>
      <View style={[styles.lgDot, { backgroundColor: color }]} />
      <Txt variant="small" color={colors.textMuted}>{label}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingBottom: spacing.sm },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.md },
  lg: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  lgDot: { width: 10, height: 10, borderRadius: 5 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.sm },
  dot: { width: 11, height: 11, borderRadius: 6 },
});
