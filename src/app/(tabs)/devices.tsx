import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DeviceRow } from '@/components/DeviceRow';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { DEVICES } from '@/data/devices';
import { colors, radius, spacing } from '@/theme';
import { boundedContent, useResponsive } from '@/theme/responsive';

export default function Devices() {
  const insets = useSafeAreaInsets();
  const { t } = useLang();
  const r = useResponsive();
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return DEVICES;
    return DEVICES.filter((d) => d.serial.toLowerCase().includes(s) || (d.label ?? '').toLowerCase().includes(s));
  }, [q]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm, paddingHorizontal: r.gutter }]}>
        <Txt variant="h1" style={{ flex: 1 }}>{t('dev.title')}</Txt>
        <Pressable hitSlop={10} onPress={() => router.push('/search')}><MaterialCommunityIcons name="magnify" size={24} color={colors.text} /></Pressable>
        <Pressable hitSlop={10} onPress={() => router.push('/(tabs)/alerts')} style={{ marginLeft: spacing.md }}><MaterialCommunityIcons name="bell-outline" size={23} color={colors.text} /></Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={boundedContent(r)} keyboardShouldPersistTaps="handled">
        <View style={styles.searchRow}>
          <View style={styles.search}>
            <MaterialCommunityIcons name="magnify" size={19} color={colors.textSubtle} />
            <TextInput value={q} onChangeText={setQ} placeholder={t('dev.searchToilets')} placeholderTextColor={colors.textSubtle} style={styles.input} />
          </View>
          <View style={styles.filter}><MaterialCommunityIcons name="filter-variant" size={20} color={colors.text} /></View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.addBtn} onPress={() => router.push('/add-device')}>
            <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
            <Txt variant="label" color="#FFFFFF">{t('dev.add')}</Txt>
          </Pressable>
          <Pressable style={styles.scanBtn} onPress={() => router.push('/scan-qr')}>
            <MaterialCommunityIcons name="qrcode-scan" size={18} color={colors.text} />
            <Txt variant="label">{t('dev.scan')}</Txt>
          </Pressable>
        </View>

        {list.map((d) => <DeviceRow key={d.serial} device={d} mode="list" />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  searchRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm, marginBottom: spacing.md },
  search: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md, height: 48 },
  input: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 15, color: colors.text, padding: 0 },
  filter: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  actions: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  addBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.primary, borderRadius: radius.md, height: 48 },
  scanBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radius.md, height: 48, paddingHorizontal: spacing.lg },
});
