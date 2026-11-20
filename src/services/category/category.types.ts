import type { CategorySortBy, CategoryStatus, SortOrder } from "@/enums";

export type CategoryQueryParams = {
  search?: string;
  sortBy?: CategorySortBy;
  sortOrder?: SortOrder;
};

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  image: string;
  status: CategoryStatus;
  created_at: string;
  updated_at: string;
  listings_count?: number;
}

export type CategoryResponse = CategoryData[];
