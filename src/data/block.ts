import { ALERTS } from './alerts';
import { TOILETS } from './toilets';
import { StatusKey } from '@/theme';

/** The block coordinator runs a cluster of buildings (a ward). */
export const BLOCK = { name: 'Sunita', area: 'Ward 12, South Delhi' };

export interface BlockBuilding {
  id: string;
  name: string;
  path: string;
  status: StatusKey;
  toilets: number;
  reporting: number;
  needNow: number;
  openAlerts: number;
  handedUp: number;
  cleaners: number;
  headline: string;
}

export const BLOCK_BUILDINGS: BlockBuilding[] = [
  { id: 'saket-a', name: 'CTC Saket Block A', path: 'Ward 12', status: 'act', toilets: 5, reporting: 2, needNow: 2, openAlerts: 5, handedUp: 2, cleaners: 3, headline: '2 toilets need cleaning now' },
  { id: 'malviya', name: 'CTC Malviya Nagar Market', path: 'Ward 12', status: 'act', toilets: 4, reporting: 3, needNow: 1, openAlerts: 2, handedUp: 1, cleaners: 2, headline: '1 toilet needs cleaning now' },
  { id: 'saket-b', name: 'CTC Saket Block B', path: 'Ward 12', status: 'offline', toilets: 2, reporting: 0, needNow: 0, openAlerts: 0, handedUp: 0, cleaners: 0, headline: 'No sensors reporting · no staff set' },
  { id: 'hauz', name: 'CTC Hauz Khas Metro', path: 'Ward 12', status: 'watch', toilets: 3, reporting: 3, needNow: 0, openAlerts: 1, handedUp: 0, cleaners: 2, headline: 'One toilet getting worse' },
  { id: 'pushp', name: 'CTC Pushp Vihar Bus Stand', path: 'Ward 12', status: 'good', toilets: 3, reporting: 3, needNow: 0, openAlerts: 0, handedUp: 0, cleaners: 2, headline: 'All good' },
];

export function blockBuildingById(id: string) {
  return BLOCK_BUILDINGS.find((b) => b.id === id);
}

/** Toilets for a building (live data only exists for Saket Block A in the prototype). */
export function toiletsForBuilding(name: string) {
  return TOILETS.filter((t) => t.block === name);
}

export const blockAlerts = ALERTS;
export const blockHandedUp = ALERTS.filter((a) => a.state === 'handedUp');
