import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert as RNAlert, Pressable, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AppCard } from '@/components/AppCard';
import { Scaffold } from '@/components/Scaffold';
import { Txt } from '@/components/Txt';
import { cleanerJobById, JOB_META } from '@/data/cleaner';
import { colors, radius, spacing } from '@/theme';

type Stage = 'todo' | 'doing' | 'done';

export default function CleanerJob() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const job = cleanerJobById(id);
  const [stage, setStage] = useState<Stage>(job?.done ? 'done' : 'todo');
  const [photo, setPhoto] = useState(false);
  const [note, setNote] = useState('');

  if (!job) return <Scaffold title="Job" back><Txt>Not found.</Txt></Scaffold>;
  const m = JOB_META[job.status];

  return (
    <Scaffold title={job.toilet} subtitle={job.building} back>
      {/* What & why */}
      <AppCard stripe={m.color}>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <View style={[styles.icon, { backgroundColor: m.soft }]}><MaterialCommunityIcons name={m.icon as any} size={28} color={m.color} /></View>
          <View style={{ flex: 1 }}>
            <Txt variant="h2" color={m.color}>{job.headline}</Txt>
            <Txt variant="body" color={colors.textMuted} style={{ marginTop: 2 }}>{job.reason}</Txt>
          </View>
        </View>
        <View style={styles.metaRow}>
          <MaterialCommunityIcons name="account-arrow-right-outline" size={15} color={colors.textSubtle} />
          <Txt variant="tiny" color={colors.textSubtle}>Assigned by {job.assignedBy} · {job.flaggedAt}</Txt>
        </View>
      </AppCard>

      {/* Where */}
      <AppCard style={{ marginTop: spacing.md }}>
        <Txt variant="overline" color={colors.textMuted}>WHERE TO GO</Txt>
        <View style={styles.whereRow}><Txt variant="small" color={colors.textMuted}>Building</Txt><Txt variant="label">{job.building}</Txt></View>
        <View style={styles.whereRow}><Txt variant="small" color={colors.textMuted}>Which toilet</Txt><Txt variant="label">{job.toilet} ({job.type})</Txt></View>
        <View style={[styles.whereRow, { borderBottomWidth: 0 }]}><Txt variant="small" color={colors.textMuted}>Address</Txt><Txt variant="label" style={{ flexShrink: 1, textAlign: 'right' }}>{job.address}</Txt></View>
        <Button mode="outlined" icon="map-marker" style={styles.dirBtn} textColor={colors.primary} labelStyle={styles.btnLabel} onPress={() => RNAlert.alert('Directions', `Opening the map to ${job.building}.`)}>
          Open directions
        </Button>
      </AppCard>

      {/* Action */}
      {stage === 'done' ? (
        <AppCard stripe={colors.good} style={{ marginTop: spacing.md, gap: spacing.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
            <MaterialCommunityIcons name="check-circle" size={24} color={colors.good} />
            <Txt variant="h3" color={colors.good}>Cleaned · logged</Txt>
          </View>
          {(photo || job.cleanedAt) && (
            <View style={styles.photoDone}><MaterialCommunityIcons name="image-check" size={22} color={colors.good} /><Txt variant="small" color={colors.textMuted}>Photo saved as proof</Txt></View>
          )}
          {(note || job.note) ? <Txt variant="small" color={colors.textMuted}>Note: {note || job.note}</Txt> : null}
          <Button mode="text" onPress={() => router.back()} labelStyle={styles.btnLabel} textColor={colors.primary}>Back to my jobs</Button>
        </AppCard>
      ) : stage === 'todo' ? (
        <Button mode="contained" icon="play" style={styles.bigBtn} contentStyle={{ height: 52 }} labelStyle={styles.bigLabel} onPress={() => setStage('doing')}>
          Start cleaning
        </Button>
      ) : (
        <AppCard style={{ marginTop: spacing.md, gap: spacing.md }}>
          <Txt variant="h3">Finished? Log it.</Txt>
          <Pressable style={[styles.photoTile, photo && styles.photoTileDone]} onPress={() => setPhoto((p) => !p)}>
            <MaterialCommunityIcons name={photo ? 'image-check' : 'camera-plus-outline'} size={26} color={photo ? colors.good : colors.textMuted} />
            <Txt variant="label" color={photo ? colors.good : colors.textMuted}>{photo ? 'Photo added' : 'Add a photo (proof)'}</Txt>
          </Pressable>
          <TextInput mode="outlined" label="Note (optional)" value={note} onChangeText={setNote} placeholder="e.g. mopped, drain flushed" outlineStyle={{ borderRadius: radius.md }} style={{ backgroundColor: colors.surface }} />
          {!photo && (
            <View style={styles.hintRow}>
              <MaterialCommunityIcons name="camera-outline" size={14} color={colors.watch} />
              <Txt variant="tiny" color={colors.watch}>A photo is needed to finish.</Txt>
            </View>
          )}
          <Button mode="contained" icon="check" disabled={!photo} style={{ borderRadius: radius.md }} contentStyle={{ height: 52 }} labelStyle={styles.bigLabel} onPress={() => { setStage('done'); RNAlert.alert('Cleaned', `${job.toilet} logged as cleaned just now.`); }}>
            Mark as cleaned
          </Button>
        </AppCard>
      )}
    </Scaffold>
  );
}

const styles = StyleSheet.create({
  icon: { width: 52, height: 52, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: spacing.md },
  whereRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  dirBtn: { marginTop: spacing.md, borderRadius: radius.md, borderColor: colors.borderStrong },
  btnLabel: { fontFamily: 'PlusJakartaSans_600SemiBold', fontSize: 14 },
  bigBtn: { marginTop: spacing.md, borderRadius: radius.md },
  bigLabel: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 16 },
  photoTile: { borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.borderStrong, borderRadius: radius.md, paddingVertical: spacing.xl, alignItems: 'center', gap: spacing.sm, backgroundColor: colors.surfaceAlt },
  photoTileDone: { borderColor: colors.good, borderStyle: 'solid', backgroundColor: colors.goodSoft },
  photoDone: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  hintRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs, marginTop: -spacing.xs },
});
