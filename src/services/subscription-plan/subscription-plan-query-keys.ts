export const SUBSCRIPTION_PLAN_QUERY_KEYS = {
  all: ["subscription-plans"] as const,
  active: () => [...SUBSCRIPTION_PLAN_QUERY_KEYS.all, "active"] as const,
} as const;
