"use client";

import { AppBreadcrumb, Container } from "@/components/common";
import { useDebounce } from "@/hooks";
import { useActiveCategories } from "@/services/category";
import { useState } from "react";
import { CategoriesCta } from "./categories-cta";
import { CategoriesGrid } from "./categories-grid";
import { CategoriesHero } from "./categories-hero";

export function CategoriesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);
  const { data: categories = [], isLoading } = useActiveCategories({
    search: debouncedSearch
  });

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      {/* 1. Header Hero with Live Search */}
      <CategoriesHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Sub-header Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 py-3.5 shadow-2xs">
        <Container>
          <AppBreadcrumb items={[
            { label: "Home", href: "/" },
            { label: "Categories" },
          ]} />
        </Container>
      </div>

      {/* 3. Main Grid & Bottom CTA */}
      <div className="py-10 md:py-14">
        <Container>
          <CategoriesGrid
            categories={categories}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery("")}
          />
          
          <CategoriesCta />
        </Container>
      </div>
    </div>
  );
}
