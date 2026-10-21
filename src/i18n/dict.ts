/**
 * Flat translation dictionary. English + Hindi.
 * Keys are dotted strings; values may contain {name} placeholders filled by t().
 * The Cleaner app is fully localised (the role that most needs Hindi).
 */
export type Lang = 'en' | 'hi';

type Dict = Record<string, string>;

const en: Dict = {
  'tab.myJobs': 'My jobs',
  'tab.done': 'Done',
  'tab.me': 'Me',

  'common.switch': 'Switch',
  'common.open': 'Open',

  'status.cleanNow': 'Clean now',
  'status.cleanSoon': 'Clean soon',
  'status.routine': 'Routine',
  'problem.act': 'Needs cleaning now',
  'problem.watch': 'Getting worse',
  'problem.routine': 'Routine clean',

  'type.Gents': 'Gents',
  'type.Ladies': 'Ladies',
  'type.Accessible': 'Accessible',
  'type.Unisex': 'Unisex',

  'cl.hi': 'Hi, {name}',
  'cl.buildingsIn': '{n} buildings in {area}',
  'cl.leftToClean': '{n} left to clean',
  'cl.finished': "You've finished {n} today. Keep going.",
  'cl.startWith': 'Start with the ones marked clean now.',
  'cl.cleanNow': 'Clean now',
  'cl.later': 'Later today',
  'cl.allDone': 'All done for now',
  'cl.allDoneSub': "Nothing needs cleaning right now. We'll alert you when it does.",
  'cl.ofN': 'of {n}',
  'cl.flagged': 'Flagged {t}',

  'job.gettingThere': 'Getting there',
  'job.getDirections': 'Get directions',
  'job.start': 'Start cleaning',
  'job.finishedLog': 'Finished? Log it',
  'job.addPhotoHint': "Add a photo so your supervisor can see it's done.",
  'job.takePhoto': 'Take a photo',
  'job.photoAdded': 'Photo added',
  'job.note': 'Note (optional)',
  'job.iveCleaned': "I've cleaned it",
  'job.addPhotoFinish': 'Add a photo to finish',
  'job.cleanedLogged': 'Cleaned and logged',
  'job.photoSaved': 'Photo saved as proof.',
  'job.backToJobs': 'Back to my jobs',
  'job.flaggedBy': 'Flagged by {by}, {t}',
  'job.noteLabel': 'Note',
  'by.sensor': 'the sensor',

  'done.cleanedToday': '{n} cleaned today',
  'done.cleanedAt': 'Cleaned {t}',
  'done.empty': 'Nothing logged yet today.',

  'me.cleaner': 'Cleaner',
  'me.myBuilding': 'My building',
  'me.myBuildings': 'My buildings',
  'me.myNumber': 'My number',
  'me.language': 'Language',
  'me.help': 'Help',
  'me.signOut': 'Sign out',
  'me.notifications': 'Notification settings',
  'me.pickLanguage': 'Choose language',

  'alert.cleanNow': 'Clean now',
  'alert.needsCleaning': 'needs cleaning now',
  'alert.viewJob': 'View the job',
  'alert.later': 'Later',
};

const hi: Dict = {
  'tab.myJobs': 'मेरे काम',
  'tab.done': 'पूरे',
  'tab.me': 'मैं',

  'common.switch': 'बदलें',
  'common.open': 'खोलें',

  'status.cleanNow': 'अभी साफ़ करें',
  'status.cleanSoon': 'जल्द साफ़ करें',
  'status.routine': 'नियमित',
  'problem.act': 'अभी सफ़ाई चाहिए',
  'problem.watch': 'बिगड़ रहा है',
  'problem.routine': 'नियमित सफ़ाई',

  'type.Gents': 'पुरुष',
  'type.Ladies': 'महिला',
  'type.Accessible': 'दिव्यांग',
  'type.Unisex': 'सभी',

  'cl.hi': 'नमस्ते, {name}',
  'cl.buildingsIn': '{area} में {n} इमारतें',
  'cl.leftToClean': '{n} साफ़ करने बाकी',
  'cl.finished': 'आपने आज {n} पूरे किए। जारी रखें।',
  'cl.startWith': 'पहले "अभी साफ़ करें" वाले करें।',
  'cl.cleanNow': 'अभी साफ़ करें',
  'cl.later': 'आज बाद में',
  'cl.allDone': 'फ़िलहाल सब हो गया',
  'cl.allDoneSub': 'अभी कुछ साफ़ करने की ज़रूरत नहीं। ज़रूरत होने पर हम बताएँगे।',
  'cl.ofN': '{n} में से',
  'cl.flagged': '{t} चिह्नित',

  'job.gettingThere': 'कैसे पहुँचें',
  'job.getDirections': 'रास्ता देखें',
  'job.start': 'सफ़ाई शुरू करें',
  'job.finishedLog': 'हो गया? दर्ज करें',
  'job.addPhotoHint': 'फ़ोटो जोड़ें ताकि सुपरवाइज़र देख सके कि हो गया।',
  'job.takePhoto': 'फ़ोटो लें',
  'job.photoAdded': 'फ़ोटो जोड़ी गई',
  'job.note': 'टिप्पणी (वैकल्पिक)',
  'job.iveCleaned': 'मैंने साफ़ कर दिया',
  'job.addPhotoFinish': 'पूरा करने के लिए फ़ोटो जोड़ें',
  'job.cleanedLogged': 'साफ़ किया और दर्ज किया',
  'job.photoSaved': 'सबूत के तौर पर फ़ोटो सेव हुई।',
  'job.backToJobs': 'मेरे कामों पर वापस',
  'job.flaggedBy': '{by} द्वारा चिह्नित, {t}',
  'job.noteLabel': 'टिप्पणी',
  'by.sensor': 'सेंसर',

  'done.cleanedToday': 'आज {n} साफ़ किए',
  'done.cleanedAt': '{t} साफ़ किया',
  'done.empty': 'आज अभी तक कुछ दर्ज नहीं।',

  'me.cleaner': 'सफ़ाईकर्मी',
  'me.myBuilding': 'मेरी इमारत',
  'me.myBuildings': 'मेरी इमारतें',
  'me.myNumber': 'मेरा नंबर',
  'me.language': 'भाषा',
  'me.help': 'मदद',
  'me.signOut': 'साइन आउट',
  'me.notifications': 'सूचना सेटिंग्स',
  'me.pickLanguage': 'भाषा चुनें',

  'alert.cleanNow': 'अभी साफ़ करें',
  'alert.needsCleaning': 'को अभी सफ़ाई चाहिए',
  'alert.viewJob': 'काम देखें',
  'alert.later': 'बाद में',
};

export const DICT: Record<Lang, Dict> = { en, hi };

export function translate(lang: Lang, key: string, params?: Record<string, string | number>) {
  let s = DICT[lang]?.[key] ?? DICT.en[key] ?? key;
  if (params) for (const k of Object.keys(params)) s = s.split(`{${k}}`).join(String(params[k]));
  return s;
}
