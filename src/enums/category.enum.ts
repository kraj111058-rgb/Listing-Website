export const CategoryStatus = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
} as const;

export type CategoryStatus =
  (typeof CategoryStatus)[keyof typeof CategoryStatus];

export const CategorySortBy = {
  NAME: "name",
  CREATED_AT: "created_at",
} as const;

export type CategorySortBy =
  (typeof CategorySortBy)[keyof typeof CategorySortBy];

export const SortOrder = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
