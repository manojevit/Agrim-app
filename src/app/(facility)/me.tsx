import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert as RNAlert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { useSession } from '@/context/session';
import { FACILITY } from '@/data/facility';
import { colors, radius, spacing } from '@/theme';

type Row = { icon: string; label: string; sub?: string; onPress?: () => void };

export default function FacilityMe() {
  const { signOut } = useSession();
  const { t, lang, setLang } = useLang();
  const pickLanguage = () =>
    RNAlert.alert(t('me.pickLanguage'), undefined, [
      { text: 'English', onPress: () => setLang('en') },
      { text: 'हिन्दी', onPress: () => setLang('hi') },
    ]);

  const rows: Row[] = [
    { icon: 'account-edit', label: t('c.editProfile'), onPress: () => router.push('/edit-profile') },
    { icon: 'office-building-marker', label: t('f.myBuilding'), sub: `${FACILITY.building}, ${FACILITY.area}` },
    { icon: 'phone', label: t('f.myNumber'), sub: FACILITY.phone },
    { icon: 'account-group', label: t('f.staffCalls'), sub: t('f.whoToRing'), onPress: () => router.push('/staff') },
    { icon: 'map', label: t('c.map'), onPress: () => router.push('/map') },
    { icon: 'translate', label: t('me.language'), sub: lang === 'hi' ? 'हिन्दी' : 'English', onPress: pickLanguage },
    { icon: 'bell-outline', label: t('c.notifications'), onPress: () => router.push('/notifications') },
    { icon: 'help-circle-outline', label: t('c.help'), onPress: () => RNAlert.alert(t('c.help')) },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader title={t('tab.me')}>
        <View style={styles.profile}>
          <View style={styles.avatar}><Txt variant="display" color={colors.primary}>{FACILITY.name[0]}</Txt></View>
          <View style={{ flex: 1 }}>
            <Txt variant="h2" color="#FFFFFF">{FACILITY.name}</Txt>
            <Txt variant="small" color="rgba(255,255,255,0.72)" style={{ marginTop: 2 }}>{t('f.op')}</Txt>
          </View>
          <Pressable style={styles.switch} onPress={() => router.push('/switch-role')}>
            <MaterialCommunityIcons name="swap-horizontal" size={16} color="#FFFFFF" />
            <Txt variant="tiny" color="#FFFFFF">{t('common.switch')}</Txt>
          </Pressable>
        </View>
      </AppHeader>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        <View style={styles.group}>
          {rows.map((r, i) => (
            <Pressable key={r.label} onPress={r.onPress} style={({ pressed }) => [styles.row, i < rows.length - 1 && styles.border, pressed && { backgroundColor: colors.surfaceAlt }]}>
              <View style={styles.rowIcon}><MaterialCommunityIcons name={r.icon as any} size={19} color={colors.primary} /></View>
              <View style={{ flex: 1 }}>
                <Txt variant="bodyMed">{r.label}</Txt>
                {r.sub ? <Txt variant="tiny" color={colors.textMuted} style={{ marginTop: 1 }}>{r.sub}</Txt> : null}
              </View>
              {r.onPress ? <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} /> : null}
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.signOut} onPress={() => { signOut(); router.replace('/login'); }}>
          <MaterialCommunityIcons name="logout" size={18} color={colors.act} />
          <Txt variant="bodyMed" color={colors.act}>{t('c.signOut')}</Txt>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.lg },
  avatar: { width: 60, height: 60, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  switch: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: 'rgba(255,255,255,0.16)', borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  group: { backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  border: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
  signOut: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.xl, paddingVertical: spacing.md, borderRadius: radius.md, backgroundColor: colors.actSoft },
});
