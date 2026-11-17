"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blogService } from "../blog.service";
import { BLOG_QUERY_KEYS } from "../blog-query-keys";

export function useIncrementBlogViews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogId: string) => blogService.incrementViews(blogId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOG_QUERY_KEYS.all });
    },
  });
}
