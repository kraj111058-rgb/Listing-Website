import { useQuery } from "@tanstack/react-query";
import { blogService } from "../blog.service";
import { BLOG_QUERY_KEYS } from "../blog-query-keys";

export const useBlogDetail = (slug: string) => {
  return useQuery({
    queryKey: BLOG_QUERY_KEYS.blogDetail(slug),
    queryFn: () => blogService.getBlogBySlug(slug),
    enabled: Boolean(slug),
  });
};
