import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert as RNAlert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { useSession } from '@/context/session';
import { colors, radius, spacing } from '@/theme';

type Row = { icon: string; label: string; onPress?: () => void; sub?: string };

export default function Menu() {
  const insets = useSafeAreaInsets();
  const { role, signOut } = useSession();
  const { t, lang, setLang } = useLang();
  const roleName = role ? t('role.' + role.id) : '';

  const pickLanguage = () =>
    RNAlert.alert(t('menu.settings'), undefined, [
      { text: 'English', onPress: () => setLang('en') },
      { text: 'हिन्दी', onPress: () => setLang('hi') },
    ]);

  const rows: Row[] = [
    { icon: 'account-edit-outline', label: t('menu.editProfile'), onPress: () => router.push('/edit-profile') },
    { icon: 'lock-outline', label: t('menu.changePassword'), onPress: () => RNAlert.alert(t('menu.changePassword')) },
    { icon: 'bell-outline', label: t('menu.notifications'), onPress: () => router.push('/notifications') },
    { icon: 'microphone-message', label: t('menu.aiCredits'), onPress: () => router.push('/ai-credits') },
    { icon: 'translate', label: lang === 'hi' ? 'भाषा · हिन्दी' : 'Language · English', onPress: pickLanguage },
    { icon: 'cog-outline', label: t('menu.settings'), onPress: () => router.push('/settings') },
    { icon: 'help-circle-outline', label: t('menu.help'), onPress: () => RNAlert.alert(t('menu.help')) },
    { icon: 'information-outline', label: t('menu.about'), onPress: () => RNAlert.alert('Agrim Suchak', 'Prototype') },
    { icon: 'account-switch-outline', label: t('menu.switchRole'), onPress: () => router.push('/switch-role') },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <Txt variant="h1">{t('menu.title')}</Txt>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 110 }}>
        <View style={styles.profile}>
          <View style={styles.avatar}><MaterialCommunityIcons name="account" size={30} color={colors.primary} /></View>
          <View style={{ flex: 1 }}>
            <Txt variant="h2">Dev User One</Txt>
            <Txt variant="small" color={colors.textMuted} numberOfLines={2} style={{ marginTop: 2 }}>
              user1@example.com · {roleName} · {role?.area}
            </Txt>
          </View>
        </View>

        <View style={styles.group}>
          {rows.map((r, i) => (
            <Pressable key={r.label} onPress={r.onPress} style={({ pressed }) => [styles.row, i < rows.length - 1 && styles.border, pressed && { backgroundColor: colors.surfaceAlt }]}>
              <MaterialCommunityIcons name={r.icon as any} size={21} color={colors.primary} />
              <Txt variant="bodyMed" style={{ flex: 1 }}>{r.label}</Txt>
              <MaterialCommunityIcons name="chevron-right" size={21} color={colors.textSubtle} />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.signOut} onPress={() => { signOut(); router.replace('/login'); }}>
          <Txt variant="label" color={colors.act}>{t('menu.signOut')}</Txt>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  profile: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border },
  avatar: { width: 54, height: 54, borderRadius: 27, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  group: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: 15, paddingHorizontal: spacing.lg },
  border: { borderBottomWidth: 1, borderBottomColor: colors.border },
  signOut: { marginTop: spacing.lg, borderWidth: 1.4, borderColor: colors.act, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: 'center' },
});
