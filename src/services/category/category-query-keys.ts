import { CategoryQueryParams } from "./category.types";

export const CATEGORY_QUERY_KEYS = {
  all: ["categories"] as const,
  active: (params?: CategoryQueryParams) =>
    [...CATEGORY_QUERY_KEYS.all, "active", params] as const,
  detail: (slug: string) => [...CATEGORY_QUERY_KEYS.all, "detail", slug] as const,
} as const;
