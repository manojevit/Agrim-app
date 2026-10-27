import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert as RNAlert, Pressable, StyleSheet, View } from 'react-native';
import { Txt } from './Txt';
import { useCleaning } from '@/context/cleaning';
import { useLang } from '@/context/lang';
import { Device } from '@/data/devices';
import { CALL_COST, cleanerForBlock } from '@/data/cleaning';
import { colors, radius, spacing } from '@/theme';

/**
 * The cleaning action loop: send a cleaner (AI voice call), see them on the way,
 * mark cleaned, and prove the air improved. Shared by device + alert detail.
 */
export function CleaningPanel({ device }: { device: Device }) {
  const { t } = useLang();
  const { get, sendCleaner, markCleaned } = useCleaning();
  const cs = get(device.serial);
  const cleaner = cleanerForBlock(device.blockId);
  const name = cs.cleanerName ?? cleaner?.name ?? 'the cleaner';

  const confirmSend = () => {
    RNAlert.alert(
      t('cl2.sendCleaner'),
      t('cl2.autoCallNote', { name, cost: CALL_COST }),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('cl2.callNow'), onPress: () => sendCleaner(device.serial, name, 'manual', cs.before) },
      ]
    );
  };

  // Cleaned — success + before/after proof
  if (cs.stage === 'cleaned') {
    return (
      <View style={[styles.card, { borderColor: colors.good, backgroundColor: colors.goodSoft }]}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="check-circle" size={22} color={colors.good} />
          <View style={{ flex: 1 }}>
            <Txt variant="h3" color={colors.good}>{t('cl2.cleanedAt', { t: cs.cleanedAt ?? '' })}</Txt>
            {cs.after && cs.before && (
              <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>
                {t('cl2.beforeAfter', { o1: cs.before.odour, o2: cs.after.odour, a1: cs.before.aqi, a2: cs.after.aqi })}
              </Txt>
            )}
          </View>
        </View>
        <Txt variant="tiny" color={colors.good} style={{ marginTop: spacing.sm }}>{t('cl2.improved')}</Txt>
      </View>
    );
  }

  // On the way — called, show who + mark cleaned
  if (cs.stage === 'enroute') {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.iconTile}><MaterialCommunityIcons name="walk" size={20} color={colors.primary} /></View>
          <View style={{ flex: 1 }}>
            <Txt variant="h3">{t('cl2.onTheWay')}</Txt>
            <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>
              {t('cl2.calledBy', { name, mode: t(cs.mode === 'auto' ? 'cl2.auto' : 'cl2.manual'), t: cs.calledAt ?? '', result: t(cs.result === 'no-answer' ? 'cl2.noAnswer' : 'cl2.answered') })}
            </Txt>
          </View>
        </View>
        <Pressable style={[styles.btn, styles.btnPrimary]} onPress={() => markCleaned(device.serial)}>
          <MaterialCommunityIcons name="check" size={18} color="#FFFFFF" />
          <Txt variant="label" color="#FFFFFF">{t('cl2.markCleaned')}</Txt>
        </Pressable>
      </View>
    );
  }

  // Needs cleaning — primary action
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.iconTile, { backgroundColor: colors.actSoft }]}><MaterialCommunityIcons name="broom" size={20} color={colors.act} /></View>
        <View style={{ flex: 1 }}>
          <Txt variant="h3">{t('cl2.needsTitle')}</Txt>
          <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{t('cl2.autoCallHint', { name, cost: CALL_COST })}</Txt>
        </View>
      </View>
      <Pressable style={[styles.btn, styles.btnPrimary]} onPress={confirmSend}>
        <MaterialCommunityIcons name="phone-outline" size={18} color="#FFFFFF" />
        <Txt variant="label" color="#FFFFFF">{t('cl2.sendCleaner')}</Txt>
      </Pressable>
      <Pressable style={[styles.btn, styles.btnGhost]} onPress={() => markCleaned(device.serial)}>
        <Txt variant="label" color={colors.text}>{t('cl2.markCleaned')}</Txt>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconTile: { width: 40, height: 40, borderRadius: 11, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, borderRadius: radius.md, height: 48, marginTop: spacing.md },
  btnPrimary: { backgroundColor: colors.primary },
  btnGhost: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderStrong },
});
