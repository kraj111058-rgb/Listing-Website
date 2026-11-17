"use client";

import { useState } from "react";
import { BookOpen, RotateCcw } from "lucide-react";
import { Container } from "@/components/common";
import { AppPagination } from "@/components/common/app-pagination";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks";
import { useBlogs, useBlogCategories } from "@/services/blog";
import { BlogHero } from "./blog-hero";
import { BlogCategories } from "./blog-categories";
import { BlogFeaturedCard } from "./blog-featured-card";
import { BlogCard } from "./blog-card";
import { BlogCardSkeleton } from "./blog-card-skeleton";

const POSTS_PER_PAGE = 6;

export function BlogContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Reusable custom debounce hook
  const debouncedSearch = useDebounce(searchQuery.trim(), 400);

  // 1. Fetch Categories
  const { data: categories = [], isLoading: isCategoriesLoading } =
    useBlogCategories();

  // 2. Fetch Published Blogs with Pagination, Search & Category Filter
  const { data: blogsResponse, isLoading: isBlogsLoading } = useBlogs({
    page: currentPage,
    pageLimit: POSTS_PER_PAGE,
    search: debouncedSearch,
    categoryId: activeCategoryId === "all" ? undefined : activeCategoryId,
  });

  const blogs = blogsResponse?.data ?? [];
  const totalPages = blogsResponse?.totalPages ?? 0;

  // Featured post is shown only on page 1 with no search and "all" category
  const isDefaultView =
    currentPage === 1 && !debouncedSearch && activeCategoryId === "all";
  const featuredPost = isDefaultView && blogs.length > 0 ? blogs[0] : null;
  const gridPosts = featuredPost ? blogs.slice(1) : blogs;

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategoryId("all");
    setCurrentPage(1);
  };

  const handleCategorySelect = (id: string) => {
    setActiveCategoryId(id);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. Hero Header with Search */}
      <BlogHero
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchClear={() => setSearchQuery("")}
      />

      {/* 2. Main Content Body */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="space-y-8 sm:space-y-10">
            {/* Category Filter Pills Bar */}
            <div className="border-b border-slate-100 pb-5">
              <BlogCategories
                categories={categories}
                isLoading={isCategoriesLoading}
                activeCategoryId={activeCategoryId}
                onSelectCategory={handleCategorySelect}
              />
            </div>

            {/* Loading State: Realistic BlogCardSkeleton */}
            {isBlogsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <BlogCardSkeleton key={idx} />
                ))}
              </div>
            ) : blogs.length === 0 ? (
              /* Empty State */
               <div className="bg-slate-50 rounded-3xl p-10 sm:p-14 text-center border border-slate-200/80 space-y-4 mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    No Articles Found
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium">
                    We couldn&apos;t find any articles matching your search or filters. Try searching for different keywords or clear your active filters.
                  </p>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      onClick={handleResetFilters}
                      className="font-semibold text-sm px-2.5 rounded-lg cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reset Filters</span>
                    </Button>
                  </div>
                </div>
            ) : (
              /* Blog Posts Display */
              <div className="space-y-8 sm:space-y-12">
                {/* Featured Post (Only on Default Page 1 View) */}
                {featuredPost && <BlogFeaturedCard post={featuredPost} />}

                {/* Grid of Articles */}
                {gridPosts.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {gridPosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <AppPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}
