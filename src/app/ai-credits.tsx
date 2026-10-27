import { Alert as RNAlert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { colors, radius, spacing } from '@/theme';

type Person = { name: string; role: string; spent: string; limit: string; calls: number };

const PEOPLE: Person[] = [
  { name: 'Block Coordinator', role: 'Block coordinator · Delhi NCR › South Delhi › Saket Block Cluster', spent: '₹0.00', limit: 'No limit set', calls: 0 },
  { name: 'Dev Block Coordinator', role: 'Block coordinator · Delhi NCR › South Delhi › Ward 12', spent: '₹0.00', limit: '₹250.00', calls: 0 },
];

export default function AiCredits() {
  const { t } = useLang();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={t('ai.title')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxxl, width: '100%', maxWidth: 620, alignSelf: 'center' }}>
        <Txt variant="small" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>{t('ai.sub')}</Txt>

        <View style={styles.card}>
          <Txt variant="small" color={colors.textMuted}>{t('ai.spent')}</Txt>
          <Txt variant="display" style={{ marginVertical: 4 }}>₹0.85</Txt>
          <Txt variant="small" color={colors.textMuted}>01-Sept-2026 – 01-Oct-2026</Txt>
          <View style={styles.limitRow}>
            <Txt variant="small" color={colors.textMuted}>{t('ai.monthlyLimit')}</Txt>
            <Txt variant="label">{t('ai.noLimit')}</Txt>
          </View>
          <Txt variant="small" color={colors.textMuted}>{t('ai.noLimitBody')}</Txt>
        </View>

        <Txt variant="h2" style={{ marginTop: spacing.xl }}>{t('ai.people')}</Txt>
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2, marginBottom: spacing.md }}>{t('ai.peopleSub')}</Txt>

        {PEOPLE.map((p) => (
          <View key={p.name} style={styles.card}>
            <Txt variant="h3">{p.name}</Txt>
            <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{p.role}</Txt>
            <KV k={t('ai.spentLbl')} v={p.spent} />
            <KV k={t('ai.limit')} v={p.limit} />
            <KV k={t('ai.calls')} v={`${p.calls}`} />
            <Pressable style={styles.btn} onPress={() => RNAlert.alert(p.limit === 'No limit set' ? t('ai.setLimit') : t('ai.changeLimit'), p.name)}>
              <Txt variant="label">{p.limit === 'No limit set' ? t('ai.setLimit') : t('ai.changeLimit')}</Txt>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <View style={styles.kv}>
      <Txt variant="small" color={colors.textMuted}>{k}</Txt>
      <Txt variant="label">{v}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginTop: spacing.md },
  limitRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md, marginBottom: 4 },
  kv: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.sm },
  btn: { borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radius.md, height: 46, alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
});
