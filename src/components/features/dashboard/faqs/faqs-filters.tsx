"use client";

import { useMemo } from "react";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { SelectWithLabel } from "@/components/common";
import { cn } from "@/lib/utils";
import type { UserListingItem } from "@/data";

export interface FaqStatusTabItem {
  id: string;
  label: string;
  count: number;
}

interface FaqsFiltersProps {
  tabs: FaqStatusTabItem[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  listings: UserListingItem[];
  selectedListingId: string;
  onListingChange: (id: string) => void;
}

export function FaqsFilters({
  tabs,
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  listings,
  selectedListingId,
  onListingChange,
}: FaqsFiltersProps) {
  const listingOptions = useMemo(
    () => [
      { value: "All", label: "All Business Listings" },
      ...listings.map((l) => ({ value: l.id, label: l.name })),
    ],
    [listings]
  );

  return (
    <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3 sm:space-y-4">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 sm:gap-4">
        {/* Status Tabs: scrollable on small mobile screens without line break */}
        <div className="overflow-x-auto no-scrollbar -mx-1 px-1">
          <Tabs
            value={activeFilter}
            onValueChange={(val) => onFilterChange(val as string)}
            className="w-full sm:w-auto"
          >
            <TabsList className="h-10 p-1 bg-slate-50/90 rounded-xl inline-flex items-center gap-1 border border-slate-200/70 whitespace-nowrap">
              {tabs.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={cn(
                      "text-xs font-semibold px-2.5 sm:px-3.5 py-1.5 rounded-[9px] transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer border shrink-0",
                      isActive
                        ? "bg-white text-indigo-600 shadow-xs border-slate-200/70 font-bold"
                        : "text-slate-500 hover:text-slate-800 hover:bg-white/60 border-transparent"
                    )}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={cn(
                        "px-1.5 py-0.2 rounded-full text-[10px] font-bold transition-colors",
                        isActive
                          ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                          : "bg-slate-200/60 text-slate-500"
                      )}
                    >
                      {tab.count}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        {/* Listing Selector & Search Inputs: responsive row on tablet, side-by-side on desktop */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 w-full xl:w-auto">
          {/* Business Listing Filter Dropdown */}
          <div className="w-full sm:w-60 md:w-64 shrink-0">
            <SelectWithLabel
              value={selectedListingId}
              onValueChange={onListingChange}
              options={listingOptions}
              placeholder="All Business Listings"
              triggerClassName="h-10! rounded-xl bg-slate-50 border-slate-200 text-xs font-semibold text-slate-800 truncate"
              containerClassName="gap-0 w-full"
            />
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:flex-1 sm:min-w-[200px] xl:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search question or answer..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
