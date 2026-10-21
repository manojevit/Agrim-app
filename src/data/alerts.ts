import { Alert } from './types';

export const ALERTS: Alert[] = [
  {
    id: 'al-1182', headline: 'This toilet smells bad', headlineHi: 'इस शौचालय से बदबू आ रही है',
    detail: 'Send someone to clean it.', detailHi: 'किसी को साफ़ करने भेजें।',
    severity: 'act', toiletName: 'Gents toilet 2', block: 'CTC Saket Block A',
    path: 'Delhi NCR › South Delhi › Ward 12', serial: 'LS-0001',
    tech: 'Ammonia (NH₃) 12.35 ppm · above critical', age: '20m ago', state: 'new',
  },
  {
    id: 'al-1183', headline: 'Air is very poor here', headlineHi: 'यहाँ हवा बहुत खराब है',
    detail: 'Dust and smell are high — clean soon.', detailHi: 'धूल और बदबू ज़्यादा है — जल्द साफ़ करें।',
    severity: 'act', toiletName: 'Ladies toilet 1', block: 'CTC Saket Block A',
    path: 'Delhi NCR › South Delhi › Ward 12', serial: 'LS-0002',
    tech: 'PM10 55.3 µg/m³ · PM2.5 33.2 µg/m³', age: '45m ago', state: 'onit',
  },
  {
    id: 'al-1184', headline: 'Nobody has answered yet', headlineHi: 'अभी तक किसी ने जवाब नहीं दिया',
    detail: 'Passed up to Ward 12 because it was not picked up in time.', detailHi: 'समय पर न उठाए जाने से Ward 12 को भेजा गया।',
    severity: 'act', toiletName: 'Gents toilet 2', block: 'CTC Saket Block A',
    path: 'Delhi NCR › South Delhi › Ward 12', serial: 'LS-0001',
    tech: 'Carbon monoxide (CO) 1.63 ppm', age: '1h ago', state: 'handedUp', handedUpTo: 'Ward 12 coordinator',
  },
  {
    id: 'al-1185', headline: 'Smell starting to rise', headlineHi: 'बदबू बढ़ने लगी है',
    detail: 'Not urgent — just keep an eye on it.', detailHi: 'ज़रूरी नहीं — बस ध्यान रखें।',
    severity: 'watch', toiletName: 'Gents toilet 1', block: 'CTC Saket Block A',
    path: 'Delhi NCR › South Delhi › Ward 12', serial: 'LS-0040',
    tech: 'Odour level 3 of 5', age: '2h ago', state: 'new',
  },
  {
    id: 'al-1186', headline: 'Sensor stopped working', headlineHi: 'सेंसर बंद हो गया',
    detail: 'No readings for 2 days — someone should check the unit.', detailHi: '2 दिन से कोई रीडिंग नहीं — यूनिट जाँचें।',
    severity: 'watch', toiletName: 'Ladies toilet 2', block: 'CTC Saket Block A',
    path: 'Delhi NCR › South Delhi › Ward 12', serial: 'LS-0293',
    tech: 'Device offline · last seen 2d ago', age: '2d ago', state: 'handedUp', handedUpTo: 'Ward 12 coordinator',
  },
  {
    id: 'al-1120', headline: 'Smell is back to normal', headlineHi: 'बदबू सामान्य हो गई',
    detail: 'Cleared on its own after cleaning. No action needed.', detailHi: 'सफ़ाई के बाद अपने-आप ठीक हुआ। कुछ करने की ज़रूरत नहीं।',
    severity: 'info', toiletName: 'Ladies toilet 1', block: 'CTC Ajmeri Gate School Road',
    path: 'Delhi › Old Delhi › Ajmeri Gate', serial: 'LS-0807',
    tech: 'Ammonia (NH₃) back under warn', age: '8h ago', state: 'resolved',
  },
];

export function alertById(id: string) {
  return ALERTS.find((a) => a.id === id);
}
