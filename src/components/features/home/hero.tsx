"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  MapPin, 
  ArrowRight 
} from "lucide-react";
import { Container } from "@/components/common";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { popularSearches } from "@/data";
import { HeroIndiaMap } from "./hero-india-map";

export default function Hero() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSearch = () => {
    const q = searchTerm.trim();
    const city = selectedCity.trim();

    if (q && city) {
      router.push(`/listings?q=${encodeURIComponent(q)}&city=${encodeURIComponent(city)}`);
    } else if (city) {
      router.push(`/listings?city=${encodeURIComponent(city)}`);
    } else if (q) {
      router.push(`/listings?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/listings");
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-50 to-white overflow-hidden border-b border-slate-100 py-16 md:py-20 lg:py-24">
      {/* Background Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-200/40 via-fuchsia-200/30 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hero Text & Search */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:max-w-none lg:mx-0">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
              <span>India&apos;s Most Trusted Business Directory</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.6rem] font-black text-slate-900 tracking-tight leading-[1.14] mb-6">
              Discover &amp; <br />
              Connect with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600">
                Local Businesses
              </span>
            </h1>

            <p className="text-slate-600 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Explore verified restaurants, doctors, services, and local businesses across 500+ Indian cities. Everything you need, right in your neighborhood.
            </p>

            {/* Search Box */}
            <div className="w-full max-w-xl mx-auto lg:mx-0 mb-6 relative z-20 shadow-xl shadow-slate-200/60 rounded-2xl bg-white border border-slate-200/80 p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-3 py-2">
                <Search className="w-5 h-5 text-indigo-500 shrink-0" />
                <Input
                  type="text"
                  placeholder="Business name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="w-full text-base font-medium text-slate-800 placeholder:text-slate-400 bg-transparent border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 p-0 h-auto rounded-none"
                />
              </div>

              <div className="hidden sm:block w-px h-8 bg-slate-200" />

              <div className="flex items-center gap-2 px-3 py-2 sm:w-44">
                <MapPin className="w-4 h-4 text-fuchsia-500 shrink-0" />
                <Input
                  type="text"
                  placeholder="City..."
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="w-full text-base font-medium text-slate-800 placeholder:text-slate-400 bg-transparent border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 p-0 h-auto rounded-none"
                />
              </div>

              <Button
                type="button"
                onClick={handleSearch}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-7 py-3 rounded-[10px] transition-all shadow-md shadow-indigo-600/30 text-center flex items-center justify-center gap-2 active:scale-95 cursor-pointer h-auto border-0 shrink-0"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-6">
              <span className="text-slate-500 text-sm font-semibold">Popular Searches:</span>
              {popularSearches.map((tag) => (
                <Link
                  key={tag}
                  href={`/listings?q=${encodeURIComponent(tag)}`}
                  className="px-3.5 py-1.5 bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 text-sm font-medium rounded-full border border-slate-200 transition-colors shadow-2xs"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Animated India Map & Cities */}
          <div className="flex items-center justify-center relative w-full min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] mt-6 lg:mt-0">
            <HeroIndiaMap onSelectCity={(city) => setSelectedCity(city)} />
          </div>

        </div>
      </Container>
    </section>
  );
}
