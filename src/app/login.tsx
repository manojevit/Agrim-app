import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppCard } from '@/components/AppCard';
import { Logo } from '@/components/Logo';
import { Txt } from '@/components/Txt';
import { useSession } from '@/context/session';
import { ROLES, ROLE_ORDER, homeRouteFor } from '@/data/roles';
import { RoleId } from '@/data/types';
import { colors, radius, spacing } from '@/theme';

export default function Login() {
  const insets = useSafeAreaInsets();
  const { signIn } = useSession();
  const [email, setEmail] = useState('operator@example.com');
  const [password, setPassword] = useState('password123');
  const [show, setShow] = useState(false);

  const open = (id: RoleId) => { signIn(id); router.replace(homeRouteFor(id)); };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + spacing.xxl, paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.brand}>
        <Logo size={66} />
        <Txt variant="display" style={{ marginTop: spacing.md }}>Agrim Suchak</Txt>
        <Txt variant="bodyMed" color={colors.textMuted}>Clean toilets, watched for you</Txt>
      </View>

      <AppCard style={{ marginTop: spacing.xl, gap: spacing.md }}>
        <TextInput
          mode="outlined"
          label="Email or phone"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          left={<TextInput.Icon icon="email-outline" />}
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
          style={{ backgroundColor: colors.surface }}
        />
        <Pressable style={{ alignSelf: 'flex-end' }}>
          <Txt variant="label" color={colors.primary}>Forgot password?</Txt>
        </Pressable>
        <Button mode="contained" onPress={() => open('facility')} contentStyle={{ height: 50 }} style={{ borderRadius: radius.md }} labelStyle={styles.btnLabel}>
          Sign in
        </Button>
        <Pressable style={{ alignSelf: 'center' }}>
          <Txt variant="label" color={colors.primary}>Use a one-time code instead</Txt>
        </Pressable>
      </AppCard>

      <View style={styles.previewHead}>
        <MaterialCommunityIcons name="eye-outline" size={15} color={colors.textMuted} />
        <Txt variant="overline" color={colors.textMuted}>PREVIEW AS A ROLE</Txt>
      </View>
      <Txt variant="small" color={colors.textSubtle} style={{ marginTop: 2 }}>
        Prototype shortcut — tap a role to see that person's screens.
      </Txt>

      <View style={styles.grid}>
        {ROLE_ORDER.map((id) => {
          const r = ROLES[id];
          return (
            <Pressable key={id} style={styles.roleCard} onPress={() => open(id)}>
              <View style={styles.roleBadge}><Txt variant="h3" color={colors.primary}>{r.short}</Txt></View>
              <Txt variant="bodyMed">{r.name}</Txt>
              <Txt variant="tiny" color={colors.textMuted} numberOfLines={2} style={{ lineHeight: 15 }}>{r.blurb}</Txt>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  brand: { alignItems: 'center' },
  btnLabel: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 15 },
  previewHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.xxl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  roleCard: { width: '48.5%', backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.md, gap: 3 },
  roleBadge: { width: 34, height: 34, borderRadius: 10, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs },
});
