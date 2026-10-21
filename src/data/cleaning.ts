import { CleaningJob, CleaningLogEntry, Staff } from './types';

export const CLEANING_JOBS: CleaningJob[] = [
  {
    id: 'cj-1',
    block: 'CTC Saket Block A',
    path: 'Ward 12 › South Delhi',
    status: 'act',
    reason: '2 toilets flagged this morning',
    lastCleaned: 'Yesterday, 4:10 pm',
    visitsSince: 211,
    done: false,
  },
  {
    id: 'cj-2',
    block: 'CTC Ajmeri Gate School Road',
    path: 'Ajmeri Gate › Old Delhi',
    status: 'watch',
    reason: 'Busy since morning, no clean logged today',
    lastCleaned: 'Today, 7:30 am',
    visitsSince: 96,
    done: false,
  },
  {
    id: 'cj-3',
    block: 'CTC Dwarka — A Dispensary',
    path: 'Dwarka › West Delhi',
    status: 'good',
    reason: 'Cleaned recently, all calm',
    lastCleaned: 'Today, 11:05 am',
    visitsSince: 40,
    done: true,
  },
];

export const CLEANING_LOG: CleaningLogEntry[] = [
  {
    id: 'cl-1',
    block: 'CTC Saket Block A',
    when: 'Yesterday, 4:10 pm',
    note: 'AS-1182, Gents 2 — mopped, drain flushed',
    by: 'Mohzaam (cleaner)',
  },
  {
    id: 'cl-2',
    block: 'CTC Ajmeri Gate School Road',
    when: 'Today, 7:30 am',
    note: 'Routine morning clean',
    by: 'Pawan (cleaner)',
  },
  {
    id: 'cl-3',
    block: 'CTC Dwarka — A Dispensary',
    when: 'Today, 11:05 am',
    note: 'Routine clean, water supply fine',
    by: 'Rahul (cleaner)',
  },
];

export const STAFF: Staff[] = [
  { id: 's-1', name: 'Mohzaam', phone: '+91 98684 18563', role: 'cleaner', block: 'CTC Saket Block A' },
  { id: 's-2', name: 'Pawan', phone: '+91 80047 88261', role: 'cleaner', block: 'CTC Saket Block A' },
  { id: 's-3', name: 'Rahul', phone: '+91 88263 41150', role: 'cleaner', block: 'CTC Saket Block A' },
];
