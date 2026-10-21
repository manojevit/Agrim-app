import { Toilet } from './types';

const r = (key: string, plain: string, value: number, unit: string, level: Toilet['readings'][number]['level']) => ({
  key, plain, value, unit, level,
});

export const TOILETS: Toilet[] = [
  {
    id: 'ls-0001', serial: 'LS-0001', name: 'Gents toilet 2', nameHi: 'पुरुष शौचालय 2',
    block: 'CTC Saket Block A', path: 'Delhi NCR › South Delhi › Ward 12', status: 'act',
    headline: 'Smells bad — clean now', headlineHi: 'बदबू आ रही है — अभी साफ़ करें',
    reason: 'Strong pee and drain smell for over an hour.', reasonHi: 'एक घंटे से तेज़ पेशाब और नाली की बदबू।',
    lastSeen: 'just now', aqi: 500, odour: 5, openAlerts: 6,
    readings: [
      r('NH₃', 'Ammonia (pee smell)', 7.61, 'ppm', 'act'),
      r('H₂S', 'Drain / sewer smell', 2.31, 'ppm', 'watch'),
      r('PM2.5', 'Fine dust', 30.5, 'µg/m³', 'watch'),
      r('PM10', 'Dust', 33.2, 'µg/m³', 'good'),
      r('Temp', 'Temperature', 31, '°C', 'good'),
      r('Humidity', 'Humidity', 58, '%', 'good'),
    ],
  },
  {
    id: 'ls-0002', serial: 'LS-0002', name: 'Ladies toilet 1', nameHi: 'महिला शौचालय 1',
    block: 'CTC Saket Block A', path: 'Delhi NCR › South Delhi › Ward 12', status: 'act',
    headline: 'Smells bad — clean now', headlineHi: 'बदबू आ रही है — अभी साफ़ करें',
    reason: 'Air quality is very poor right now.', reasonHi: 'अभी वायु गुणवत्ता बहुत खराब है।',
    lastSeen: '2m ago', aqi: 497, odour: 4, openAlerts: 1,
    readings: [
      r('NH₃', 'Ammonia (pee smell)', 7.06, 'ppm', 'act'),
      r('H₂S', 'Drain / sewer smell', 2.5, 'ppm', 'watch'),
      r('PM2.5', 'Fine dust', 35.8, 'µg/m³', 'watch'),
      r('PM10', 'Dust', 69.4, 'µg/m³', 'watch'),
      r('Temp', 'Temperature', 30, '°C', 'good'),
      r('Humidity', 'Humidity', 61, '%', 'good'),
    ],
  },
  {
    id: 'ls-0040', serial: 'LS-0040', name: 'Gents toilet 1', nameHi: 'पुरुष शौचालय 1',
    block: 'CTC Saket Block A', path: 'Delhi NCR › South Delhi › Ward 12', status: 'watch',
    headline: 'Getting worse — keep an eye', headlineHi: 'बिगड़ रहा है — ध्यान रखें',
    reason: 'Smell slowly rising since lunch.', reasonHi: 'दोपहर से बदबू धीरे-धीरे बढ़ रही है।',
    lastSeen: '5m ago', aqi: 212, odour: 3, openAlerts: 0,
    readings: [
      r('NH₃', 'Ammonia (pee smell)', 3.1, 'ppm', 'watch'),
      r('H₂S', 'Drain / sewer smell', 0.9, 'ppm', 'good'),
      r('PM2.5', 'Fine dust', 22.0, 'µg/m³', 'good'),
      r('PM10', 'Dust', 28.4, 'µg/m³', 'good'),
      r('Temp', 'Temperature', 29, '°C', 'good'),
      r('Humidity', 'Humidity', 55, '%', 'good'),
    ],
  },
  {
    id: 'ls-0041', serial: 'LS-0041', name: 'Accessible toilet', nameHi: 'दिव्यांग शौचालय',
    block: 'CTC Saket Block A', path: 'Delhi NCR › South Delhi › Ward 12', status: 'good',
    headline: 'All good', headlineHi: 'सब ठीक है',
    reason: 'Air is clean and fresh.', reasonHi: 'हवा साफ़ और ताज़ा है।',
    lastSeen: 'just now', aqi: 46, odour: 1, openAlerts: 0,
    readings: [
      r('NH₃', 'Ammonia (pee smell)', 0.4, 'ppm', 'good'),
      r('H₂S', 'Drain / sewer smell', 0.1, 'ppm', 'good'),
      r('PM2.5', 'Fine dust', 12.1, 'µg/m³', 'good'),
      r('PM10', 'Dust', 15.0, 'µg/m³', 'good'),
      r('Temp', 'Temperature', 28, '°C', 'good'),
      r('Humidity', 'Humidity', 52, '%', 'good'),
    ],
  },
  {
    id: 'ls-0293', serial: 'LS-0293', name: 'Ladies toilet 2', nameHi: 'महिला शौचालय 2',
    block: 'CTC Saket Block A', path: 'Delhi NCR › South Delhi › Ward 12', status: 'offline',
    headline: 'Sensor stopped — needs a check', headlineHi: 'सेंसर बंद — जाँच ज़रूरी',
    reason: 'No reading for 2 days. Someone should look.', reasonHi: '2 दिन से कोई रीडिंग नहीं। किसी को देखना चाहिए।',
    lastSeen: '2d ago', aqi: null, odour: null, openAlerts: 1, readings: [],
  },
  {
    id: 'ls-0807', serial: 'LS-0807', name: 'Gents toilet 3', nameHi: 'पुरुष शौचालय 3',
    block: 'CTC Ajmeri Gate School Road', path: 'Delhi › Old Delhi › Ajmeri Gate', status: 'good',
    headline: 'All good', headlineHi: 'सब ठीक है',
    reason: 'Nothing to do here.', reasonHi: 'यहाँ कुछ करने को नहीं।',
    lastSeen: '1m ago', aqi: 67, odour: 2, openAlerts: 0,
    readings: [
      r('NH₃', 'Ammonia (pee smell)', 1.0, 'ppm', 'good'),
      r('H₂S', 'Drain / sewer smell', 0.2, 'ppm', 'good'),
      r('PM2.5', 'Fine dust', 14.2, 'µg/m³', 'good'),
      r('PM10', 'Dust', 19.1, 'µg/m³', 'good'),
      r('Temp', 'Temperature', 27, '°C', 'good'),
      r('Humidity', 'Humidity', 49, '%', 'good'),
    ],
  },
  {
    id: 'ls-0808', serial: 'LS-0808', name: 'Ladies toilet 1', nameHi: 'महिला शौचालय 1',
    block: 'CTC Ajmeri Gate School Road', path: 'Delhi › Old Delhi › Ajmeri Gate', status: 'never',
    headline: 'Not set up yet', headlineHi: 'अभी सेट नहीं हुआ',
    reason: 'Sensor fitted but never sent a reading.', reasonHi: 'सेंसर लगा है पर कभी रीडिंग नहीं भेजी।',
    lastSeen: '—', aqi: null, odour: null, openAlerts: 0, readings: [],
  },
];

export function toiletById(id: string) {
  return TOILETS.find((t) => t.id === id);
}
