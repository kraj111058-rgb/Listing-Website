import type { BlogCategoryStatus, BlogStatus } from "@/enums";
import type { PaginatedResponse, PaginationParams } from "@/types";

// Blog Category
export interface BlogCategoryData {
  id: string;
  name: string;
  slug: string;
  status: BlogCategoryStatus;
  created_at: string;
  updated_at: string;
  blogs?: { count: number }[];
}

export type BlogCategoryResponse = PaginatedResponse<BlogCategoryData>;

// Blog Post Query Params
export interface BlogPostQueryParams extends PaginationParams {
  search?: string;
  status?: string;
  categoryId?: string;
}

// Blog Post Data
export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  author: string;
  author_role: string | null;
  author_about: string | null;
  author_avatar: string | null;
  author_instagram: string | null;
  author_facebook: string | null;
  author_twitter: string | null;
  author_linkedin: string | null;
  tags: string[];
  image: string;
  excerpt: string;
  content: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  views: number;
  status: BlogStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// Blog Post with joined Category
export interface BlogPostDataWithCategory extends BlogPostData {
  category?: BlogCategoryData | null;
}

export type BlogPostResponse = PaginatedResponse<BlogPostDataWithCategory>;
