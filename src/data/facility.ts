import { ALERTS } from './alerts';
import { TOILETS } from './toilets';

/** The facility operator looks after one building. */
export const FACILITY = {
  name: 'Ravi',
  building: 'CTC Saket Block A',
  area: 'Ward 12, South Delhi',
  phone: '+91 90042 11880',
};

export const facilityToilets = TOILETS.filter((t) => t.block === FACILITY.building);
export const facilityAlerts = ALERTS.filter((a) => a.block === FACILITY.building);
