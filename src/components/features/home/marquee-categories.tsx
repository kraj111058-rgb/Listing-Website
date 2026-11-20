"use client";

import Link from "next/link";
import { Container } from "@/components/common";
import { useActiveCategories } from "@/services/category";
import { useActiveCities } from "@/services/location";

export default function MarqueeCategories() {
  const { data: categories = [] } = useActiveCategories();
  const { data: row2Cities = [] } = useActiveCities();
  const half = Math.ceil(categories.length / 2);
  const row1Categories = categories.slice(0, half);
  const row3Categories = categories.slice(half);

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <Container>
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-5">
          Browse Popular Categories &amp; Cities
        </h2>

        {/* 3 Marquee Rows Container with Gradient Edge Fades */}
        <div className="relative overflow-x-hidden mb-6 py-2 space-y-3.5">
          {/* Edge Fade Gradients */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          {/* Row 1: Categories Set 1 (Leftward Scroll) */}
          <div className="group relative flex overflow-x-hidden py-0.5">
            <div className="flex w-max animate-marquee-scroll group-hover:[animation-play-state:paused]">
              {[0, 1].map((cycle) => (
                <div key={cycle} className="flex gap-3 px-1.5 shrink-0">
                  {row1Categories.map((cat) => (
                    <Link
                      key={`${cycle}-${cat.id || cat.slug}`}
                      href={`/listings?category=${cat.slug}`}
                      className="whitespace-nowrap shrink-0 text-sm font-medium text-slate-700 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 px-5 py-2.5 rounded-full transition-all shadow-xs hover:shadow-md"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Cities Only (Right-to-Left / Reverse Scroll) */}
          <div className="group relative flex overflow-x-hidden py-0.5">
            <div className="flex w-max animate-marquee-scroll-reverse group-hover:[animation-play-state:paused]">
              {[0, 1].map((cycle) => (
                <div key={cycle} className="flex gap-3 px-1.5 shrink-0">
                  {row2Cities.map((city) => (
                    <Link
                      key={`${cycle}-${city.id || city.slug}`}
                      href={`/listings?city=${city.slug}`}
                      className="whitespace-nowrap shrink-0 text-sm font-medium text-slate-700 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 px-5 py-2.5 rounded-full transition-all shadow-xs hover:shadow-md"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: Categories Set 2 (Leftward Scroll, No Repeats from Row 1) */}
          <div className="group relative flex overflow-x-hidden py-0.5">
            <div className="flex w-max animate-marquee-scroll group-hover:[animation-play-state:paused]">
              {[0, 1].map((cycle) => (
                <div key={cycle} className="flex gap-3 px-1.5 shrink-0">
                  {row3Categories.map((cat) => (
                    <Link
                      key={`${cycle}-${cat.id || cat.slug}`}
                      href={`/listings?category=${cat.slug}`}
                      className="whitespace-nowrap shrink-0 text-sm font-medium text-slate-700 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 px-5 py-2.5 rounded-full transition-all shadow-xs hover:shadow-md"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-3 font-normal leading-relaxed">
          IndianListingBucket is India&apos;s premier{" "}
          <strong className="text-slate-700 font-bold">business listing website</strong> — one of the top{" "}
          <strong className="text-slate-700 font-bold">business listing sites in India</strong> covering 500+ cities and 25+ categories.
        </p>
      </Container>
    </section>
  );
}
