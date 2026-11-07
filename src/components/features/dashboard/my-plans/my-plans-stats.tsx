"use client";

import { Crown, Building2, Clock } from "lucide-react";
import type { ListingPlanItem } from "@/data";

interface MyPlansStatsProps {
  listingPlans: ListingPlanItem[];
}

export function MyPlansStats({ listingPlans }: MyPlansStatsProps) {
  const totalPlans = listingPlans.length;
  const activeFeaturedCount = listingPlans.filter(
    (l) => (l.planId === "featured" || l.planId === "featured-pro") && l.status !== "Expired"
  ).length;
  const freeTierCount = listingPlans.filter((l) => l.planId === "free").length;
  const expiredOrExpiringCount = listingPlans.filter(
    (l) => l.status === "Expired" || (l.daysRemaining !== null && l.daysRemaining <= 7)
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Stat 1: Total Plans */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            Total Plans
          </span>
          <div className="size-8.5 sm:size-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Building2 className="size-4 sm:size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            {totalPlans}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            All plans assigned across listings
          </p>
        </div>
      </div>

      {/* Stat 2: Active Featured Listings */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            Featured Active
          </span>
          <div className="size-8.5 sm:size-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Crown className="size-4 sm:size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-amber-600 tracking-tight">
            {activeFeaturedCount}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Active Featured & Featured Pro tiers
          </p>
        </div>
      </div>

      {/* Stat 3: Free Tier Listings */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            Free Tier
          </span>
          <div className="size-8.5 sm:size-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Building2 className="size-4 sm:size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            {freeTierCount}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Lifetime standard directory presence
          </p>
        </div>
      </div>

      {/* Stat 4: Expired / Expiring Soon */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-border shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-foreground">
            Expired / Expiring
          </span>
          <div className="size-8.5 sm:size-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Clock className="size-4 sm:size-4.5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-rose-600 tracking-tight">
            {expiredOrExpiringCount}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Renew to keep priority search benefits
          </p>
        </div>
      </div>
    </div>
  );
}
