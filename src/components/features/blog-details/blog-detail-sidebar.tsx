"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Plus,
  TrendingUp,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { useBlogs } from "@/services/blog";
import { Button } from "@/components/ui/button";

interface BlogDetailSidebarProps {
  currentSlug: string;
}

export function BlogDetailSidebar({ currentSlug }: BlogDetailSidebarProps) {
  const router = useRouter();

  // Fetch published blogs for the sidebar
  const { data: blogsResponse } = useBlogs({ page: 1, pageLimit: 5 });

  const popularArticles = (blogsResponse?.data ?? [])
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);

  return (
    <aside className="space-y-6 sm:space-y-7">
      {/* 1. Free Business Listing Promo Box */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 shadow-xl border border-indigo-800/40">
        <div className="absolute top-0 right-0 w-36 h-36 bg-fuchsia-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-indigo-300 text-[11px] font-bold border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free Forever</span>
          </div>

          <h3 className="text-xl font-black text-white leading-tight">
            Grow Your Business Online with a Free Listing
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Join 5,000+ verified businesses across India. Get instant OTP
            verification, high local reach, and a free do-follow backlink.
          </p>

          <Button
            onClick={() => router.push("/listings/create")}
            className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-600 hover:from-indigo-600 hover:to-fuchsia-700 text-white font-bold text-sm py-3 rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer border-0"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Submit Your Business</span>
          </Button>
        </div>
      </div>

      {/* 2. Popular & Trending Guides */}
      {popularArticles.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Popular Guides
            </h3>
          </div>

          <div className="space-y-4">
            {popularArticles.map((item, idx) => {
              const formattedDate = item.published_at
                ? new Date(item.published_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recently";

              return (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="flex items-start gap-3.5 group cursor-pointer"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="absolute top-1 left-1 w-5 h-5 rounded-md bg-slate-950/70 text-white text-[10px] font-black flex items-center justify-center">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    {item.category?.name && (
                      <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                        {item.category.name}
                      </span>
                    )}
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {formattedDate}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Need Support Help Card */}
      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/70 text-center space-y-3">
        <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
          <HelpCircle className="w-5 h-5" />
        </div>
        <h4 className="font-extrabold text-slate-900 text-sm">
          Need Help With Your Listing?
        </h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Our directory team is available to assist you with free business
          onboarding, category selection, and verification.
        </p>
        <Link href="/contact" className="inline-block w-full">
          <Button
            variant="outline"
            className="w-full border-slate-300 text-slate-700 hover:text-indigo-600 hover:bg-white font-bold text-xs rounded-xl py-2 cursor-pointer"
          >
            <span>Contact Support</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </aside>
  );
}
