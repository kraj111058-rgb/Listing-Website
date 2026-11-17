import { useQuery } from "@tanstack/react-query";
import { blogService } from "../blog.service";
import { BLOG_QUERY_KEYS } from "../blog-query-keys";
import type { BlogPostQueryParams } from "../blog.types";

export const useBlogs = (params?: BlogPostQueryParams) => {
  return useQuery({
    queryKey: BLOG_QUERY_KEYS.blogs(params),
    queryFn: () => blogService.getBlogs(params)
  });
};
