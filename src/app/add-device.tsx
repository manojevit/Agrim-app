import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert as RNAlert, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { BLOCKS } from '@/data/devices';
import { colors, radius, spacing } from '@/theme';

export default function AddDevice() {
  const { t } = useLang();
  const [serial, setSerial] = useState('LS-0931');
  const [claim, setClaim] = useState('9F2K-7Q1D');
  const [label, setLabel] = useState('Block A — Toilet 3');
  const [block, setBlock] = useState(BLOCKS[1].id);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={t('add.title')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxxl, width: '100%', maxWidth: 620, alignSelf: 'center' }} keyboardShouldPersistTaps="handled">
        <Txt variant="small" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>{t('add.intro')}</Txt>

        <View style={styles.card}>
          <Field label={t('add.deviceId')} value={serial} onChange={setSerial} />
          <Field label={t('add.claimCode')} value={claim} onChange={setClaim} hint={t('add.claimHint')} />
          <Field label={t('add.label')} value={label} onChange={setLabel} />
        </View>

        <Txt variant="h2" style={{ marginTop: spacing.xl }}>{t('add.where')}</Txt>
        <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2, marginBottom: spacing.md }}>{t('add.chooseBlock')}</Txt>

        {BLOCKS.map((b) => (
          <Pressable key={b.id} style={[styles.block, block === b.id && styles.blockOn]} onPress={() => setBlock(b.id)}>
            <View style={[styles.radio, block === b.id && { borderColor: colors.primary }]}>
              {block === b.id && <View style={styles.radioDot} />}
            </View>
            <View style={{ flex: 1 }}>
              <Txt variant="h3">{b.name}</Txt>
              <Txt variant="small" color={colors.textMuted}>{b.city} › {b.area} › {b.ward}</Txt>
            </View>
          </Pressable>
        ))}

        <Txt variant="small" color={colors.textSubtle} style={{ marginTop: spacing.xs, marginBottom: spacing.sm }}>{t('add.showing', { shown: BLOCKS.length, total: BLOCKS.length })}</Txt>
        <Pressable style={styles.addBlock} onPress={() => RNAlert.alert(t('add.addNewBlock'))}>
          <MaterialCommunityIcons name="plus" size={20} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Txt variant="h3" color={colors.primary}>{t('add.addNewBlock')}</Txt>
            <Txt variant="small" color={colors.textMuted}>{t('add.addNewBlockSub')}</Txt>
          </View>
        </Pressable>

        <View style={styles.actions}>
          <Pressable style={styles.secondary} onPress={() => router.replace('/scan-qr')}>
            <Txt variant="label">{t('add.scanInstead')}</Txt>
          </Pressable>
          <Pressable style={styles.primary} onPress={() => { RNAlert.alert(t('add.addDevice'), serial); router.back(); }}>
            <Txt variant="label" color="#FFFFFF">{t('add.addDevice')}</Txt>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function Field({ label, value, onChange, hint }: { label: string; value: string; onChange: (s: string) => void; hint?: string }) {
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Txt variant="label" color={colors.textMuted} style={{ marginBottom: 6 }}>{label}</Txt>
      <TextInput value={value} onChangeText={onChange} style={styles.input} autoCapitalize="characters" />
      {hint ? <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 5 }}>{hint}</Txt> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  input: { backgroundColor: colors.surfaceAlt, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md, height: 48, fontFamily: 'Inter_500Medium', fontSize: 15, color: colors.text },
  block: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.sm },
  blockOn: { borderColor: colors.primary, backgroundColor: colors.primaryTint },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.borderStrong, alignItems: 'center', justifyContent: 'center' },
  radioDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: colors.primary },
  addBlock: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xl },
  secondary: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radius.md, height: 50 },
  primary: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, borderRadius: radius.md, height: 50 },
});
