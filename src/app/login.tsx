import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { useSession } from '@/context/session';
import { homeRouteFor, roleFromEmail } from '@/data/roles';
import { RoleId } from '@/data/types';
import { colors, radius, spacing } from '@/theme';
import { useResponsive } from '@/theme/responsive';

export default function Login() {
  const insets = useSafeAreaInsets();
  const { signIn } = useSession();
  const { t, lang, setLang } = useLang();
  const r = useResponsive();
  const [email, setEmail] = useState('facility@example.com');
  const [password, setPassword] = useState('password123');
  const [show, setShow] = useState(false);

  const signInNow = () => {
    const role = roleFromEmail(email);
    signIn(role);
    router.replace(homeRouteFor(role));
  };

  const signInAs = (role: RoleId) => {
    signIn(role);
    router.replace(homeRouteFor(role));
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top + spacing.xxl, paddingHorizontal: r.gutter, paddingBottom: spacing.xxl, width: '100%', maxWidth: 460, alignSelf: 'center' }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Pressable style={styles.lang} onPress={() => setLang(lang === 'hi' ? 'en' : 'hi')}>
        <MaterialCommunityIcons name="translate" size={15} color={colors.primary} />
        <Txt variant="label" color={colors.primary}>{lang === 'hi' ? 'English' : 'हिन्दी'}</Txt>
      </Pressable>

      <View style={styles.brand}>
        <View style={styles.logo}>
          <MaterialCommunityIcons name="shield-check" size={34} color={colors.primary} />
        </View>
        <Txt variant="display" style={{ marginTop: spacing.lg }}>{t('login.welcome')}</Txt>
        <Txt variant="bodyMed" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t('login.sub')}</Txt>
      </View>

      <View style={styles.card}>
        <TextInput
          mode="outlined"
          label={t('login.email')}
          placeholder={t('login.emailHint')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          outlineStyle={{ borderRadius: radius.md }}
          style={{ backgroundColor: colors.surface }}
        />
        <TextInput
          mode="outlined"
          label={t('login.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!show}
          right={<TextInput.Icon icon={show ? 'eye-off' : 'eye'} onPress={() => setShow((s) => !s)} />}
          outlineColor={colors.border}
          activeOutlineColor={colors.primary}
          outlineStyle={{ borderRadius: radius.md }}
          style={{ backgroundColor: colors.surface, marginTop: spacing.md }}
        />
        <Pressable style={{ alignSelf: 'flex-end', marginTop: spacing.md }}>
          <Txt variant="label" color={colors.primary}>{t('login.forgot')}</Txt>
        </Pressable>

        <Button mode="contained" onPress={signInNow} contentStyle={{ height: 52 }} style={{ borderRadius: radius.md, marginTop: spacing.md }} labelStyle={styles.btnLabel}>
          {t('login.signIn')}
        </Button>
        <Pressable style={{ alignSelf: 'center', marginTop: spacing.lg }} onPress={signInNow}>
          <Txt variant="label" color={colors.primary}>{t('login.otp')}</Txt>
        </Pressable>
      </View>

      <View style={styles.quick}>
        <Txt variant="small" color={colors.textSubtle} style={{ textAlign: 'center', marginBottom: spacing.sm }}>{t('login.as')}</Txt>
        <View style={styles.quickRow}>
          {(['facility', 'block', 'central'] as RoleId[]).map((id) => (
            <Pressable key={id} style={styles.quickChip} onPress={() => signInAs(id)}>
              <Txt variant="label" color={colors.primary}>{id === 'central' ? t('login.asAdmin') : t('role.' + id)}</Txt>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.foot}>
        <Txt variant="small" color={colors.textMuted}>{t('login.new')} </Txt>
        <Pressable onPress={signInNow}><Txt variant="label" color={colors.primary}>{t('login.create')}</Txt></Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lang: { alignSelf: 'flex-end', flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: spacing.xs },
  brand: { alignItems: 'center', marginTop: spacing.lg },
  logo: { width: 76, height: 76, borderRadius: 22, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.xl, marginTop: spacing.xxl, shadowColor: '#1A2A44', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 2 },
  btnLabel: { fontFamily: 'Inter_700Bold', fontSize: 16 },
  quick: { marginTop: spacing.xl },
  quickRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: spacing.sm },
  quickChip: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 8 },
  foot: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 'auto', paddingTop: spacing.xl },
});
