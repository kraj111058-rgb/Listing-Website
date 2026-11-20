import { CategorySortBy, CategoryStatus, SortOrder } from "@/enums";
import { supabase, SUPABASE_CONSTANTS } from "@/lib/supabase";
import type { CategoryData, CategoryQueryParams, CategoryResponse } from "./category.types";

export const categoryService = {
  // 1. Get all active categories for public website (ordered by name) with optional DB search
  getActiveCategories: async (params?: CategoryQueryParams): Promise<CategoryResponse> => {
    let query = supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.CATEGORIES)
      .select("*")
      .eq("status", CategoryStatus.ACTIVE);

    if (params?.search?.trim()) {
      const cleanSearch = params.search.replace(/[,()]/g, "").trim();
      query = query.ilike("name", `%${cleanSearch}%`);
    }

    const sortBy = params?.sortBy || CategorySortBy.NAME;
    const ascending = params?.sortOrder
      ? params.sortOrder === SortOrder.ASC
      : sortBy === CategorySortBy.NAME;

    const { data, error } = await query.order(sortBy, { ascending });

    if (error) throw new Error(error.message);
    return (data as CategoryData[]) || [];
  },

  // 2. Get single category by slug (for category detail / directory page)
  getCategoryBySlug: async (slug: string): Promise<CategoryData> => {
    const { data, error } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.CATEGORIES)
      .select("*")
      .eq("slug", slug)
      .eq("status", CategoryStatus.ACTIVE)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data as CategoryData;
  },
};
