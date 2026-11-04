"use client";

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardWelcomeBannerProps {
  userName?: string;
  totalViews?: number;
  newInquiries?: number;
}

export function DashboardWelcomeBanner({
  userName = "Rahul Sharma",
  totalViews = 4820,
  newInquiries = 14,
}: DashboardWelcomeBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-border p-5 sm:p-6 shadow-2xs">
      {/* Soft Ambient Light Gradient & Mesh Accent */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 size-56 rounded-full bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/5 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none hidden md:block" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Greeting & Short Description */}
        <div className="space-y-1 min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Welcome back, {userName} 👋
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Your listings gained{" "}
            <strong className="text-foreground font-semibold">
              {totalViews.toLocaleString()} views
            </strong>{" "}
            and{" "}
            <strong className="text-foreground font-semibold">
              {newInquiries} inquiries
            </strong>{" "}
            this month.
          </p>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link href="/dashboard/create-listing">
            <Button
              type="button"
              className="h-10 px-4.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs shadow-indigo-500/20 transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              <PlusCircle className="size-4" />
              <span>Add New Listing</span>
            </Button>
          </Link>
          <Link href="/dashboard/my-listings">
            <Button
              type="button"
              variant="outline"
              className="h-10 px-4 rounded-xl border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
            >
              Manage Listings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
