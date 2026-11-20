import { useQuery } from "@tanstack/react-query";
import { categoryService } from "../category.service";
import { CATEGORY_QUERY_KEYS } from "../category-query-keys";

export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: CATEGORY_QUERY_KEYS.detail(slug),
    queryFn: () => categoryService.getCategoryBySlug(slug),
    enabled: Boolean(slug),
  });
};
