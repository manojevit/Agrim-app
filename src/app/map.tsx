import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { StatusDot } from '@/components/StatusChip';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { TOILETS } from '@/data/toilets';
import { colors, radius, spacing, statusMeta } from '@/theme';

// Decorative pin positions (percentages) for the stylised map.
const PINS = [
  { top: '28%', left: '30%', status: 'act' },
  { top: '42%', left: '58%', status: 'act' },
  { top: '60%', left: '38%', status: 'watch' },
  { top: '35%', left: '72%', status: 'good' },
  { top: '66%', left: '66%', status: 'offline' },
] as const;

export default function MapScreen() {
  const { t, lang } = useLang();
  const units = TOILETS.filter((x) => x.status !== 'never');

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={t('c.map')} subtitle={t('map.sub')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        {/* Stylised map */}
        <View style={styles.map}>
          <View style={styles.road1} />
          <View style={styles.road2} />
          <View style={styles.park} />
          {PINS.map((p, i) => (
            <View key={i} style={[styles.pin, { top: p.top as any, left: p.left as any, backgroundColor: statusMeta[p.status].color }]}>
              <MaterialCommunityIcons name="map-marker" size={18} color="#FFFFFF" />
            </View>
          ))}
          <View style={styles.youAre}>
            <View style={styles.youDot} />
          </View>
        </View>
        <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: spacing.sm }}>{t('map.note')}</Txt>

        <Txt variant="h3" style={{ marginTop: spacing.xl, marginBottom: spacing.sm }}>{t('map.unitsHere')}</Txt>
        {units.map((x) => (
          <View key={x.id} style={styles.row}>
            <StatusDot status={x.status} size={11} />
            <View style={{ flex: 1 }}>
              <Txt variant="bodyMed">{lang === 'hi' ? x.nameHi : x.name}</Txt>
              <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 1 }}>{x.block}</Txt>
            </View>
            <Txt variant="tiny" color={statusMeta[x.status].color} style={{ marginRight: spacing.xs }}>{t(`st.${x.status}`)}</Txt>
            <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textSubtle} onPress={() => router.push(`/facility-toilet/${x.id}`)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { height: 240, borderRadius: radius.xl, backgroundColor: colors.surfaceAlt, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  road1: { position: 'absolute', top: '45%', left: 0, right: 0, height: 10, backgroundColor: '#FFFFFF' },
  road2: { position: 'absolute', top: 0, bottom: 0, left: '52%', width: 10, backgroundColor: '#FFFFFF' },
  park: { position: 'absolute', top: '10%', left: '8%', width: 90, height: 70, borderRadius: 16, backgroundColor: '#D4E9DA' },
  pin: { position: 'absolute', width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFFFFF' },
  youAre: { position: 'absolute', bottom: '12%', left: '18%', width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(21,24,29,0.14)', alignItems: 'center', justifyContent: 'center' },
  youDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary, borderWidth: 2, borderColor: '#FFFFFF' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginBottom: spacing.sm },
});
