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
      <AppHeader back title={toilet} subtitle={job.building}>
        <View style={styles.statusCard}>
          <View style={[styles.medallion, { backgroundColor: m.color }]}>
            <MaterialCommunityIcons name={m.icon as any} size={24} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Txt variant="h3" color="#FFFFFF">{t(`problem.${job.status}`)}</Txt>
            <Txt variant="small" color="rgba(255,255,255,0.8)" style={{ marginTop: 2 }}>{lang === 'hi' ? job.reasonHi : job.reason}</Txt>
            <Txt variant="tiny" color="rgba(255,255,255,0.6)" style={{ marginTop: 6 }}>{t('job.flaggedBy', { by, t: job.flaggedAt })}</Txt>
          </View>
        </View>
      </AppHeader>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}>
        <Txt variant="h3" style={{ marginBottom: spacing.sm }}>{t('job.gettingThere')}</Txt>
        <View style={styles.card}>
          <View style={styles.mapStrip}>
            <MaterialCommunityIcons name="map-marker" size={22} color={colors.primary} />
            <Txt variant="small" color={colors.textMuted} style={{ flex: 1 }}>{job.address}</Txt>
          </View>
          <Button mode="contained" icon="navigation-variant" style={styles.dirBtn} contentStyle={{ height: 48 }} labelStyle={styles.midLabel} onPress={() => RNAlert.alert(t('job.getDirections'), `${job.building}`)}>
            {t('job.getDirections')}
          </Button>
        </View>

        {stage === 'done' ? (
          <View style={[styles.card, styles.doneCard]}>
            <View style={styles.doneHead}>
              <View style={styles.doneIcon}><MaterialCommunityIcons name="check-bold" size={22} color="#FFFFFF" /></View>
              <View style={{ flex: 1 }}>
                <Txt variant="h3" color={colors.good}>{t('job.cleanedLogged')}</Txt>
                <Txt variant="small" color={colors.textMuted} style={{ marginTop: 1 }}>{t('job.photoSaved')}</Txt>
              </View>
            </View>
            {(note || job.note) ? <Txt variant="small" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{t('job.noteLabel')}: {note || (lang === 'hi' ? job.noteHi : job.note)}</Txt> : null}
            <Button mode="contained" style={styles.bigBtn} contentStyle={{ height: 50 }} labelStyle={styles.bigLabel} onPress={() => router.back()}>{t('job.backToJobs')}</Button>
          </View>
        ) : stage === 'todo' ? (
          <Button mode="contained" icon="play" style={styles.startBtn} contentStyle={{ height: 54 }} labelStyle={styles.bigLabel} onPress={() => setStage('doing')}>
            {t('job.start')}
          </Button>
        ) : (
          <View style={styles.card}>
            <Txt variant="h3">{t('job.finishedLog')}</Txt>
            <Txt variant="small" color={colors.textMuted} style={{ marginTop: 2, marginBottom: spacing.md }}>{t('job.addPhotoHint')}</Txt>
            <Pressable style={[styles.photo, photo && styles.photoDone]} onPress={() => setPhoto((p) => !p)}>
              <MaterialCommunityIcons name={photo ? 'image-check' : 'camera-plus-outline'} size={28} color={photo ? colors.good : colors.textMuted} />
              <Txt variant="label" color={photo ? colors.good : colors.textMuted} style={{ marginTop: spacing.xs }}>{photo ? t('job.photoAdded') : t('job.takePhoto')}</Txt>
            </Pressable>
            <TextInput mode="outlined" label={t('job.note')} value={note} onChangeText={setNote} outlineStyle={{ borderRadius: radius.md }} style={{ backgroundColor: colors.surface, marginTop: spacing.md }} />
            <Button mode="contained" icon="check" disabled={!photo} style={styles.bigBtn} contentStyle={{ height: 52 }} labelStyle={styles.bigLabel} onPress={() => { setStage('done'); RNAlert.alert(t('job.cleanedLogged'), toilet); }}>
              {photo ? t('job.iveCleaned') : t('job.addPhotoFinish')}
            </Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  statusCard: { flexDirection: 'row', gap: spacing.md, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: radius.lg, padding: spacing.md, marginTop: spacing.lg },
  medallion: { width: 48, height: 48, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  card: { backgroundColor: colors.surface, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginBottom: spacing.md },
  mapStrip: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.primaryTint, borderRadius: radius.md, padding: spacing.md },
  dirBtn: { marginTop: spacing.md, borderRadius: radius.md },
  midLabel: { fontFamily: 'PlusJakartaSans_600SemiBold', fontSize: 14 },
  startBtn: { borderRadius: radius.md, marginBottom: spacing.md },
  bigBtn: { borderRadius: radius.md, marginTop: spacing.lg },
  bigLabel: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 16 },
  photo: { borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.borderStrong, borderRadius: radius.md, paddingVertical: spacing.xxl, alignItems: 'center', backgroundColor: colors.surfaceAlt },
  photoDone: { borderColor: colors.good, borderStyle: 'solid', backgroundColor: colors.goodSoft },
  doneCard: { borderColor: colors.good },
  doneHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  doneIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.good, alignItems: 'center', justifyContent: 'center' },
});
