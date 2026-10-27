import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlertRow } from '@/components/AlertRow';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { ALERTS } from '@/data/devices';
import { colors, radius, spacing } from '@/theme';
import { boundedContent, useResponsive } from '@/theme/responsive';

type Status = 'active' | 'critical' | 'resolved' | 'all';
type Kind = 'any' | 'threshold' | 'offline' | 'smoke';

export default function Alerts() {
  const insets = useSafeAreaInsets();
  const { t } = useLang();
  const r = useResponsive();
  const [status, setStatus] = useState<Status>('active');
  const [kind, setKind] = useState<Kind>('any');
  const [handedOnly, setHandedOnly] = useState(false);

  const list = useMemo(() => {
    return ALERTS.filter((a) => {
      if (status === 'active' && a.state !== 'active') return false;
      if (status === 'critical' && !a.critical) return false;
      if (status === 'resolved' && a.state !== 'resolved') return false;
      if (kind !== 'any' && a.type !== kind) return false;
      if (handedOnly && !a.handedUpward) return false;
      return true;
    }).sort((a, b) => Number(b.critical) - Number(a.critical));
  }, [status, kind, handedOnly]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm, paddingHorizontal: r.gutter }]}>
        <Txt variant="h1" style={{ flex: 1 }}>{t('al.title')}</Txt>
        <MaterialCommunityIcons name="bell-outline" size={23} color={colors.text} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={boundedContent(r)}>
        <View style={styles.chipRow}>
          {(['active', 'critical', 'resolved', 'all'] as Status[]).map((s) => (
            <Chip key={s} label={t('al.' + s)} active={status === s} onPress={() => setStatus(s)} />
          ))}
        </View>
        <View style={styles.chipRow}>
          {(['any', 'threshold', 'offline', 'smoke'] as Kind[]).map((k) => (
            <Chip key={k} label={t(k === 'any' ? 'al.anyType' : k === 'offline' ? 'al.typeOffline' : 'al.' + k)} active={kind === k} onPress={() => setKind(k)} />
          ))}
        </View>
        <View style={styles.chipRow}>
          <Chip label={t('al.handedOnly')} active={handedOnly} onPress={() => setHandedOnly((v) => !v)} />
        </View>

        <Txt variant="small" color={colors.textMuted} style={{ marginTop: spacing.sm, marginBottom: spacing.md }}>{t('al.sort')}</Txt>

        {list.length ? (
          list.map((a) => <AlertRow key={a.id} alert={a} />)
        ) : (
          <Txt variant="small" color={colors.textSubtle} style={{ textAlign: 'center', marginTop: spacing.xl }}>{t('al.none')}</Txt>
        )}
      </ScrollView>
    </View>
  );
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active ? styles.chipOn : styles.chipOff]}>
      <Txt variant="label" color={active ? colors.primary : colors.textMuted}>{label}</Txt>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.sm },
  chip: { borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 7 },
  chipOn: { backgroundColor: colors.primarySoft },
  chipOff: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
});
