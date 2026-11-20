"use client";

import Link from "next/link";
import { Crown, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useActiveCategories } from "@/services/category";
import { CategorySortBy, SortOrder } from "@/enums";

export function FeaturedSidebar() {
  const { data: categories = [], isLoading } = useActiveCategories({
    sortBy: CategorySortBy.CREATED_AT,
    sortOrder: SortOrder.DESC,
  });

  const displayCategories = categories.slice(0, 15);

  return (
    <aside className="space-y-6">
      {/* 1. Get Featured Widget */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-indigo-800/60 shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-400/20 blur-3xl rounded-full" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-0.5 rounded-full text-xs font-bold">
            <Crown size={13} className="text-amber-400" />
            <span>Grow Your Leads</span>
          </div>

          <h3 className="text-xl font-black text-white leading-tight">
            Get Your Business Featured Today
          </h3>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Featured listings receive <strong className="text-amber-300">5x more views</strong>, priority search rankings, and verified badge trust.
          </p>

          <ul className="space-y-2 text-xs text-slate-200">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span>Top spot on Homepage &amp; Featured page</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span>Dofollow SEO backlinks</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              <span>Starting at just ₹99 / forever</span>
            </li>
          </ul>

          <div className="pt-2">
            <Link
              href="/advertise"
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-400/20"
            >
              <span>View Featured Plans</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Popular Categories */}
      <div className="bg-card rounded-3xl p-6 border border-border shadow-xs space-y-4">
        <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
          <Sparkles size={16} className="text-primary" />
          <span>Browse by Category</span>
        </h4>

        <div className="flex flex-wrap gap-1.5">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-7 w-20 bg-slate-100 rounded-lg animate-pulse"
                />
              ))
            : displayCategories.map((cat) => (
                <Link
                  key={cat.id || cat.slug}
                  href={`/listings?category=${cat.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-primary/10 text-slate-700 hover:text-primary text-xs font-semibold transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
        </div>

        <div className="pt-2.75 border-t border-slate-100">
          <Link
            href="/categories"
            className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200/80 hover:border-indigo-200 text-sm font-bold inline-flex items-center justify-center gap-1.5 transition-all"
          >
            <span>View All</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
