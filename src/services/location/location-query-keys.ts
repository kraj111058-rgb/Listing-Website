export const LOCATION_QUERY_KEYS = {
  all: ["locations"] as const,
  states: () => [...LOCATION_QUERY_KEYS.all, "states"] as const,
  activeStates: () => [...LOCATION_QUERY_KEYS.states(), "active"] as const,
  cities: () => [...LOCATION_QUERY_KEYS.all, "cities"] as const,
  activeCities: () => [...LOCATION_QUERY_KEYS.cities(), "active"] as const,
  citiesByState: (stateCodeOrId: string) => [...LOCATION_QUERY_KEYS.cities(), "by-state", stateCodeOrId] as const,
  cityDetail: (slug: string) => [...LOCATION_QUERY_KEYS.cities(), "detail", slug] as const,
} as const;
