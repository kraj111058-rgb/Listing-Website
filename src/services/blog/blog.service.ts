import { BlogCategoryStatus, BlogStatus } from "@/enums";
import { supabase, SUPABASE_CONSTANTS } from "@/lib/supabase";
import type {
  BlogCategoryData,
  BlogPostDataWithCategory,
  BlogPostQueryParams,
  BlogPostResponse,
} from "./blog.types";

export const blogService = {
  // 1. BLOG CATEGORIES (Active only)
  getCategories: async (): Promise<BlogCategoryData[]> => {
    const { data, error } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.BLOGS_CATEGORY)
      .select("*, blogs(count)", { count: "exact" })
      .eq("status", BlogCategoryStatus.ACTIVE)
      .order("name", { ascending: true });

    if (error) throw new Error(error.message);

    return data ?? [];
  },

  // 2. BLOG LIST (Published only, with pagination, search & categoryId filter)
  getBlogs: async (params?: BlogPostQueryParams): Promise<BlogPostResponse> => {
    const page = params?.page ?? 1;
    const pageLimit = params?.pageLimit ?? 9;
    const search = params?.search?.trim();
    const categoryId = params?.categoryId;

    const from = (page - 1) * pageLimit;
    const to = from + pageLimit - 1;

    let query = supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.BLOGS)
      .select("*, category:category_id (*)", { count: "exact" })
      .eq("status", BlogStatus.PUBLISHED);

    // Filter by category_id if provided
    if (categoryId && categoryId !== "all") {
      query = query.eq("category_id", categoryId);
    }

    // Sanitized search query
    if (search) {
      const cleanSearch = search.replace(/[,()]/g, "").trim();
      if (cleanSearch) {
        query = query.or(
          `title.ilike.%${cleanSearch}%,excerpt.ilike.%${cleanSearch}%,author.ilike.%${cleanSearch}%`
        );
      }
    }

    const { data, count, error } = await query
      .order("published_at", { ascending: false })
      .range(from, to);

    if (error) throw new Error(error.message);

    const total = count ?? 0;
    const totalPages = Math.ceil(total / pageLimit);

    return {
      data: (data as BlogPostDataWithCategory[]) ?? [],
      total,
      page,
      pageLimit,
      totalPages,
    };
  },

  // 3. BLOG DETAILS (by slug, published only)
  getBlogBySlug: async (slug: string): Promise<BlogPostDataWithCategory | null> => {
    const { data, error } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.BLOGS)
      .select("*, category:category_id (*)")
      .eq("slug", slug)
      .eq("status", BlogStatus.PUBLISHED)
      .maybeSingle();

    if (error) throw new Error(error.message);

    return data;
  },
};
