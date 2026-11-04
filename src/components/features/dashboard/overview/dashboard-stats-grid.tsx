"use client";

import {
  Building2,
  CheckCircle2,
  Clock,
  Eye,
  Star,
  TrendingUp,
} from "lucide-react";

interface DashboardStatsGridProps {
  totalListings?: number;
  approvedListings?: number;
  pendingListings?: number;
  activeListings?: number;
  totalViews?: number;
  avgRating?: number;
  reviewsCount?: number;
  pendingReplies?: number;
}

export function DashboardStatsGrid({
  totalListings = 3,
  approvedListings,
  pendingListings,
  activeListings = 2,
  totalViews = 4820,
  avgRating = 4.85,
  reviewsCount = 34,
  pendingReplies = 2,
}: DashboardStatsGridProps) {
  const approved = approvedListings ?? activeListings;
  const pending = pendingListings ?? Math.max(0, totalListings - approved);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
      {/* 1. Total Listings */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            Total Listings
          </span>
          <div className="size-8.5 sm:size-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Building2 className="size-4 sm:size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {totalListings}
            </span>
            <span className="text-xs font-medium text-muted-foreground">Total</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            In your account
          </p>
        </div>
      </div>

      {/* 2. Approved Listings */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            Approved
          </span>
          <div className="size-8.5 sm:size-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="size-4 sm:size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-600 tracking-tight">
              {approved}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="size-3 mr-0.5" /> Active
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            Live on portal
          </p>
        </div>
      </div>

      {/* 3. Pending Verification */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            Pending
          </span>
          <div className="size-8.5 sm:size-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="size-4 sm:size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold text-amber-600 tracking-tight">
              {pending}
            </span>
            <span className="text-xs font-semibold text-amber-600">Review</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            Verification queue
          </p>
        </div>
      </div>

      {/* 4. Total Views */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            Total Views
          </span>
          <div className="size-8.5 sm:size-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Eye className="size-4 sm:size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {totalViews.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="size-3 mr-0.5" /> +18%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            Search & visitors
          </p>
        </div>
      </div>

      {/* 5. Customer Reviews */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            Reviews
          </span>
          <div className="size-8.5 sm:size-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="size-4 sm:size-4.5 fill-amber-400" />
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {reviewsCount}
            </span>
            <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5">
              <Star className="size-3 fill-amber-400 text-amber-400" /> {avgRating}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            94% positive satisfaction
          </p>
        </div>
      </div>
    </div>
  );
}
