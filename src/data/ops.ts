import { StatusKey } from '@/theme';

/** Alert rules — when a toilet should alert. Plain-language, thresholds under it. */
export interface AlertRule {
  id: string;
  metric: string; // "Smell", "Air quality"
  plain: string; // "Toilet smells bad"
  appliesTo: string; // scope
  warn: string;
  critical: string;
  channels: string; // "Push, Email"
  enabled: boolean;
}

export const ALERT_RULES: AlertRule[] = [
  { id: 'r1', metric: 'Smell', plain: 'Toilet smells bad', appliesTo: 'Ward 12 — all toilets', warn: 'Level 3 of 5', critical: 'Level 4 of 5', channels: 'Push, Email', enabled: true },
  { id: 'r2', metric: 'Air quality', plain: 'Air gets very poor', appliesTo: 'Ward 12 — all toilets', warn: 'Index 200', critical: 'Index 300', channels: 'Push, Email', enabled: true },
  { id: 'r3', metric: 'Sensor offline', plain: 'Sensor stops reporting', appliesTo: 'CTC Saket Block A', warn: 'After 1 hour', critical: 'After 3 hours', channels: 'Push, Email', enabled: false },
];

/** Auto-call config shown on Staff & calls. */
export const AUTO_CALL = {
  smell: { on: false, ringAt: 'Level 4 of 5', forAtLeast: '2 hours', notAgainFor: '4 hours' },
  air: { on: false, ringAt: 'Index 300', forAtLeast: '2 hours', notAgainFor: '4 hours' },
  quietHours: '9 pm – 7 am',
};

export interface Export {
  id: string;
  scope: string;
  format: 'PDF' | 'CSV';
  period: string;
  status: 'Ready' | 'Running';
  when: string;
}

export const RECENT_EXPORTS: Export[] = [
  { id: 'e1', scope: 'South Delhi', format: 'PDF', period: '1–7 Oct 2026', status: 'Ready', when: 'Today, 9:12 am' },
  { id: 'e2', scope: 'Ward 12', format: 'CSV', period: 'Sept 2026', status: 'Ready', when: '14 Oct, 4:30 pm' },
  { id: 'e3', scope: 'South Delhi', format: 'PDF', period: 'Last 24 hours', status: 'Running', when: 'Just now' },
];

export const REPORT_SCOPES = ['South Delhi', 'Ward 12', 'CTC Saket Block A'];
export const REPORT_PERIODS = ['Today', 'Last 7 days', 'Last 30 days', 'This month'];
export type { StatusKey };
