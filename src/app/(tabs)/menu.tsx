import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert as RNAlert, Pressable, StyleSheet, View } from 'react-native';
import { AppCard } from '@/components/AppCard';
import { Scaffold } from '@/components/Scaffold';
import { SectionHeader } from '@/components/SectionHeader';
import { Txt } from '@/components/Txt';
import { useSession } from '@/context/session';
import { colors, radius, spacing } from '@/theme';

type Item = { icon: string; label: string; sub?: string; onPress?: () => void };

export default function Menu() {
  const { role, signOut } = useSession();
  if (!role) return null;
  const soon = (w: string) => () => RNAlert.alert(w, 'Part of the prototype — the core flows are the ones to review first.');

  const general: Item[] = [
    { icon: 'account-edit', label: 'Edit profile', sub: role.area, onPress: soon('Edit profile') },
    { icon: 'bell-outline', label: 'Notification settings', sub: 'How alerts reach this phone', onPress: soon('Notification settings') },
  ];

  const operations: Item[] = [
    { icon: 'account-group', label: 'Cleaning staff & calls', sub: 'Who to ring for each building', onPress: () => router.push('/staff') },
  ];
  if (role.can.writeRules) operations.push({ icon: 'tune-variant', label: 'Alert rules', sub: 'When a toilet should alert', onPress: () => router.push('/rules') });
  if (role.can.reports) operations.push({ icon: 'file-chart-outline', label: 'Reports & exports', sub: 'Download what happened', onPress: () => router.push('/reports') });

  return (
    <Scaffold title="Menu">
      <AppCard>
        <View style={styles.profile}>
          <View style={styles.avatar}><Txt variant="h1" color={colors.primary}>{role.short}</Txt></View>
          <View style={{ flex: 1 }}>
            <Txt variant="h3">{role.name}</Txt>
            <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{role.area}</Txt>
          </View>
          <Pressable style={styles.switchBtn} onPress={() => router.push('/switch-role')}>
            <MaterialCommunityIcons name="swap-horizontal" size={16} color={colors.primary} />
            <Txt variant="label" color={colors.primary}>Switch</Txt>
          </Pressable>
        </View>
      </AppCard>

      <SectionHeader title="General" />
      <Group items={general} />
      <SectionHeader title="Operations" />
      <Group items={operations} />

      <Pressable style={styles.signOut} onPress={() => { signOut(); router.replace('/login'); }}>
        <MaterialCommunityIcons name="logout" size={18} color={colors.act} />
        <Txt variant="bodyMed" color={colors.act}>Sign out</Txt>
      </Pressable>
      <Txt variant="tiny" color={colors.textSubtle} style={{ textAlign: 'center', marginTop: spacing.lg }}>Agrim Suchak · prototype · v0.2</Txt>
    </Scaffold>
  );
}

function Group({ items }: { items: Item[] }) {
  return (
    <AppCard padded={false}>
      {items.map((it, i) => (
        <Pressable key={it.label} onPress={it.onPress} style={({ pressed }) => [styles.row, i < items.length - 1 && styles.rowBorder, pressed && { backgroundColor: colors.surfaceAlt }]}>
          <View style={styles.rowIcon}><MaterialCommunityIcons name={it.icon as any} size={19} color={colors.primary} /></View>
          <View style={{ flex: 1 }}>
            <Txt variant="bodyMed">{it.label}</Txt>
            {it.sub ? <Txt variant="tiny" color={colors.textMuted} style={{ marginTop: 1 }}>{it.sub}</Txt> : null}
          </View>
          <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSubtle} />
        </Pressable>
      ))}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  profile: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 52, height: 52, borderRadius: 16, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  switchBtn: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, backgroundColor: colors.primarySoft, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowIcon: { width: 38, height: 38, borderRadius: 11, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' },
  signOut: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.xl, paddingVertical: spacing.md, borderRadius: radius.md, backgroundColor: colors.actSoft },
});
