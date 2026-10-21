import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Txt } from '@/components/Txt';
import { CLEANER_JOBS } from '@/data/cleaner';
import { colors, radius, spacing } from '@/theme';

/** The loud "clean now" takeover a cleaner sees when a toilet needs attention. */
export default function CleanerAlert() {
  const insets = useSafeAreaInsets();
  const job = CLEANER_JOBS[0];

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + spacing.xxxl, paddingBottom: insets.bottom + spacing.xl }]}>
      <View style={styles.badge}>
        <View style={styles.badgeDot} />
        <Txt variant="label" color="#FFFFFF">Clean now</Txt>
      </View>

      <View style={styles.center}>
        <View style={styles.ring}>
          <MaterialCommunityIcons name="alert-circle" size={56} color="#FFFFFF" />
        </View>
        <Txt variant="display" color="#FFFFFF" style={{ textAlign: 'center', marginTop: spacing.xl }}>{job.toilet}</Txt>
        <Txt variant="h3" color="#C7CEEF" style={{ textAlign: 'center', marginTop: spacing.xs }}>needs cleaning now</Txt>
        <View style={styles.reason}>
          <Txt variant="body" color="#E6E9F7" style={{ textAlign: 'center' }}>{job.headline}</Txt>
          <Txt variant="small" color="#9AA3CC" style={{ textAlign: 'center', marginTop: spacing.xs }}>{job.building} · {job.type}</Txt>
        </View>
      </View>

      <View style={{ gap: spacing.sm }}>
        <Button mode="contained" icon="arrow-right" buttonColor="#FFFFFF" textColor={colors.primaryDark} style={{ borderRadius: radius.md }} contentStyle={{ height: 54 }} labelStyle={styles.label} onPress={() => router.replace(`/cleaner-job/${job.id}`)}>
          View the job
        </Button>
        <Button mode="text" textColor="#C7CEEF" labelStyle={styles.label} onPress={() => router.replace('/(cleaner)')}>
          Later
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: colors.primaryDark, paddingHorizontal: spacing.xl },
  badge: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, alignSelf: 'center', backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  badgeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.act },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  ring: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)' },
  reason: { marginTop: spacing.xl, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: radius.lg, padding: spacing.lg, alignSelf: 'stretch' },
  label: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 16 },
});
