"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Building, 
  User 
} from "lucide-react";
import { Container } from "../common";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs sm:text-sm py-2.5 px-4 border-b border-indigo-900/40">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 font-bold text-xs border border-indigo-400/40">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" /> Free
              </span>
              <span className="text-slate-200 font-medium text-xs sm:text-sm">
                India&apos;s #1 Free Business Listing Directory
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-5 shrink-0 text-slate-200 text-xs sm:text-sm">
              <Link href="/listings/create" className="hover:text-white font-semibold transition-colors flex items-center gap-1.5 text-indigo-300">
                List for Free <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 100% Verified Directory
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.06)]">
        <Container>
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Brand Logo: IndianListingBucket */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="flex items-center gap-0.5">
                  <span className="text-2xl font-black tracking-tight text-slate-900">
                    One
                  </span>
                  <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
                    Listy
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-400 tracking-wide">
                  India's Premier Directory
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-base font-bold text-slate-700">
              <Link
                href="/listings"
                className="hover:text-indigo-600 transition-colors py-2"
              >
                Listings
              </Link>

              {/* Categories Dropdown */}
              <div 
                className="relative py-2"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <button 
                  className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors focus:outline-none cursor-pointer"
                  aria-expanded={categoriesOpen}
                >
                  <span>Categories</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${categoriesOpen ? "rotate-180 text-indigo-600" : ""}`} />
                </button>

                {categoriesOpen && (
                  <div className="absolute left-0 top-full pt-2 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 space-y-1.5">
                      <Link 
                        href="/categories" 
                        className="flex items-center gap-3.5 px-4 py-3 rounded-xl hover:bg-indigo-50/80 text-slate-800 hover:text-indigo-600 transition-all font-bold text-sm group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-base">All Categories</div>
                          <div className="text-xs text-slate-500 font-normal">Explore 32+ business categories</div>
                        </div>
                      </Link>
                      <Link 
                        href="/listings?category=hotels-restaurants" 
                        className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-all text-sm font-semibold"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                        <span>Hotels &amp; Restaurants</span>
                      </Link>
                      <Link 
                        href="/listings?category=health-beauty" 
                        className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-all text-sm font-semibold"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-400"></span>
                        <span>Health &amp; Beauty</span>
                      </Link>
                      <Link 
                        href="/listings?category=technology-it" 
                        className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-all text-sm font-semibold"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        <span>Technology &amp; IT</span>
                      </Link>
                      <Link 
                        href="/listings?category=real-estate" 
                        className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-indigo-600 transition-all text-sm font-semibold"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                        <span>Real Estate</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/featured"
                className="hover:text-indigo-600 transition-colors py-2 flex items-center gap-1"
              >
                <span>Featured</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-extrabold">Hot</span>
              </Link>

              <Link
                href="/blog"
                className="hover:text-indigo-600 transition-colors py-2"
              >
                Blog
              </Link>
            </nav>

            {/* Right Side: Action Buttons + Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                <Button
                  onClick={() => router.push("/listings/create")}
                  className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white px-5 py-2.5 rounded-[10px] text-sm font-bold tracking-wide shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/35 transition-all active:scale-95 cursor-pointer h-auto border-0"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add Listing</span>
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => router.push("/login")}
                  className="hidden md:inline-flex px-3.5 py-2 text-base font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors cursor-pointer rounded-[10px] h-auto"
                >
                  <span>Login</span>
                </Button>

                <Button
                  onClick={() => router.push("/register")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded-[10px] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer h-auto border-0"
                >
                  <span>Register</span>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="flex lg:hidden items-center">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2.5 rounded-[10px] text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
                  aria-label="Toggle Menu"
                >
                  {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>
              </div>
            </div>
          </div>
        </Container>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white shadow-xl animate-in slide-in-from-top-4 duration-200">
            <Container className="py-6 space-y-5">
              <nav className="flex flex-col space-y-1.5 text-lg font-bold text-slate-800">
                <Link
                  href="/listings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-[10px] hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  Browse Listings
                </Link>
                <Link
                  href="/categories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-[10px] hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  Categories
                </Link>
                <Link
                  href="/featured"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-[10px] hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  Featured Listings
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-[10px] hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  Blog &amp; Guides
                </Link>
              </nav>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/listings/create");
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white py-3.5 rounded-[10px] font-bold text-base shadow-md shadow-indigo-500/25 h-auto cursor-pointer border-0"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Free Listing</span>
                </Button>
                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/login");
                    }}
                    className="w-full flex items-center justify-center py-3 rounded-[10px] border border-slate-200 text-slate-700 hover:text-indigo-600 font-bold hover:bg-slate-50 text-sm h-auto cursor-pointer"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      router.push("/register");
                    }}
                    className="w-full flex items-center justify-center py-3 rounded-[10px] bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-sm h-auto cursor-pointer border-0"
                  >
                    Register
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}
