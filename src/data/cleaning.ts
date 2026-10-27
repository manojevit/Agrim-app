/**
 * The action layer — cleaners, the cleaning lifecycle, and the escalation chain.
 * This is what turns the monitoring app into one that actually fixes the problem:
 * see a bad toilet → send a cleaner (AI voice call) → watch it get cleaned.
 */
import { Device, DEVICES } from './devices';
import { RoleId } from './types';

export interface Cleaner {
  id: string;
  name: string;
  phone: string;
  blockId: string;
}

export const STAFF: Cleaner[] = [
  { id: 'c1', name: 'Ramesh', phone: '+91 98xxx 21145', blockId: 'saket-a' },
  { id: 'c2', name: 'Sunita', phone: '+91 98xxx 55012', blockId: 'ajmeri' },
];

export function cleanerForBlock(blockId: string): Cleaner | undefined {
  return STAFF.find((s) => s.blockId === blockId);
}

export const CALL_COST = '₹7';

/** A toilet needs a cleaner when it is online and the air/odour is bad. */
export function needsCleaning(d: Device): boolean {
  return d.online && ((d.odour ?? 0) >= 4 || (d.aqi ?? 0) >= 400);
}

export type CleanStage = 'idle' | 'needs' | 'enroute' | 'cleaned';

export interface CleanState {
  stage: CleanStage;
  mode?: 'auto' | 'manual';
  cleanerName?: string;
  calledAt?: string; // "2:14 pm"
  result?: 'answered' | 'no-answer';
  cleanedAt?: string;
  before?: { odour: number; aqi: number };
  after?: { odour: number; aqi: number };
}

/** Seed the cleaning board from the devices that are currently bad. */
export function initialCleanStates(): Record<string, CleanState> {
  const out: Record<string, CleanState> = {};
  for (const d of DEVICES) {
    if (!needsCleaning(d)) continue;
    const before = { odour: d.odour ?? 0, aqi: d.aqi ?? 0 };
    if (d.serial === 'LS-0002') {
      // Already auto-dispatched — demonstrates the automatic voice call.
      out[d.serial] = { stage: 'enroute', mode: 'auto', cleanerName: 'Ramesh', calledAt: '2:14 pm', result: 'answered', before };
    } else {
      out[d.serial] = { stage: 'needs', before };
    }
  }
  return out;
}

// ───────────────────────── Escalation chain ─────────────────────────

/** Who an alert travels through, bottom → top. */
export const CHAIN: RoleId[] = ['facility', 'block', 'district', 'regional', 'central'];

/** Published limit for each parameter, matched by the alert headline. */
export const PARAM_LIMIT: { match: string; limit: string }[] = [
  { match: 'PM10', limit: '50 µg/m³' },
  { match: 'PM2.5', limit: '30 µg/m³' },
  { match: 'CO', limit: '1 ppm' },
  { match: 'Methyl Mercaptan', limit: '0.1 ppm' },
  { match: 'Trimethylamine', limit: '0.3 ppm' },
  { match: 'NH', limit: '5 ppm' },
  { match: 'Odour', limit: 'level 3' },
];

export function limitFor(headline: string): string | undefined {
  return PARAM_LIMIT.find((p) => headline.includes(p.match))?.limit;
}
