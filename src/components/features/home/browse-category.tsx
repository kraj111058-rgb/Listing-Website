"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common";
import { useActiveCategories } from "@/services/category";

export default function BrowseCategory() {
  const { data: categories = [], isLoading } = useActiveCategories({
    pageLimit: 18,
  });

  return (
    <section className="py-20 bg-slate-50/70">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Browse by Category
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            Find businesses in your industry
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 md:gap-4">
          {isLoading
            ? Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center px-4 py-5 bg-white rounded-xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] animate-pulse"
                >
                  <div className="size-11 sm:size-12 bg-slate-200 rounded-xl mb-2.5" />
                  <div className="h-3 bg-slate-200 rounded w-16" />
                </div>
              ))
            : categories.map((cat) => (
                <Link
                  key={cat.id || cat.slug}
                  href={`/listings?category=${cat.slug}`}
                  className="flex flex-col items-center justify-center px-4 py-5.25 bg-white rounded-xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group text-center"
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
                </Link>
              ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] border-2 border-indigo-200 bg-white text-indigo-600 hover:border-indigo-400 hover:bg-slate-50 font-bold text-sm transition-all shadow-xs"
          >
            <span>View All Categories</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
