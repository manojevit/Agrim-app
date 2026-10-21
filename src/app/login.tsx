import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Logo } from '@/components/Logo';
import { Txt } from '@/components/Txt';
import { useSession } from '@/context/session';
import { homeRouteFor, roleFromEmail } from '@/data/roles';
import { colors, radius, spacing } from '@/theme';

export default function Login() {
  const insets = useSafeAreaInsets();
  const { signIn } = useSession();
  const [email, setEmail] = useState('operator@example.com');
  const [password, setPassword] = useState('password123');
  const [show, setShow] = useState(false);

  const signInNow = () => {
    const role = roleFromEmail(email);
    signIn(role);
    router.replace(homeRouteFor(role));
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top + spacing.xxxl, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.brand}>
        <Logo size={72} />
        <Txt variant="display" style={{ marginTop: spacing.lg }}>Agrim Suchak</Txt>
        <Txt variant="bodyMed" color={colors.textMuted} style={{ marginTop: spacing.xs }}>Clean toilets, watched for you</Txt>
      </View>

      <View style={styles.card}>
        <Txt variant="h2">Sign in</Txt>
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2, marginBottom: spacing.lg }}>Use the account your supervisor gave you.</Txt>

        <TextInput
          mode="outlined"
          label="Email or phone"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          left={<TextInput.Icon icon="account-outline" />}
          outlineStyle={{ borderRadius: radius.md }}
          style={{ backgroundColor: colors.surface }}
        />
        <TextInput
          mode="outlined"
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!show}
          left={<TextInput.Icon icon="lock-outline" />}
          right={<TextInput.Icon icon={show ? 'eye-off' : 'eye'} onPress={() => setShow((s) => !s)} />}
          outlineStyle={{ borderRadius: radius.md }}
          style={{ backgroundColor: colors.surface, marginTop: spacing.md }}
        />
        <Pressable style={{ alignSelf: 'flex-end', marginTop: spacing.sm }}>
          <Txt variant="label" color={colors.primary}>Forgot password?</Txt>
        </Pressable>

        <Button mode="contained" onPress={signInNow} contentStyle={{ height: 52 }} style={{ borderRadius: radius.md, marginTop: spacing.md }} labelStyle={styles.btnLabel}>
          Sign in
        </Button>
        <Pressable style={{ alignSelf: 'center', marginTop: spacing.lg }}>
          <Txt variant="label" color={colors.primary}>Sign in with a one-time code</Txt>
        </Pressable>
      </View>

      <Txt variant="tiny" color={colors.textSubtle} style={{ textAlign: 'center', marginTop: 'auto', paddingTop: spacing.xl }}>
        Having trouble? Ask your supervisor to check your account.
      </Txt>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  brand: { alignItems: 'center' },
  card: { backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.xl, marginTop: spacing.xxl },
  btnLabel: { fontFamily: 'Inter_700Bold', fontSize: 16 },
});
