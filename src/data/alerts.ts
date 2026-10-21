import { Alert } from './types';

/**
 * Alerts in PLAIN language first. The technical line (tech) is kept but shown small.
 * Old app said "PM10 high · 55.3 µg/m³ · Handed upward" — nobody knew what to do.
 */
export const ALERTS: Alert[] = [
  {
    id: 'al-1182',
    headline: 'This toilet smells bad',
    detail: 'Send someone to clean it.',
    severity: 'act',
    toiletName: 'Gents toilet 2',
    block: 'CTC Saket Block A',
    path: 'Delhi NCR › South Delhi › Ward 12',
    serial: 'LS-0001',
    tech: 'Ammonia (NH₃) 12.35 ppm · above critical',
    age: '20m ago',
    state: 'new',
  },
  {
    id: 'al-1183',
    headline: 'Air is very poor here',
    detail: 'Dust and smell are high — clean soon.',
    severity: 'act',
    toiletName: 'Ladies toilet 1',
    block: 'CTC Saket Block A',
    path: 'Delhi NCR › South Delhi › Ward 12',
    serial: 'LS-0002',
    tech: 'PM10 55.3 µg/m³ · PM2.5 33.2 µg/m³',
    age: '45m ago',
    state: 'onit',
  },
  {
    id: 'al-1184',
    headline: 'Nobody has answered yet',
    detail: 'Passed up to Ward 12 because it was not picked up in time.',
    severity: 'act',
    toiletName: 'Gents toilet 2',
    block: 'CTC Saket Block A',
    path: 'Delhi NCR › South Delhi › Ward 12',
    serial: 'LS-0001',
    tech: 'Carbon monoxide (CO) 1.63 ppm',
    age: '1h ago',
    state: 'handedUp',
    handedUpTo: 'Ward 12 coordinator',
  },
  {
    id: 'al-1185',
    headline: 'Smell starting to rise',
    detail: 'Not urgent — just keep an eye on it.',
    severity: 'watch',
    toiletName: 'Gents toilet 1',
    block: 'CTC Saket Block A',
    path: 'Delhi NCR › South Delhi › Ward 12',
    serial: 'LS-0040',
    tech: 'Odour level 3 of 5',
    age: '2h ago',
    state: 'new',
  },
  {
    id: 'al-1186',
    headline: 'Sensor stopped working',
    detail: 'No readings for 2 days — someone should check the unit.',
    severity: 'watch',
    toiletName: 'Ladies toilet 2',
    block: 'CTC Saket Block A',
    path: 'Delhi NCR › South Delhi › Ward 12',
    serial: 'LS-0293',
    tech: 'Device offline · last seen 2d ago',
    age: '2d ago',
    state: 'handedUp',
    handedUpTo: 'Ward 12 coordinator',
  },
  {
    id: 'al-1120',
    headline: 'Smell is back to normal',
    detail: 'Cleared on its own after cleaning. No action needed.',
    severity: 'info',
    toiletName: 'Ladies toilet 1',
    block: 'CTC Ajmeri Gate School Road',
    path: 'Delhi › Old Delhi › Ajmeri Gate',
    serial: 'LS-0807',
    tech: 'Ammonia (NH₃) back under warn',
    age: '8h ago',
    state: 'resolved',
  },
];

export function alertById(id: string) {
  return ALERTS.find((a) => a.id === id);
}
