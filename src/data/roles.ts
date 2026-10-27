import { Role, RoleId } from './types';

/**
 * The six roles. Each person = role + area, and only ever sees their own area.
 * `can` flags drive which menu items and actions appear.
 */
export const ROLES: Record<RoleId, Role> = {
  cleaner: {
    id: 'cleaner',
    name: 'Cleaner',
    short: 'CL',
    blurb: 'Cleans the toilets on the ground.',
    area: 'CTC Saket Block A',
    can: { writeRules: false, reports: false, assistant: false, admin: false, deviceRegistry: false },
  },
  facility: {
    id: 'facility',
    name: 'Facility operator',
    short: 'F',
    blurb: 'Looks after the toilets in one building.',
    area: 'CTC Saket Block A',
    can: { writeRules: false, reports: false, assistant: false, admin: false, deviceRegistry: false },
  },
  block: {
    id: 'block',
    name: 'Block coordinator',
    short: 'B',
    blurb: 'Runs a cluster of buildings and sets the cleaning rules.',
    area: 'Ward 12, South Delhi',
    can: { writeRules: true, reports: false, assistant: false, admin: false, deviceRegistry: false },
  },
  district: {
    id: 'district',
    name: 'District coordinator',
    short: 'D',
    blurb: 'Watches every block in the district and pulls reports.',
    area: 'South Delhi',
    can: { writeRules: true, reports: true, assistant: true, admin: false, deviceRegistry: false },
  },
  regional: {
    id: 'regional',
    name: 'Regional supervisor',
    short: 'R',
    blurb: 'Oversees districts across the region.',
    area: 'Delhi NCR',
    can: { writeRules: true, reports: true, assistant: true, admin: false, deviceRegistry: false },
  },
  central: {
    id: 'central',
    name: 'Central manager',
    short: 'C',
    blurb: 'Manages people, roles and the whole estate.',
    area: 'Laadli Foundations',
    can: { writeRules: true, reports: true, assistant: true, admin: true, deviceRegistry: false },
  },
  system: {
    id: 'system',
    name: 'System administrator',
    short: 'S',
    blurb: 'Runs the platform: devices, firmware and billing.',
    area: 'Whole platform',
    can: { writeRules: true, reports: true, assistant: true, admin: true, deviceRegistry: true },
  },
};

/** Supervisor roles that log in to the app (no cleaner — client never asked for it). */
export const ROLE_ORDER: RoleId[] = ['facility', 'block', 'district', 'regional', 'central'];

/** Every supervisor uses the one shared app; the screens adapt to their area. */
export const APP_ROLES: RoleId[] = ['facility', 'block', 'district', 'regional', 'central'];

/** One unified app for everyone. */
export function homeRouteFor(_id: RoleId): '/(tabs)' {
  return '/(tabs)';
}

/** A believable signed-in person for each role, so the app feels specific. */
export function personForRole(id: RoleId): { name: string; email: string } {
  const map: Record<RoleId, { name: string; email: string }> = {
    cleaner: { name: 'Ramesh Kumar', email: 'cleaner@example.com' },
    facility: { name: 'Anil Verma', email: 'facility@example.com' },
    block: { name: 'Pooja Rani', email: 'block@example.com' },
    district: { name: 'Sanjay Mehta', email: 'district@example.com' },
    regional: { name: 'Kavita Nair', email: 'regional@example.com' },
    central: { name: 'Admin', email: 'central@example.com' },
    system: { name: 'System Admin', email: 'system@example.com' },
  };
  return map[id];
}

/** The account decides the role (as a real backend would) — inferred from the email. */
export function roleFromEmail(email: string): RoleId {
  const e = email.trim().toLowerCase();
  if (e.startsWith('block')) return 'block';
  if (e.startsWith('district')) return 'district';
  if (e.startsWith('regional')) return 'regional';
  if (e.startsWith('central')) return 'central';
  if (e.startsWith('system') || e.startsWith('admin')) return 'central';
  return 'facility';
}
