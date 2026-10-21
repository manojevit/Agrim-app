import { AppUser, EstateNode } from './types';

/** Estate tree for District+ roles and the admin hierarchy screen. */
export const ESTATE: EstateNode[] = [
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR',
    level: 'region',
    status: 'act',
    toilets: 18,
    reporting: 2,
    users: 7,
    children: [
      {
        id: 'south-delhi',
        name: 'South Delhi',
        level: 'district',
        status: 'act',
        toilets: 18,
        reporting: 2,
        users: 4,
        children: [
          {
            id: 'ward-12',
            name: 'Ward 12',
            level: 'district',
            status: 'act',
            toilets: 7,
            reporting: 2,
            users: 2,
            children: [
              { id: 'saket-a', name: 'CTC Saket Block A', level: 'block', status: 'act', toilets: 5, reporting: 2, users: 1 },
              { id: 'saket-b', name: 'CTC Saket Block B', level: 'block', status: 'watch', toilets: 2, reporting: 0, users: 0 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'old-delhi',
    name: 'Old Delhi',
    level: 'district',
    status: 'watch',
    toilets: 12,
    reporting: 1,
    users: 3,
    children: [
      { id: 'ajmeri-gate', name: 'CTC Ajmeri Gate School Road', level: 'block', status: 'watch', toilets: 3, reporting: 1, users: 1 },
    ],
  },
];

/** Headline numbers per role area, used on dashboards. */
export const ESTATE_STATS = {
  cleaner: { reporting: '3 of 5', reportingN: 3, totalN: 5, alerts: 8, critical: 2, blocks: 1 },
  facility: { reporting: '3 of 5', reportingN: 3, totalN: 5, alerts: 8, critical: 2, blocks: 1 },
  block: { reporting: '2 of 7', reportingN: 2, totalN: 7, alerts: 12, critical: 2, blocks: 2 },
  district: { reporting: '2 of 59', reportingN: 2, totalN: 59, alerts: 22, critical: 6, blocks: 5 },
  regional: { reporting: '2 of 69', reportingN: 2, totalN: 69, alerts: 25, critical: 6, blocks: 6 },
  central: { reporting: '2 of 6612', reportingN: 2, totalN: 6612, alerts: 107, critical: 9, blocks: 1237 },
  system: { reporting: '2 of 6612', reportingN: 2, totalN: 6612, alerts: 107, critical: 9, blocks: 1237 },
} as const;

export const USERS: AppUser[] = [
  { id: 'u-1', name: 'Asha Verma', email: 'central@example.com', role: 'Central manager', area: 'Laadli Foundations', state: 'active', devices: 6612 },
  { id: 'u-2', name: 'District Coordinator', email: 'district@example.com', role: 'District coordinator', area: 'South Delhi', state: 'active', devices: 28 },
  { id: 'u-3', name: 'Block Coordinator', email: 'block@example.com', role: 'Block coordinator', area: 'Ward 12', state: 'active', devices: 28 },
  { id: 'u-4', name: 'Dev Operator', email: 'operator@example.com', role: 'Facility operator', area: 'CTC Saket Block A', state: 'active', devices: 5 },
  { id: 'u-5', name: 'Manoj', email: 'manoj@evitpl.com', role: 'Block coordinator', area: 'CTC Ajmeri Gate', state: 'pending', devices: 0 },
  { id: 'u-6', name: 'AAC Probe', email: 'aac@example.com', role: 'No role yet', area: 'No area assigned', state: 'blocked', devices: 0 },
];
