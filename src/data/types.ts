export type RoleId =
  | 'cleaner'
  | 'facility'
  | 'block'
  | 'district'
  | 'regional'
  | 'central'
  | 'system';

export interface Role {
  id: RoleId;
  name: string; // e.g. "Facility operator"
  short: string; // e.g. "F"
  /** Plain one-liner describing what this person does. */
  blurb: string;
  /** Area label they are responsible for, used in the greeting. */
  area: string;
  /** Capabilities that unlock extra menu items / actions. */
  can: {
    writeRules: boolean;
    reports: boolean;
    assistant: boolean;
    admin: boolean;
    deviceRegistry: boolean;
  };
}
