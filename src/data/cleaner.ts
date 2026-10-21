/** The cleaner's own data — their jobs, kept simple and in plain words (English + Hindi). */

import { colors } from '@/theme';

export type JobStatus = 'act' | 'watch' | 'routine';

export interface CleanerJob {
  id: string;
  toilet: string; // "Gents toilet 2"
  toiletHi: string;
  type: 'Gents' | 'Ladies' | 'Accessible' | 'Unisex';
  building: string;
  address: string;
  status: JobStatus;
  headline: string;
  reason: string;
  reasonHi: string;
  urgent: boolean;
  assignedBy: string;
  flaggedAt: string;
  done: boolean;
  cleanedAt?: string;
  note?: string;
  noteHi?: string;
}

export const CLEANER = {
  name: 'Mohzaam',
  phone: '+91 98684 18563',
  buildings: ['CTC Saket Block A', 'CTC Ajmeri Gate School Road'],
  area: 'South Delhi',
};

export const CLEANER_JOBS: CleanerJob[] = [
  {
    id: 'j1', toilet: 'Gents toilet 2', toiletHi: 'पुरुष शौचालय 2', type: 'Gents',
    building: 'CTC Saket Block A', address: 'Saket, near Select Citywalk, New Delhi',
    status: 'act', headline: 'Smells bad', reason: 'Strong pee and drain smell for over an hour.',
    reasonHi: 'एक घंटे से तेज़ पेशाब और नाली की बदबू।',
    urgent: true, assignedBy: 'Auto from sensor', flaggedAt: '20 min ago', done: false,
  },
  {
    id: 'j2', toilet: 'Ladies toilet 1', toiletHi: 'महिला शौचालय 1', type: 'Ladies',
    building: 'CTC Saket Block A', address: 'Saket, near Select Citywalk, New Delhi',
    status: 'act', headline: 'Air is very poor', reason: 'Dust and smell are high.',
    reasonHi: 'धूल और बदबू ज़्यादा है।',
    urgent: true, assignedBy: 'Ravi (facility)', flaggedAt: '45 min ago', done: false,
  },
  {
    id: 'j3', toilet: 'Gents toilet 1', toiletHi: 'पुरुष शौचालय 1', type: 'Gents',
    building: 'CTC Saket Block A', address: 'Saket, near Select Citywalk, New Delhi',
    status: 'watch', headline: 'Getting worse', reason: 'Smell slowly rising since lunch.',
    reasonHi: 'दोपहर से बदबू धीरे-धीरे बढ़ रही है।',
    urgent: false, assignedBy: 'Auto from sensor', flaggedAt: '2 hours ago', done: false,
  },
  {
    id: 'j4', toilet: 'Accessible toilet', toiletHi: 'दिव्यांग शौचालय', type: 'Accessible',
    building: 'CTC Saket Block A', address: 'Saket, near Select Citywalk, New Delhi',
    status: 'routine', headline: 'Routine clean', reason: 'Scheduled daily clean.',
    reasonHi: 'रोज़ की तय सफ़ाई।',
    urgent: false, assignedBy: 'Ravi (facility)', flaggedAt: 'Today', done: false,
  },
  {
    id: 'j5', toilet: 'Ladies toilet 2', toiletHi: 'महिला शौचालय 2', type: 'Ladies',
    building: 'CTC Saket Block A', address: 'Saket, near Select Citywalk, New Delhi',
    status: 'routine', headline: 'Routine clean', reason: 'Morning clean.',
    reasonHi: 'सुबह की सफ़ाई।',
    urgent: false, assignedBy: 'Ravi (facility)', flaggedAt: 'Today, 7:30 am', done: true,
    cleanedAt: 'Today, 7:40 am', note: 'Mopped, refilled soap.', noteHi: 'पोछा लगाया, साबुन भरा।',
  },
  {
    id: 'j6', toilet: 'Gents toilet 3', toiletHi: 'पुरुष शौचालय 3', type: 'Gents',
    building: 'CTC Saket Block A', address: 'Saket, near Select Citywalk, New Delhi',
    status: 'act', headline: 'Smelled bad', reason: 'High ammonia earlier.',
    reasonHi: 'पहले अमोनिया ज़्यादा था।',
    urgent: false, assignedBy: 'Auto from sensor', flaggedAt: 'Today, 9:10 am', done: true,
    cleanedAt: 'Today, 9:35 am', note: 'AS-1182 — drain flushed, floor mopped.', noteHi: 'AS-1182 — नाली साफ़, फ़र्श पोछा।',
  },
  {
    id: 'j7', toilet: 'Gents toilet 1', toiletHi: 'पुरुष शौचालय 1', type: 'Gents',
    building: 'CTC Ajmeri Gate School Road', address: 'Ajmeri Gate, near New Delhi Railway Station',
    status: 'watch', headline: 'Getting worse', reason: 'Smell slowly rising.',
    reasonHi: 'बदबू धीरे-धीरे बढ़ रही है।',
    urgent: false, assignedBy: 'Ravi (facility)', flaggedAt: '1 hour ago', done: false,
  },
  {
    id: 'j8', toilet: 'Ladies toilet 1', toiletHi: 'महिला शौचालय 1', type: 'Ladies',
    building: 'CTC Ajmeri Gate School Road', address: 'Ajmeri Gate, near New Delhi Railway Station',
    status: 'routine', headline: 'Routine clean', reason: 'Scheduled daily clean.',
    reasonHi: 'रोज़ की तय सफ़ाई।',
    urgent: false, assignedBy: 'Ravi (facility)', flaggedAt: 'Today', done: false,
  },
];

export function cleanerJobById(id: string) {
  return CLEANER_JOBS.find((j) => j.id === id);
}

export const JOB_META: Record<JobStatus, { color: string; soft: string; icon: string }> = {
  act: { color: colors.act, soft: colors.actSoft, icon: 'alert-circle' },
  watch: { color: colors.watch, soft: colors.watchSoft, icon: 'clock-alert-outline' },
  routine: { color: colors.offline, soft: colors.offlineSoft, icon: 'broom' },
};
