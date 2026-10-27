/**
 * Device + estate data for the unified app (v0.6).
 * Faithful to the original: real device serials (LS-xxxx), the full sensor
 * parameter set, the block hierarchy, and air-quality / odour figures.
 * Dummy data, but shaped exactly like the screenshots.
 */

export type ReadingKey =
  | 'NH3'
  | 'H2S'
  | 'TMA'
  | 'MM'
  | 'CO'
  | 'PM1'
  | 'PM2_5'
  | 'PM10'
  | 'TVOC';

export interface Reading {
  key: ReadingKey;
  /** Display name, e.g. "NH₃", "PM2.5". */
  name: string;
  /** Plain hint shown under a tap, e.g. "Ammonia — the pee smell". */
  hint: string;
  value: number;
  unit: string; // "ppm", "µg/m³", "ppb"
  /** good | watch | warn | act — drives the dot colour. */
  level: 'good' | 'watch' | 'warn' | 'act';
}

export interface Block {
  id: string;
  name: string; // "CTC Saket Block A"
  path: string; // "Delhi NCR › South Delhi › Ward 12"
  ward: string; // "Ward 12"
  area: string; // "South Delhi"
  city: string; // "Delhi NCR"
  lat: number;
  lng: number;
}

export interface Device {
  serial: string; // "LS-0001"
  label?: string; // "Block A — Toilet 3"
  blockId: string;
  online: boolean;
  lastSeen: string; // "just now", "2m ago", "2d ago", "—"
  aqi: number | null; // 0..500
  odour: number | null; // 1..5
  model: string; // "EnviroSense-ST"
  hardwareRev: string; // "0.6.0"
  firmware: string; // "1.4.2"
  readings: Reading[];
  /** 24h AQI trend, oldest → newest. */
  aqiTrend: number[];
}

export interface Alert {
  id: string;
  /** "PM10 high", "NH₃ high", "Device offline" */
  headline: string;
  type: 'threshold' | 'offline' | 'smoke';
  severity: 'act' | 'watch' | 'info';
  critical: boolean;
  deviceSerial: string;
  blockName: string;
  ward: string;
  /** "55.3 µg/m³", "12.35 ppm" — empty for offline. */
  value: string;
  age: string; // "31d ago"
  state: 'active' | 'resolved';
  handedUpward: boolean;
}

// ───────────────────────── Blocks ─────────────────────────

export const BLOCKS: Block[] = [
  {
    id: 'saket-a',
    name: 'CTC Saket Block A',
    path: 'Delhi NCR › South Delhi › Ward 12',
    ward: 'Ward 12',
    area: 'South Delhi',
    city: 'Delhi NCR',
    lat: 28.5245,
    lng: 77.206,
  },
  {
    id: 'ajmeri',
    name: 'CTC Ajmeri Gate School Road',
    path: 'Delhi › Old Delhi › Ajmeri Gate',
    ward: 'Ajmeri Gate',
    area: 'Old Delhi',
    city: 'Delhi',
    lat: 28.6425,
    lng: 77.227,
  },
];

export function blockById(id: string): Block | undefined {
  return BLOCKS.find((b) => b.id === id);
}

// ───────────────────────── Readings helper ─────────────────────────

const READING_META: Record<ReadingKey, { name: string; hint: string; unit: string }> = {
  NH3: { name: 'NH₃', hint: 'Ammonia — the pee smell', unit: 'ppm' },
  H2S: { name: 'H₂S', hint: 'Hydrogen sulphide — the drain smell', unit: 'ppm' },
  TMA: { name: 'Trimethylamine', hint: 'A fishy, stale odour', unit: 'ppm' },
  MM: { name: 'Methyl Mercaptan', hint: 'A sharp rotten smell', unit: 'ppm' },
  CO: { name: 'CO', hint: 'Carbon monoxide', unit: 'ppm' },
  PM1: { name: 'PM1', hint: 'Fine dust (1 micron)', unit: 'µg/m³' },
  PM2_5: { name: 'PM2.5', hint: 'Fine dust (2.5 micron)', unit: 'µg/m³' },
  PM10: { name: 'PM10', hint: 'Coarse dust (10 micron)', unit: 'µg/m³' },
  TVOC: { name: 'TVOC', hint: 'Total volatile organic compounds', unit: 'ppb' },
};

const THRESHOLDS: Record<ReadingKey, [number, number, number]> = {
  // [watch, warn, act] — at/over each value the level steps up
  NH3: [4, 8, 12],
  H2S: [1.5, 3, 5],
  TMA: [0.3, 0.6, 1],
  MM: [0.1, 0.2, 0.3],
  CO: [1, 2, 4],
  PM1: [20, 40, 60],
  PM2_5: [30, 60, 90],
  PM10: [50, 100, 150],
  TVOC: [150, 300, 500],
};

function levelFor(key: ReadingKey, value: number): Reading['level'] {
  const [w, wn, a] = THRESHOLDS[key];
  if (value >= a) return 'act';
  if (value >= wn) return 'warn';
  if (value >= w) return 'watch';
  return 'good';
}

function reading(key: ReadingKey, value: number): Reading {
  const m = READING_META[key];
  return { key, name: m.name, hint: m.hint, value, unit: m.unit, level: levelFor(key, value) };
}

/** Build the standard parameter set for a device from raw values. */
function readings(v: Partial<Record<ReadingKey, number>>): Reading[] {
  const order: ReadingKey[] = ['NH3', 'H2S', 'TMA', 'MM', 'CO', 'PM1', 'PM2_5', 'PM10', 'TVOC'];
  return order.filter((k) => v[k] != null).map((k) => reading(k, v[k] as number));
}

// ───────────────────────── Devices ─────────────────────────

export const DEVICES: Device[] = [
  {
    serial: 'LS-0001',
    label: 'Block A — Toilet 1',
    blockId: 'saket-a',
    online: true,
    lastSeen: 'just now',
    aqi: 500,
    odour: 3,
    model: 'EnviroSense-ST',
    hardwareRev: '0.6.0',
    firmware: '1.4.2',
    readings: readings({ NH3: 7.61, H2S: 2.31, TMA: 0.51, MM: 0.23, CO: 1.63, PM1: 13.1, PM2_5: 30.5, PM10: 33.2, TVOC: 221 }),
    aqiTrend: [462, 470, 455, 438, 480, 466, 472, 458, 468, 490, 476, 488, 495, 482, 498, 500],
  },
  {
    serial: 'LS-0002',
    label: 'Block A — Toilet 2',
    blockId: 'saket-a',
    online: true,
    lastSeen: '2m ago',
    aqi: 497,
    odour: 4,
    model: 'EnviroSense-ST',
    hardwareRev: '0.6.0',
    firmware: '1.4.2',
    readings: readings({ NH3: 7.06, H2S: 2.5, TMA: 2.21, MM: 0.2, CO: 1.1, PM1: 16.2, PM2_5: 35.8, PM10: 69.4, TVOC: 208 }),
    aqiTrend: [455, 470, 448, 420, 465, 452, 460, 440, 470, 480, 462, 475, 488, 470, 492, 497],
  },
  {
    serial: 'LS-0293', label: 'Block A — Toilet 3', blockId: 'saket-a', online: false, lastSeen: '—',
    aqi: null, odour: null, model: 'EnviroSense-ST', hardwareRev: '0.6.0', firmware: '1.4.0',
    readings: [], aqiTrend: [],
  },
  {
    serial: 'LS-0294', blockId: 'saket-a', online: false, lastSeen: '—',
    aqi: null, odour: null, model: 'EnviroSense-ST', hardwareRev: '0.6.0', firmware: '1.4.0',
    readings: [], aqiTrend: [],
  },
  {
    serial: 'LS-0295', blockId: 'saket-a', online: false, lastSeen: '—',
    aqi: null, odour: null, model: 'EnviroSense-ST', hardwareRev: '0.6.0', firmware: '1.4.0',
    readings: [], aqiTrend: [],
  },
  {
    serial: 'LS-0807', blockId: 'saket-a', online: false, lastSeen: '2d ago',
    aqi: null, odour: null, model: 'EnviroSense-ST', hardwareRev: '0.5.0', firmware: '1.3.8',
    readings: [], aqiTrend: [],
  },
  {
    serial: 'LS-0808', blockId: 'saket-a', online: false, lastSeen: '2d ago',
    aqi: null, odour: null, model: 'EnviroSense-ST', hardwareRev: '0.5.0', firmware: '1.3.8',
    readings: [], aqiTrend: [],
  },
  {
    serial: 'LS-32482796',
    label: 'Gate unit',
    blockId: 'ajmeri',
    online: true,
    lastSeen: '5m ago',
    aqi: 182,
    odour: 2,
    model: 'EnviroSense-ST',
    hardwareRev: '0.6.0',
    firmware: '1.4.2',
    readings: readings({ NH3: 3.2, H2S: 1.1, TMA: 0.22, MM: 0.08, CO: 0.6, PM1: 9.4, PM2_5: 22.1, PM10: 41.0, TVOC: 120 }),
    aqiTrend: [150, 162, 158, 170, 166, 174, 168, 180, 176, 184, 178, 186, 180, 188, 182, 182],
  },
  {
    serial: 'LS-R19-000994',
    blockId: 'ajmeri',
    online: true,
    lastSeen: 'just now',
    aqi: 96,
    odour: 1,
    model: 'EnviroSense-ST',
    hardwareRev: '0.6.0',
    firmware: '1.4.2',
    readings: readings({ NH3: 1.4, H2S: 0.6, TMA: 0.1, MM: 0.03, CO: 0.3, PM1: 6.1, PM2_5: 14.2, PM10: 28.5, TVOC: 78 }),
    aqiTrend: [88, 92, 90, 95, 93, 98, 94, 99, 96, 100, 95, 98, 94, 97, 95, 96],
  },
  {
    serial: 'LS-R19-000995', blockId: 'ajmeri', online: false, lastSeen: '3d ago',
    aqi: null, odour: null, model: 'EnviroSense-ST', hardwareRev: '0.5.0', firmware: '1.3.8',
    readings: [], aqiTrend: [],
  },
];

export function deviceBySerial(serial: string): Device | undefined {
  return DEVICES.find((d) => d.serial === serial);
}

export function devicesForBlock(blockId: string): Device[] {
  return DEVICES.filter((d) => d.blockId === blockId);
}

// ───────────────────────── Alerts ─────────────────────────

export const ALERTS: Alert[] = [
  { id: 'a1', headline: 'PM10 high', type: 'threshold', severity: 'act', critical: true, deviceSerial: 'LS-0001', blockName: 'CTC Saket Block A', ward: 'Ward 12', value: '55.3 µg/m³', age: '31d ago', state: 'active', handedUpward: true },
  { id: 'a2', headline: 'PM2.5 high', type: 'threshold', severity: 'act', critical: true, deviceSerial: 'LS-0001', blockName: 'CTC Saket Block A', ward: 'Ward 12', value: '33.2 µg/m³', age: '31d ago', state: 'active', handedUpward: true },
  { id: 'a3', headline: 'CO high', type: 'threshold', severity: 'act', critical: true, deviceSerial: 'LS-0001', blockName: 'CTC Saket Block A', ward: 'Ward 12', value: '1.63 ppm', age: '31d ago', state: 'active', handedUpward: true },
  { id: 'a4', headline: 'Methyl Mercaptan high', type: 'threshold', severity: 'act', critical: true, deviceSerial: 'LS-0001', blockName: 'CTC Saket Block A', ward: 'Ward 12', value: '0.14 ppm', age: '31d ago', state: 'active', handedUpward: true },
  { id: 'a5', headline: 'Trimethylamine high', type: 'threshold', severity: 'act', critical: true, deviceSerial: 'LS-0001', blockName: 'CTC Saket Block A', ward: 'Ward 12', value: '0.25 ppm', age: '31d ago', state: 'active', handedUpward: true },
  { id: 'a6', headline: 'NH₃ high', type: 'threshold', severity: 'act', critical: true, deviceSerial: 'LS-0001', blockName: 'CTC Saket Block A', ward: 'Ward 12', value: '12.35 ppm', age: '31d ago', state: 'active', handedUpward: true },
  { id: 'a7', headline: 'Odour high', type: 'smoke', severity: 'watch', critical: false, deviceSerial: 'LS-0002', blockName: 'CTC Saket Block A', ward: 'Ward 12', value: 'level 4', age: '2h ago', state: 'active', handedUpward: false },
  { id: 'a8', headline: 'Device offline', type: 'offline', severity: 'watch', critical: false, deviceSerial: 'LS-0293', blockName: 'CTC Saket Block A', ward: 'Ward 12', value: '', age: '2d ago', state: 'active', handedUpward: false },
  { id: 'a9', headline: 'NH₃ high', type: 'threshold', severity: 'act', critical: false, deviceSerial: 'LS-0002', blockName: 'CTC Saket Block A', ward: 'Ward 12', value: '7.06 ppm', age: '1h ago', state: 'resolved', handedUpward: false },
  { id: 'a10', headline: 'Device offline', type: 'offline', severity: 'info', critical: false, deviceSerial: 'LS-R19-000995', blockName: 'CTC Ajmeri Gate School Road', ward: 'Ajmeri Gate', value: '', age: '17h ago', state: 'resolved', handedUpward: false },
];

export function alertById(id: string): Alert | undefined {
  return ALERTS.find((a) => a.id === id);
}

// ───────────────────────── Summary (per the greeting figures) ─────────────────────────

export interface Summary {
  devicesReporting: number;
  devicesTotal: number;
  activeAlerts: number;
  critical: number;
  avgAqi: number;
  odourIndex: number;
  blocks: number;
  healthy: number;
  needAttention: number;
  silent: number;
  neverReported: number;
}

/** Headline figures for the Home dashboard. */
export function summary(): Summary {
  const total = DEVICES.length;
  const reporting = DEVICES.filter((d) => d.online).length;
  const online = DEVICES.filter((d) => d.online && d.aqi != null);
  const avgAqi = online.length ? Math.round(online.reduce((s, d) => s + (d.aqi as number), 0) / online.length) : 0;
  const maxOdour = online.reduce((m, d) => Math.max(m, d.odour ?? 0), 0);
  const active = ALERTS.filter((a) => a.state === 'active');
  return {
    devicesReporting: reporting,
    devicesTotal: total,
    activeAlerts: active.length,
    critical: active.filter((a) => a.critical).length,
    avgAqi,
    odourIndex: maxOdour,
    blocks: BLOCKS.length,
    healthy: online.filter((d) => (d.aqi as number) <= 100).length,
    needAttention: online.filter((d) => (d.aqi as number) > 200).length,
    silent: DEVICES.filter((d) => !d.online).length,
    neverReported: DEVICES.filter((d) => !d.online && d.lastSeen === '—').length,
  };
}
