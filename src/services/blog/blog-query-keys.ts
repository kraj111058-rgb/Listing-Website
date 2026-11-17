import type { BlogPostQueryParams } from "./blog.types";

export const BLOG_QUERY_KEYS = {
  categories: ["blog-categories"] as const,
  blogs: (params?: BlogPostQueryParams) => ["blogs", params] as const,
  blogDetail: (slug: string) => ["blog-detail", slug] as const,
} as const;
