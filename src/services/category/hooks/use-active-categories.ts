import { useQuery } from "@tanstack/react-query";
import { CATEGORY_QUERY_KEYS } from "../category-query-keys";
import { categoryService } from "../category.service";
import type { CategoryQueryParams } from "../category.types";

export const useActiveCategories = (params?: CategoryQueryParams) => {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEYS.active(params),
    queryFn: () => categoryService.getActiveCategories(params)
  });
};
