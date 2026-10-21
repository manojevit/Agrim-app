/**
 * English strings. Structured so a Hindi file (hi.ts) can mirror these keys later.
 * Keep UI text out of components — pull from here via t().
 */
export const en = {
  appName: 'Agrim Suchak',
  tagline: 'Clean toilets, watched for you',

  tab: {
    home: 'Home',
    toilets: 'Toilets',
    alerts: 'Alerts',
    cleaning: 'Cleaning',
    menu: 'Menu',
  },

  status: {
    good: 'Good',
    watch: 'Keep an eye',
    act: 'Clean now',
    offline: 'No signal',
    never: 'Not set up',
  },

  home: {
    greetingMorning: 'Good morning',
    greetingAfternoon: 'Good afternoon',
    greetingEvening: 'Good evening',
    needAttention: 'Need attention now',
    allClear: 'All clear',
    yourToilets: 'Your toilets',
    todaysJobs: "Today's jobs",
    worstBlocks: 'Blocks that need you',
    seeAll: 'See all',
    reporting: 'Sending readings',
    quietNow: 'Quiet right now',
  },

  action: {
    acknowledge: 'I\'m on it',
    sendCleaner: 'Send a cleaner',
    markCleaned: 'Mark as cleaned',
    handUp: 'Pass to my senior',
    callCleaner: 'Call a cleaner',
    viewDetails: 'See details',
    recordClean: 'Record a cleaning',
  },

  common: {
    signOut: 'Sign out',
    back: 'Back',
    search: 'Search',
  },
};

export type Strings = typeof en;
