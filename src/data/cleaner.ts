/** The cleaner's own data — their jobs, kept simple and in plain words. */

export type JobStatus = 'act' | 'watch' | 'routine';

export interface CleanerJob {
  id: string;
  toilet: string; // "Gents toilet 2"
  type: 'Gents' | 'Ladies' | 'Accessible' | 'Unisex';
  building: string;
  address: string;
  status: JobStatus;
  headline: string; // plain: "Smells bad — clean now"
  reason: string;
  urgent: boolean;
  assignedBy: string; // "Auto from sensor" | "Ravi (facility)"
  flaggedAt: string;
  done: boolean;
  cleanedAt?: string;
  note?: string;
}

export const CLEANER = {
  name: 'Mohzaam',
  phone: '+91 98684 18563',
  buildings: ['CTC Saket Block A', 'CTC Ajmeri Gate School Road'],
  area: 'South Delhi',
};

export const CLEANER_JOBS: CleanerJob[] = [
  {
    id: 'j1',
    toilet: 'Gents toilet 2',
    type: 'Gents',
    building: 'CTC Saket Block A',
    address: 'Saket, near Select Citywalk, New Delhi',
    status: 'act',
    headline: 'Smells bad — clean now',
    reason: 'Strong pee and drain smell for over an hour.',
    urgent: true,
    assignedBy: 'Auto from sensor',
    flaggedAt: '20 min ago',
    done: false,
  },
  {
    id: 'j2',
    toilet: 'Ladies toilet 1',
    type: 'Ladies',
    building: 'CTC Saket Block A',
    address: 'Saket, near Select Citywalk, New Delhi',
    status: 'act',
    headline: 'Air is very poor — clean now',
    reason: 'Dust and smell are high.',
    urgent: true,
    assignedBy: 'Ravi (facility)',
    flaggedAt: '45 min ago',
    done: false,
  },
  {
    id: 'j3',
    toilet: 'Gents toilet 1',
    type: 'Gents',
    building: 'CTC Saket Block A',
    address: 'Saket, near Select Citywalk, New Delhi',
    status: 'watch',
    headline: 'Getting worse — clean soon',
    reason: 'Smell slowly rising since lunch.',
    urgent: false,
    assignedBy: 'Auto from sensor',
    flaggedAt: '2 hours ago',
    done: false,
  },
  {
    id: 'j4',
    toilet: 'Accessible toilet',
    type: 'Accessible',
    building: 'CTC Saket Block A',
    address: 'Saket, near Select Citywalk, New Delhi',
    status: 'routine',
    headline: 'Routine clean',
    reason: 'Scheduled daily clean.',
    urgent: false,
    assignedBy: 'Ravi (facility)',
    flaggedAt: 'Today',
    done: false,
  },
  {
    id: 'j5',
    toilet: 'Ladies toilet 2',
    type: 'Ladies',
    building: 'CTC Saket Block A',
    address: 'Saket, near Select Citywalk, New Delhi',
    status: 'routine',
    headline: 'Routine clean',
    reason: 'Morning clean.',
    urgent: false,
    assignedBy: 'Ravi (facility)',
    flaggedAt: 'Today, 7:30 am',
    done: true,
    cleanedAt: 'Today, 7:40 am',
    note: 'Mopped, refilled soap.',
  },
  {
    id: 'j6',
    toilet: 'Gents toilet 3',
    type: 'Gents',
    building: 'CTC Saket Block A',
    address: 'Saket, near Select Citywalk, New Delhi',
    status: 'act',
    headline: 'Smelled bad — cleaned',
    reason: 'High ammonia earlier.',
    urgent: false,
    assignedBy: 'Auto from sensor',
    flaggedAt: 'Today, 9:10 am',
    done: true,
    cleanedAt: 'Today, 9:35 am',
    note: 'AS-1182 — drain flushed, floor mopped.',
  },
  {
    id: 'j7',
    toilet: 'Gents toilet 1',
    type: 'Gents',
    building: 'CTC Ajmeri Gate School Road',
    address: 'Ajmeri Gate, near New Delhi Railway Station',
    status: 'watch',
    headline: 'Getting worse — clean soon',
    reason: 'Smell slowly rising.',
    urgent: false,
    assignedBy: 'Ravi (facility)',
    flaggedAt: '1 hour ago',
    done: false,
  },
  {
    id: 'j8',
    toilet: 'Ladies toilet 1',
    type: 'Ladies',
    building: 'CTC Ajmeri Gate School Road',
    address: 'Ajmeri Gate, near New Delhi Railway Station',
    status: 'routine',
    headline: 'Routine clean',
    reason: 'Scheduled daily clean.',
    urgent: false,
    assignedBy: 'Ravi (facility)',
    flaggedAt: 'Today',
    done: false,
  },
];

export function cleanerJobById(id: string) {
  return CLEANER_JOBS.find((j) => j.id === id);
}

export const JOB_META: Record<JobStatus, { label: string; color: string; soft: string; icon: string }> = {
  act: { label: 'Clean now', color: '#DC2F3A', soft: '#FBE4E6', icon: 'alert-circle' },
  watch: { label: 'Clean soon', color: '#C07A05', soft: '#FBEFD6', icon: 'clock-alert-outline' },
  routine: { label: 'Routine', color: '#2743C4', soft: '#E7EAFB', icon: 'broom' },
};
