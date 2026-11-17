"use client";

import { Button } from "@/components/ui/button";
import type { BlogCategoryData } from "@/services/blog";

interface BlogCategoriesProps {
  categories: BlogCategoryData[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  isLoading?: boolean;
}

export function BlogCategories({
  categories,
  activeCategoryId,
  onSelectCategory,
  isLoading,
}: BlogCategoriesProps) {
  // Skeleton state while categories are loading
  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 rounded-full bg-slate-200/80 animate-pulse shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  const isAllActive = activeCategoryId === "all";

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
        {/* 'All' Category Pill */}
        <Button
          variant={isAllActive ? "default" : "outline"}
          onClick={() => onSelectCategory("all")}
          className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
            isAllActive
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 border-transparent"
              : "bg-white hover:bg-slate-50 text-slate-700 hover:text-indigo-600 border-slate-200 hover:border-slate-300"
          }`}
        >
          <span>All</span>
        </Button>

        {/* Dynamic Category Pills */}
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;

          return (
            <Button
              key={cat.id}
              variant={isActive ? "default" : "outline"}
              onClick={() => onSelectCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 border-transparent"
                  : "bg-white hover:bg-slate-50 text-slate-700 hover:text-indigo-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              <span>{cat.name}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
