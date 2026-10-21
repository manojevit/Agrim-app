import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Scaffold } from '@/components/Scaffold';
import { Txt } from '@/components/Txt';
import { useSession } from '@/context/session';
import { ROLES, ROLE_ORDER, homeRouteFor } from '@/data/roles';
import { colors, radius, spacing } from '@/theme';

export default function SwitchRole() {
  const { role, switchRole } = useSession();
  return (
    <Scaffold
      title="Preview as a role"
      subtitle="See the app exactly as each person sees it"
      right={<Pressable onPress={() => router.back()} hitSlop={12}><MaterialCommunityIcons name="close" size={26} color={colors.text} /></Pressable>}
    >
      {ROLE_ORDER.map((id) => {
        const r = ROLES[id];
        const active = role?.id === id;
        return (
          <Pressable key={id} style={[styles.row, active && styles.rowActive]} onPress={() => { switchRole(id); router.replace(homeRouteFor(id)); }}>
            <View style={[styles.badge, active && { backgroundColor: colors.primary }]}>
              <Txt variant="h2" color={active ? colors.textInverse : colors.primary}>{r.short}</Txt>
            </View>
            <View style={{ flex: 1 }}>
              <Txt variant="bodyMed">{r.name}</Txt>
              <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{r.blurb}</Txt>
            </View>
            <MaterialCommunityIcons name={active ? 'check-circle' : 'chevron-right'} size={22} color={active ? colors.primary : colors.textSubtle} />
          </Pressable>
        );
      })}
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm },
  rowActive: { borderColor: colors.primary, backgroundColor: colors.primaryTint },
  badge: { width: 44, height: 44, borderRadius: 13, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
});
