"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Container } from "@/components/common";
import { allListings } from "@/data";
import { useActiveCategories } from "@/services/category";
import { useActiveCities } from "@/services/location";
import { ListingsHero } from "./listings-hero";
import { ListingsSidebar } from "./listings-sidebar";
import { ListingsGrid } from "./listings-grid";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 9;

export function ListingsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: categories = [] } = useActiveCategories();
  const { data: cities = [] } = useActiveCities();

  // Read initial params
  const paramQ = searchParams.get("q") || "";
  const paramCategory = searchParams.get("category") || "";
  const paramCity = searchParams.get("city") || "";
  const paramRating = Number(searchParams.get("rating")) || 0;
  const paramFeatured = searchParams.get("featured") === "true";
  const paramSort = searchParams.get("sort") || "newest";
  const paramPage = Number(searchParams.get("page")) || 1;

  // Local state for search bar in Hero
  const [keyword, setKeyword] = useState(paramQ);
  const [city, setCity] = useState(paramCity);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync hero inputs if URL searchParams change
  useEffect(() => {
    setKeyword(paramQ);
    setCity(paramCity);
  }, [paramQ, paramCity]);

  // Update URL helper
  const updateParams = useCallback(
    (updates: Record<string, string | number | boolean | null | undefined>) => {
      const current = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, val]) => {
        if (val === null || val === undefined || val === "" || val === 0 || val === false) {
          current.delete(key);
        } else {
          current.set(key, String(val));
        }
      });

      const queryString = current.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  // Search submission from Hero
  const handleSearchSubmit = () => {
    updateParams({
      q: keyword.trim() || undefined,
      city: city || undefined,
      page: 1,
    });
  };

  // Filter & Sort Logic
  const filteredListings = useMemo(() => {
    return allListings.filter((item) => {
      // 1. Keyword search (Name, Description, Tags, Category)
      if (paramQ) {
        const qLower = paramQ.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(qLower);
        const matchesDesc = item.description.toLowerCase().includes(qLower);
        const matchesTag = item.tags.some((t) => t.toLowerCase().includes(qLower));
        const matchesCat = item.category.toLowerCase().includes(qLower);
        if (!matchesName && !matchesDesc && !matchesTag && !matchesCat) return false;
      }

      // 2. Category filter
      if (paramCategory && item.categorySlug !== paramCategory) {
        return false;
      }

      // 3. City filter
      if (paramCity) {
        const cLower = paramCity.toLowerCase().trim();
        const matchedCityName = cities.find((c) => c.slug === paramCity)?.name.toLowerCase();
        const cityMatch =
          item.city.toLowerCase().includes(cLower) ||
          (matchedCityName ? item.city.toLowerCase().includes(matchedCityName) : false);
        if (!cityMatch) return false;
      }

      // 4. Minimum Rating
      if (paramRating > 0 && item.rating < paramRating) {
        return false;
      }

      // 5. Featured Only
      if (paramFeatured && !item.featured) {
        return false;
      }

      return true;
    });
  }, [paramQ, paramCategory, paramCity, paramRating, paramFeatured]);

  // Sort listings
  const sortedListings = useMemo(() => {
    const list = [...filteredListings];
    switch (paramSort) {
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "reviews":
        return list.sort((a, b) => b.reviewsCount - a.reviewsCount);
      case "views":
        return list.sort((a, b) => (b.views || 0) - (a.views || 0));
      case "newest":
      default:
        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
  }, [filteredListings, paramSort]);

  // Pagination calculation
  const totalCount = sortedListings.length;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, paramPage), Math.max(1, totalPages));

  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedListings.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedListings, currentPage]);

  // Clear all filters
  const handleClearFilters = () => {
    setKeyword("");
    setCity("");
    router.push(pathname, { scroll: false });
  };

  // Find labels for dynamic title
  const categoryName = categories.find((c) => c.slug === paramCategory)?.name;
  const cityName = cities.find((c) => c.slug === paramCity)?.name;

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Top Hero Section */}
      <ListingsHero
        keyword={keyword}
        city={city}
        categoryName={categoryName}
        cityName={cityName}
        onKeywordChange={setKeyword}
        onCityChange={setCity}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* 2. Main Content Area */}
      <Container className="pt-8 sm:pt-10">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-5">
          <Button
            type="button"
            variant="outline"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-sm shadow-xs"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-indigo-600" />
              <span>Filters</span>
              {(paramCategory || paramCity || paramRating > 0 || paramFeatured) && (
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
              )}
            </div>
            {mobileFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sidebar */}
          <div
            className={`w-full lg:w-72 shrink-0 ${
              mobileFilterOpen ? "block" : "hidden"
            } lg:block`}
          >
            <ListingsSidebar
              selectedCategory={paramCategory}
              selectedCity={paramCity}
              minRating={paramRating}
              featuredOnly={paramFeatured}
              onCategoryChange={(cat) => updateParams({ category: cat, page: 1 })}
              onCityChange={(c) => updateParams({ city: c, page: 1 })}
              onRatingChange={(r) => updateParams({ rating: r, page: 1 })}
              onFeaturedChange={(f) => updateParams({ featured: f, page: 1 })}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Right Listings Grid */}
          <div className="flex-1 min-w-0 w-full">
            <ListingsGrid
              listings={paginatedListings}
              totalCount={totalCount}
              currentPage={currentPage}
              totalPages={totalPages}
              sortBy={paramSort}
              onSortChange={(s) => updateParams({ sort: s, page: 1 })}
              onPageChange={(p) => {
                updateParams({ page: p });
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
