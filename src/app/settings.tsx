import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert as RNAlert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { colors, radius, spacing } from '@/theme';

export default function Settings() {
  const { t, lang, setLang } = useLang();
  const rows = [
    { icon: 'bell-outline', label: t('menu.notifications'), onPress: () => router.push('/notifications') },
    { icon: 'translate', label: lang === 'hi' ? 'भाषा · हिन्दी' : 'Language · English', onPress: () => setLang(lang === 'hi' ? 'en' : 'hi') },
    { icon: 'information-outline', label: t('menu.about'), onPress: () => RNAlert.alert('Agrim Suchak', 'Prototype') },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={t('menu.settings')} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxxl, width: '100%', maxWidth: 620, alignSelf: 'center' }}>
        <View style={styles.group}>
          {rows.map((r, i) => (
            <Pressable key={r.label} onPress={r.onPress} style={({ pressed }) => [styles.row, i < rows.length - 1 && styles.border, pressed && { backgroundColor: colors.surfaceAlt }]}>
              <MaterialCommunityIcons name={r.icon as any} size={21} color={colors.primary} />
              <Txt variant="bodyMed" style={{ flex: 1 }}>{r.label}</Txt>
              <MaterialCommunityIcons name="chevron-right" size={21} color={colors.textSubtle} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  group: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: 15, paddingHorizontal: spacing.lg },
  border: { borderBottomWidth: 1, borderBottomColor: colors.border },
});
