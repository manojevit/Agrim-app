import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert as RNAlert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AppHeader } from '@/components/AppHeader';
import { Txt } from '@/components/Txt';
import { useLang } from '@/context/lang';
import { cleanerJobById, JOB_META } from '@/data/cleaner';
import { colors, radius, spacing } from '@/theme';

type Stage = 'todo' | 'doing' | 'done';

export default function CleanerJob() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, lang } = useLang();
  const job = cleanerJobById(id);
  const [stage, setStage] = useState<Stage>(job?.done ? 'done' : 'todo');
  const [photo, setPhoto] = useState(false);
  const [note, setNote] = useState('');

  if (!job) return <View style={{ flex: 1, backgroundColor: colors.bg }}><AppHeader back title="Job" /></View>;
  const m = JOB_META[job.status];
  const toilet = lang === 'hi' ? job.toiletHi : job.toilet;
  const by = job.assignedBy.toLowerCase().includes('sensor') ? t('by.sensor') : job.assignedBy;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <AppHeader back title={toilet} subtitle={job.building} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxxl }}>
        {/* Status */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.iconTile, { backgroundColor: m.soft }]}><MaterialCommunityIcons name={m.icon as any} size={22} color={m.color} /></View>
            <View style={{ flex: 1 }}>
              <Txt variant="h3" color={m.color}>{t(`problem.${job.status}`)}</Txt>
              <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2 }}>{lang === 'hi' ? job.reasonHi : job.reason}</Txt>
              <Txt variant="tiny" color={colors.textSubtle} style={{ marginTop: 6 }}>{t('job.flaggedBy', { by, t: job.flaggedAt })}</Txt>
            </View>
          </View>
        </View>

        {/* Getting there */}
        <Txt variant="overline" color={colors.textSubtle} style={{ marginTop: spacing.lg, marginBottom: spacing.sm }}>{t('job.gettingThere').toUpperCase()}</Txt>
        <View style={styles.card}>
          <View style={styles.mapStrip}>
            <MaterialCommunityIcons name="map-marker-outline" size={20} color={colors.text} />
            <Txt variant="small" color={colors.textMuted} style={{ flex: 1 }}>{job.address}</Txt>
          </View>
          <Button mode="outlined" icon="navigation-variant-outline" style={styles.outlineBtn} textColor={colors.text} labelStyle={styles.midLabel} onPress={() => RNAlert.alert(t('job.getDirections'), job.building)}>
            {t('job.getDirections')}
          </Button>
        </View>

        {/* Action */}
        {stage === 'done' ? (
          <View style={[styles.card, { borderColor: colors.good, marginTop: spacing.lg }]}>
            <View style={styles.row}>
              <View style={[styles.iconTile, { backgroundColor: colors.good }]}><MaterialCommunityIcons name="check-bold" size={20} color="#FFFFFF" /></View>
              <View style={{ flex: 1 }}>
                <Txt variant="h3" color={colors.good}>{t('job.cleanedLogged')}</Txt>
                <Txt variant="small" color={colors.textMuted} style={{ marginTop: 1 }}>{t('job.photoSaved')}</Txt>
              </View>
            </View>
            {(note || job.note) ? <Txt variant="small" color={colors.textMuted} style={{ marginTop: spacing.md }}>{t('job.noteLabel')}: {note || (lang === 'hi' ? job.noteHi : job.note)}</Txt> : null}
            <Button mode="outlined" style={[styles.outlineBtn, { marginTop: spacing.md }]} textColor={colors.text} labelStyle={styles.midLabel} onPress={() => router.back()}>{t('job.backToJobs')}</Button>
          </View>
        ) : stage === 'todo' ? (
          <Button mode="contained" icon="play" style={styles.primaryBtn} contentStyle={{ height: 52 }} labelStyle={styles.bigLabel} onPress={() => setStage('doing')}>
            {t('job.start')}
          </Button>
        ) : (
          <View style={[styles.card, { marginTop: spacing.lg }]}>
            <Txt variant="h3">{t('job.finishedLog')}</Txt>
            <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2, marginBottom: spacing.md }}>{t('job.addPhotoHint')}</Txt>
            <Pressable style={[styles.photo, photo && styles.photoDone]} onPress={() => setPhoto((p) => !p)}>
              <MaterialCommunityIcons name={photo ? 'image-check' : 'camera-plus-outline'} size={26} color={photo ? colors.good : colors.textMuted} />
              <Txt variant="label" color={photo ? colors.good : colors.textMuted} style={{ marginTop: spacing.xs }}>{photo ? t('job.photoAdded') : t('job.takePhoto')}</Txt>
            </Pressable>
            <TextInput mode="outlined" label={t('job.note')} value={note} onChangeText={setNote} outlineStyle={{ borderRadius: radius.md }} style={{ backgroundColor: colors.surface, marginTop: spacing.md }} />
            <Button mode="contained" icon="check" disabled={!photo} style={[styles.primaryBtn, { marginTop: spacing.md }]} contentStyle={{ height: 52 }} labelStyle={styles.bigLabel} onPress={() => { setStage('done'); RNAlert.alert(t('job.cleanedLogged'), toilet); }}>
              {photo ? t('job.iveCleaned') : t('job.addPhotoFinish')}
            </Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  row: { flexDirection: 'row', gap: spacing.md },
  iconTile: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  mapStrip: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceAlt, borderRadius: radius.md, padding: spacing.md },
  outlineBtn: { marginTop: spacing.md, borderRadius: radius.md, borderColor: colors.borderStrong },
  midLabel: { fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  primaryBtn: { borderRadius: radius.md, marginTop: spacing.lg, backgroundColor: colors.primary },
  bigLabel: { fontFamily: 'Inter_700Bold', fontSize: 15 },
  photo: { borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.borderStrong, borderRadius: radius.md, paddingVertical: spacing.xxl, alignItems: 'center', backgroundColor: colors.surfaceAlt },
  photoDone: { borderColor: colors.good, borderStyle: 'solid', backgroundColor: colors.goodSoft },
});
