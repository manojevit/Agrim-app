import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert as RNAlert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { colors, radius, spacing } from '@/theme';

export default function ScanQR() {
  const { t } = useLang();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={t('scan.title')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxxl }}>
        <Txt variant="small" color={colors.textMuted} style={{ textAlign: 'center', marginBottom: spacing.md }}>{t('scan.align')}</Txt>

        <View style={styles.frame}>
          <Corner pos={{ top: 10, left: 10 }} />
          <Corner pos={{ top: 10, right: 10 }} />
          <Corner pos={{ bottom: 10, left: 10 }} />
          <Corner pos={{ bottom: 10, right: 10 }} />
          <View style={styles.scanline} />
          <MaterialCommunityIcons name="qrcode-scan" size={64} color={colors.borderStrong} />
        </View>
        <Txt variant="small" color={colors.textMuted} style={{ textAlign: 'center', marginTop: spacing.md }}>{t('scan.scanning')}</Txt>

        <View style={styles.card}>
          <Txt variant="label" style={{ marginBottom: spacing.sm }}>{t('scan.paste')}</Txt>
          <View style={styles.codeBox}><Txt variant="bodyMed" color={colors.text}>ES2|LS-0001|9F2K7Q1D…</Txt></View>
          <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: spacing.sm }}>{t('scan.pasteHint')}</Txt>
          <Pressable style={styles.decode} onPress={() => { RNAlert.alert(t('scan.decode')); router.replace('/add-device'); }}>
            <Txt variant="label" color="#FFFFFF">{t('scan.decode')}</Txt>
          </Pressable>
        </View>

        <Pressable style={styles.manual} onPress={() => router.replace('/add-device')}>
          <Txt variant="label">{t('scan.enterId')}</Txt>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function Corner({ pos }: { pos: any }) {
  return <View style={[styles.corner, pos]} />;
}

const styles = StyleSheet.create({
  frame: { height: 300, borderRadius: radius.xl, backgroundColor: '#DCE7FD', borderWidth: 2, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  corner: { position: 'absolute', width: 34, height: 34, borderColor: colors.primary, borderTopWidth: 4, borderLeftWidth: 4, borderRadius: 4 },
  scanline: { position: 'absolute', left: 0, right: 0, height: 2, backgroundColor: colors.primary, top: '50%' },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginTop: spacing.lg },
  codeBox: { backgroundColor: colors.surfaceAlt, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  decode: { backgroundColor: colors.primary, borderRadius: radius.md, height: 48, alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
  manual: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderStrong, borderRadius: radius.md, height: 50, alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
});
