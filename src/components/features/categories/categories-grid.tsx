"use client";

import Link from "next/link";
import Image from "next/image";
import { SearchX } from "lucide-react";
import type { CategoryData } from "@/services/category";
import { Button } from "@/components/ui/button";

interface CategoriesGridProps {
  categories: CategoryData[];
  isLoading?: boolean;
  searchQuery: string;
  onClearSearch: () => void;
}

export function CategoriesGrid({
  categories,
  isLoading,
  searchQuery,
  onClearSearch,
}: CategoriesGridProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-5 bg-slate-200 rounded w-48 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 md:gap-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center px-4 py-5 bg-white rounded-xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] animate-pulse"
            >
              <div className="size-11 sm:size-12 bg-slate-200 rounded-xl mb-2.5" />
              <div className="h-3.5 bg-slate-200 rounded w-16 mb-1.5" />
              <div className="h-2.5 bg-slate-100 rounded w-10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] my-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
          <SearchX size={32} />
        </div>
        <h3 className="font-extrabold text-xl sm:text-2xl text-slate-800 mb-2">
          No categories found
        </h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
          We couldn&apos;t find any category matching &ldquo;{searchQuery}&rdquo;. Try another keyword.
        </p>
        <Button
          type="button"
          size="lg"
          onClick={onClearSearch}
          className="px-6 py-2.5 rounded-[10px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm h-11 cursor-pointer" 
        >
          Show All Categories
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Category count indicator */}
      <p className="text-sm text-slate-500">
        Showing <strong className="text-slate-900 font-bold">{categories.length}</strong> {categories.length === 1 ? "category" : "categories"}
        {searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
      </p>

      {/* Categories Grid — using homepage browse-category card UI */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 md:gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id || cat.slug}
            href={`/listings?category=${cat.slug}`}
            className="flex flex-col items-center justify-center px-4 py-5 bg-white rounded-xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-center"
          >
            <div className="relative size-12 sm:size-13.5 mb-2.5 group-hover:scale-110 transition-transform flex items-center justify-center">
              <Image
                src={cat.image}
                alt={cat.name}
                width={54}
                height={54}
                className="size-12 sm:size-13.5 object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors text-center leading-tight line-clamp-2">
              {cat.name}
            </p>
            <span className="mt-1.5 text-[11px] font-medium text-slate-400 group-hover:text-indigo-500 transition-colors">
              {cat.listings_count ?? 0} listings
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
