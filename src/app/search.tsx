import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { DeviceRow } from '@/components/DeviceRow';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { DEVICES, blockById } from '@/data/devices';
import { colors, radius, spacing } from '@/theme';

export default function Search() {
  const { t } = useLang();
  const [q, setQ] = useState('');

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return DEVICES.filter((d) => {
      const b = blockById(d.blockId);
      return d.serial.toLowerCase().includes(s) || (b?.name ?? '').toLowerCase().includes(s) || (b?.area ?? '').toLowerCase().includes(s);
    });
  }, [q]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={t('search.title')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxxl, width: '100%', maxWidth: 620, alignSelf: 'center' }} keyboardShouldPersistTaps="handled">
        <View style={styles.search}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.textSubtle} />
          <TextInput autoFocus value={q} onChangeText={setQ} placeholder={t('search.placeholder')} placeholderTextColor={colors.textSubtle} style={styles.input} />
        </View>

        {q.trim().length > 0 && (
          <>
            <Txt variant="small" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{t('search.results')}</Txt>
            {results.length ? results.map((d) => <DeviceRow key={d.serial} device={d} mode="list" />)
              : <Txt variant="small" color={colors.textSubtle} style={{ textAlign: 'center', marginTop: spacing.lg }}>{t('search.empty')}</Txt>}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  search: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md, height: 50, marginBottom: spacing.lg },
  input: { flex: 1, fontFamily: 'Inter_400Regular', fontSize: 16, color: colors.text, padding: 0 },
});
