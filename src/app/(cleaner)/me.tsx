import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert as RNAlert, Pressable, StyleSheet, View } from 'react-native';
import { AppCard } from '@/components/AppCard';
import { Scaffold } from '@/components/Scaffold';
import { Txt } from '@/components/Txt';
import { useSession } from '@/context/session';
import { CLEANER } from '@/data/cleaner';
import { colors, radius, spacing } from '@/theme';

type Row = { icon: string; label: string; sub?: string; onPress?: () => void };

export default function CleanerMe() {
  const { signOut } = useSession();
  const soon = (w: string) => () => RNAlert.alert(w, 'Part of the prototype.');

  const rows: Row[] = [
    { icon: 'office-building-marker', label: CLEANER.buildings.length > 1 ? 'My buildings' : 'My building', sub: `${CLEANER.buildings.join(' · ')} · ${CLEANER.area}` },
    { icon: 'phone', label: 'My number', sub: CLEANER.phone },
    { icon: 'translate', label: 'Language', sub: 'English', onPress: soon('Language') },
    { icon: 'help-circle-outline', label: 'Help', onPress: soon('Help') },
  ];

  return (
    <Scaffold title="Me">
      <AppCard>
        <View style={styles.profile}>
          <View style={styles.avatar}><Txt variant="h1" color={colors.primary}>{CLEANER.name[0]}</Txt></View>
          <View style={{ flex: 1 }}>
            <Txt variant="h2">{CLEANER.name}</Txt>
            <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>Cleaner</Txt>
          </View>
          <Pressable style={styles.switchBtn} onPress={() => router.push('/switch-role')}>
            <MaterialCommunityIcons name="swap-horizontal" size={16} color={colors.primary} />
            <Txt variant="label" color={colors.primary}>Switch</Txt>
          </Pressable>
        </View>
      </AppCard>

      <AppCard padded={false} style={{ marginTop: spacing.lg }}>
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
      </AppCard>

      <Pressable style={styles.signOut} onPress={() => { signOut(); router.replace('/login'); }}>
        <MaterialCommunityIcons name="logout" size={18} color={colors.act} />
        <Txt variant="bodyMed" color={colors.act}>Sign out</Txt>
      </Pressable>
      <Txt variant="tiny" color={colors.textSubtle} style={{ textAlign: 'center', marginTop: spacing.lg }}>Agrim Suchak · Cleaner · v0.3</Txt>
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  profile: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 56, height: 56, borderRadius: 18, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  switchBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primarySoft, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  border: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { width: 38, height: 38, borderRadius: 11, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
  signOut: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.xl, paddingVertical: spacing.md, borderRadius: radius.md, backgroundColor: colors.actSoft },
});
