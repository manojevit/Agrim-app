import { router } from 'expo-router';
import { useState } from 'react';
import { Alert as RNAlert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { useSession } from '@/context/session';
import { personForRole } from '@/data/roles';
import { colors, radius, spacing } from '@/theme';

export default function EditProfile() {
  const { t } = useLang();
  const { role } = useSession();
  const person = role ? personForRole(role.id) : null;
  const [name, setName] = useState(person?.name ?? '');
  const [phone, setPhone] = useState('+91 90042 11880');
  const email = person?.email ?? 'user@example.com';

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={t('c.editProfile')} subtitle={t('ep.sub')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl, width: '100%', maxWidth: 620, alignSelf: 'center' }}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}><Txt variant="display" color={colors.primary}>{(name || 'U')[0]}</Txt></View>
        </View>

        <View style={{ gap: spacing.md }}>
          <TextInput mode="outlined" label={t('ep.name')} value={name} onChangeText={setName} left={<TextInput.Icon icon="account-outline" />} outlineStyle={{ borderRadius: radius.md }} style={{ backgroundColor: colors.surface }} />
          <TextInput mode="outlined" label={t('ep.phone')} value={phone} onChangeText={setPhone} keyboardType="phone-pad" left={<TextInput.Icon icon="phone-outline" />} outlineStyle={{ borderRadius: radius.md }} style={{ backgroundColor: colors.surface }} />
          <TextInput mode="outlined" label={t('ep.email')} value={email} editable={false} left={<TextInput.Icon icon="email-outline" />} outlineStyle={{ borderRadius: radius.md }} style={{ backgroundColor: colors.surfaceAlt }} />
          <TextInput mode="outlined" label={t('ep.role')} value={role ? `${role.name} · ${role.area}` : ''} editable={false} left={<TextInput.Icon icon="shield-account-outline" />} outlineStyle={{ borderRadius: radius.md }} style={{ backgroundColor: colors.surfaceAlt }} />
          <Txt variant="tiny" color={colors.textSubtle}>{t('ep.roleNote')}</Txt>
        </View>

        <Button mode="contained" icon="content-save" style={styles.save} contentStyle={{ height: 50 }} labelStyle={styles.btnLabel} onPress={() => { RNAlert.alert(t('ep.saved')); router.back(); }}>
          {t('c.save')}
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarWrap: { alignItems: 'center', marginBottom: spacing.xl },
  avatar: { width: 84, height: 84, borderRadius: 28, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  save: { borderRadius: radius.md, marginTop: spacing.xl },
  btnLabel: { fontFamily: 'Inter_700Bold', fontSize: 15 },
});
