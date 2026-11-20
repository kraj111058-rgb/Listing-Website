export const StateType = {
  STATE: "State",
  UT: "Union Territory",
} as const;

export type StateType = (typeof StateType)[keyof typeof StateType];

export const LocationStatus = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
} as const;

export type LocationStatus =
  (typeof LocationStatus)[keyof typeof LocationStatus];
