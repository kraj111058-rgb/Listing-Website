"use client";

import Link from "next/link";
import { Container } from "@/components/common";
import { useActiveCities } from "@/services/location";

export default function BrowseCity() {
  const { data: cities = [], isLoading } = useActiveCities();

  return (
    <section className="py-20 bg-slate-50/70">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Browse by City
          </h2>
          <p className="text-slate-500 text-base sm:text-lg">
            Find businesses in your city
          </p>
        </div>

        {/* Cities Grid - 1 Row = 5 Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {isLoading
            ? Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4.5 py-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs animate-pulse"
                >
                  <div className="h-4 bg-slate-200 rounded w-24" />
                  <div className="h-4 bg-slate-100 rounded w-8" />
                </div>
              ))
            : cities.map((city) => (
                <Link
                  key={city.id || city.slug}
                  href={`/listings?city=${city.slug}`}
                  className="group flex items-center justify-between px-4.5 py-4 bg-white rounded-xl border border-slate-200/80 shadow-2xs hover:border-indigo-400 hover:bg-indigo-50/20 hover:shadow-md transition-all duration-200"
                >
                  <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">
                    {city.name}
                  </span>
                  {typeof city.listings_count === "number" && city.listings_count > 0 && (
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 group-hover:bg-indigo-100 group-hover:text-indigo-700 px-2.5 py-0.5 rounded-md transition-colors shrink-0 ml-2">
                      {city.listings_count}
                    </span>
                  )}
                </Link>
              ))}
        </div>
      </Container>
    </section>
  );
}
