"use client";

import { SlidersHorizontal, Star, RotateCcw, Check } from "lucide-react";
import { useActiveCategories } from "@/services/category";
import { useActiveCities } from "@/services/location";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SelectWithLabel } from "@/components/common";

interface ListingsSidebarProps {
  selectedCategory: string;
  selectedCity: string;
  minRating: number;
  featuredOnly: boolean;
  onCategoryChange: (category: string) => void;
  onCityChange: (city: string) => void;
  onRatingChange: (rating: number) => void;
  onFeaturedChange: (featured: boolean) => void;
  onClearFilters: () => void;
}

export function ListingsSidebar({
  selectedCategory,
  selectedCity,
  minRating,
  featuredOnly,
  onCategoryChange,
  onCityChange,
  onRatingChange,
  onFeaturedChange,
  onClearFilters,
}: ListingsSidebarProps) {
  const { data: categories = [] } = useActiveCategories();
  const { data: cities = [] } = useActiveCities();
  const hasActiveFilters = Boolean(
    selectedCategory || selectedCity || minRating > 0 || featuredOnly
  );

  return (
    <aside className="w-full space-y-6">
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <SlidersHorizontal size={16} />
            </div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
              Filters
            </h3>
          </div>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={onClearFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-7 px-2"
            >
              <RotateCcw size={12} className="mr-1" />
              <span>Reset</span>
            </Button>
          )}
        </div>

        {/* 1. Category Filter */}
        <SelectWithLabel
          label="Category"
          labelClassName="text-xs font-bold text-slate-700 tracking-wider"
          value={selectedCategory || "all"}
          onValueChange={(val) => onCategoryChange(val === "all" ? "" : val)}
          triggerClassName="bg-slate-50/50 hover:bg-white"
          options={[
            { value: "all", label: `All Categories (${categories.length})` },
            ...categories.map((cat) => ({
              value: cat.slug,
              label: cat.name,
            })),
          ]}
        />

        {/* 2. City Filter */}
        <SelectWithLabel
          label="City"
          labelClassName="text-xs font-bold text-slate-700 tracking-wider"
          value={selectedCity || "all"}
          onValueChange={(val) => onCityChange(val === "all" ? "" : val)}
          triggerClassName="bg-slate-50/50 hover:bg-white"
          options={[
            { value: "all", label: `All Cities (${cities.length}+)` },
            ...cities.map((c) => ({
              value: c.slug,
              label: c.name,
            })),
          ]}
        />

        {/* 3. Minimum Rating Filter */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-700 tracking-wider block">
            Minimum Rating
          </label>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((stars) => {
              const isSelected = minRating === stars;
              return (
                <Button
                  key={stars}
                  type="button"
                  variant="outline"
                  onClick={() => onRatingChange(isSelected ? 0 : stars)}
                  className={`w-full h-11! px-4 rounded-[10px] text-sm font-medium border flex items-center justify-between transition-all ${
                    isSelected
                      ? "bg-amber-50 border-amber-300 text-amber-900 shadow-2xs font-bold hover:bg-amber-100 hover:text-amber-900"
                      : "bg-slate-50/50 border-slate-200 text-slate-700 hover:border-amber-200 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`size-3.5 ${
                            i <= stars
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span>{stars}.0 &amp; Up</span>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <Check className="size-2.5 stroke-[3]" />
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>

        {/* 4. Featured Only Toggle */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between p-1 rounded-xl hover:bg-slate-50 transition-colors">
            <label
              htmlFor="featured-filter-toggle"
              className="text-sm font-semibold text-slate-700 cursor-pointer select-none"
            >
              Featured Only
            </label>
            <Switch
              id="featured-filter-toggle"
              checked={featuredOnly}
              onCheckedChange={(checked) => onFeaturedChange(checked)}
              className="data-[checked]:bg-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Bottom Clear Filter Button */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="w-full text-xs font-bold text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 rounded-[10px] h-9"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
