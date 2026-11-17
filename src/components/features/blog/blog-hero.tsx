"use client";

import Link from "next/link";
import { Search, Sparkles, X } from "lucide-react";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchClear: () => void;
}

export function BlogHero({
  searchQuery,
  onSearchChange,
  onSearchClear,
}: BlogHeroProps) {
  return (
    <section className="relative py-12 md:py-16 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-fuchsia-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "radial-gradient(#818cf8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          {/* Breadcrumb & Pill */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs font-semibold text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-indigo-400">Blog &amp; Guides</span>
          </div>

          <div className="inline-flex items-center gap-2">
            <Badge 
              variant="indigo" 
              className="bg-indigo-500/20 text-indigo-300 border-indigo-400/30 px-3.5 py-1 text-xs font-bold rounded-full gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Free Guides &amp; Insights</span>
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
            Business Growth &amp;{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-amber-300 bg-clip-text text-transparent">
              Local SEO
            </span>{" "}
            Insights
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Practical strategies, business directory tips, and local ranking guides to help you attract more customers across 500+ Indian cities.
          </p>

          {/* Search Box */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-1.5 shadow-xl transition-all focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/30">
              <Search className="w-5 h-5 text-slate-300 ml-3.5 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by title, description, or author..."
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base px-3 py-2 outline-none"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={onSearchClear}
                  className="text-slate-400 hover:text-white hover:bg-white/10 rounded-xl mr-1 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="default"
                size="default"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 rounded-xl shadow-md cursor-pointer shrink-0 border-0"
              >
                <span>Search</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
