/** The automated cleaner-call feature (AI voice). Matches the dashboard's Staff & calls. */

const HINDI_NUM = ['', 'ek', 'do', 'teen', 'chaar', 'paanch', 'chhah'];

/** The spoken Hindi message a cleaner actually hears on the phone. */
export function voiceMessage(count: number, building: string) {
  const n = HINDI_NUM[count] ?? String(count);
  return `Namaste. Yeh Agrim Suchak ki automatic soochna hai. ${building} mein, ${n} shauchaalay ki safaai zaroori hai. Kripaya wahaan jaakar safaai karein. Dhanyavaad.`;
}

/** Plain-English version of what the call says, for the operator to read. */
export function voiceMessageEnglish(count: number, building: string) {
  return `Hello. This is an automatic alert from Agrim Suchak. At ${building}, ${count} ${count === 1 ? 'toilet needs' : 'toilets need'} cleaning. Please go and clean them. Thank you.`;
}

export const CALL_COST = 'about ₹7 a call';

export interface CallRecord {
  id: string;
  target: string; // "Everyone (3)" | "Mohzaam"
  toilets: number;
  mode: 'auto' | 'manual';
  status: 'Completed' | 'No answer';
  when: string;
  cost: string;
}

export const CALL_HISTORY: CallRecord[] = [
  { id: 'c1', target: 'Mohzaam', toilets: 2, mode: 'auto', status: 'Completed', when: 'Today, 1:12 pm', cost: '₹7.38' },
  { id: 'c2', target: 'Everyone (3)', toilets: 1, mode: 'manual', status: 'Completed', when: 'Today, 8:30 am', cost: '₹6.90' },
  { id: 'c3', target: 'Pawan', toilets: 1, mode: 'manual', status: 'No answer', when: 'Yesterday, 6:05 pm', cost: '₹0.00' },
];
