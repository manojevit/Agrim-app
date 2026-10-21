import { StatusKey } from '@/theme';

export type RoleId =
  | 'cleaner'
  | 'facility'
  | 'block'
  | 'district'
  | 'regional'
  | 'central'
  | 'system';

export interface Role {
  id: RoleId;
  name: string; // e.g. "Facility operator"
  short: string; // e.g. "F"
  /** Plain one-liner describing what this person does. */
  blurb: string;
  /** Area label they are responsible for, used in the greeting. */
  area: string;
  /** Capabilities that unlock extra menu items / actions. */
  can: {
    writeRules: boolean; // Block+
    reports: boolean; // District+
    assistant: boolean; // District+
    admin: boolean; // Central/System
    deviceRegistry: boolean; // System only
  };
}

/** A toilet = one door on a block, watched by one sensor unit. */
export interface Toilet {
  id: string;
  serial: string; // LS-0001  (kept, but shown small)
  name: string; // "Gents toilet 2"
  nameHi: string;
  block: string; // "CTC Saket Block A"
  path: string; // "Delhi NCR › South Delhi › Ward 12"
  status: StatusKey;
  /** Plain-language headline a cleaner understands. */
  headline: string;
  headlineHi: string;
  /** Short reason in plain words. */
  reason: string;
  reasonHi: string;
  lastSeen: string; // "just now", "2d ago"
  // The science — shown only under "details"
  aqi: number | null;
  odour: number | null; // 1..5
  readings: Reading[];
  openAlerts: number;
}

export interface Reading {
  key: string; // "NH₃"
  plain: string; // "Ammonia (pee smell)"
  value: number;
  unit: string; // "ppm"
  level: StatusKey;
}

export interface Alert {
  id: string;
  /** Plain headline: what a person should understand. */
  headline: string; // "This toilet smells bad"
  headlineHi: string;
  detail: string; // "Send someone to clean it"
  detailHi: string;
  severity: 'act' | 'watch' | 'info';
  toiletName: string;
  block: string;
  path: string;
  serial: string;
  // technical, shown under a tap
  tech: string; // "NH₃ 12.35 ppm"
  age: string; // "31d ago"
  state: 'new' | 'onit' | 'handedUp' | 'resolved';
  handedUpTo?: string;
}

export interface CleaningJob {
  id: string;
  block: string;
  path: string;
  status: StatusKey; // priority of the block
  reason: string; // "2 toilets flagged this morning"
  lastCleaned: string; // "Yesterday 4:10pm" | "Never"
  visitsSince: number | null; // footfall since last clean
  done: boolean;
}

export interface CleaningLogEntry {
  id: string;
  block: string;
  when: string;
  note: string;
  by: string;
}

export interface Staff {
  id: string;
  name: string;
  phone: string;
  role: string; // "cleaner"
  block: string;
}

export interface EstateNode {
  id: string;
  name: string;
  level: 'state' | 'region' | 'district' | 'block';
  status: StatusKey;
  toilets: number;
  reporting: number;
  users: number;
  children?: EstateNode[];
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: string;
  area: string;
  state: 'active' | 'pending' | 'blocked';
  devices: number;
}
