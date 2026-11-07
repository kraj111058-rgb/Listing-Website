"use client";

import { AdvertisePackages } from "@/components/features/advertise";
import {
  initialListingPlans,
  type ListingPackageItem,
  type ListingPlanItem,
} from "@/data";
import { useState } from "react";
import { ListingPlansTable } from "./listing-plans-table";
import { MyPlansStats } from "./my-plans-stats";
import { UpgradePlanModal } from "./upgrade-plan-modal";

export function MyPlansView() {
  const [listingPlans, setListingPlans] = useState<ListingPlanItem[]>(initialListingPlans);

  // Upgrade modal state
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<"featured" | "featured-pro">("featured");

  const handleUpgradeFromTable = (listing: ListingPlanItem) => {
    setSelectedListingId(listing.id);
    const targetPlan = listing.planId === "featured" ? "featured-pro" : "featured";
    setSelectedPlanId(targetPlan);
    setIsUpgradeModalOpen(true);
  };

  const handleSelectPlanFromGrid = (plan: ListingPackageItem) => {
    if (plan.id === "featured" || plan.id === "featured-pro") {
      setSelectedPlanId(plan.id);
      setIsUpgradeModalOpen(true);
    }
  };

  const handleConfirmUpgrade = (listingId: string, planId: "featured" | "featured-pro") => {
    const isPro = planId === "featured-pro";
    const planName = isPro ? "Featured Pro" : "Featured Listing";
    const priceStr = isPro ? "₹499" : "₹199";

    // Update listing in list
    setListingPlans((prev) =>
      prev.map((item) => {
        if (item.id === listingId) {
          return {
            ...item,
            planId,
            planName,
            price: priceStr,
            period: "/ 3 months",
            status: "Active",
            startDate: "Today",
            expiryDate: "06 Feb 2027",
            daysRemaining: 90,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          My Plans & Subscriptions
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage advertising plans individually per business listing, track validity, and boost your local reach.
        </p>
      </div>

      {/* Top Summary Stat Cards (4 Columns) */}
      <MyPlansStats listingPlans={listingPlans} />

      {/* 1. Per-Listing Table */}
      <div className="bg-white rounded-2xl px-5 py-6 border border-slate-200/90 shadow-2xs">
        <ListingPlansTable
          listingPlans={listingPlans}
          onUpgradeListing={handleUpgradeFromTable}
        />
      </div>

      <div className="pt-5 sm:pt-8 border-t border-t-slate-200/80">
        <AdvertisePackages isDashboard={true} />
      </div>

      {/* Upgrade Plan Modal */}
      <UpgradePlanModal
        open={isUpgradeModalOpen}
        onOpenChange={setIsUpgradeModalOpen}
        listings={listingPlans}
        selectedListingId={selectedListingId}
        initialPlanId={selectedPlanId}
        onConfirmUpgrade={handleConfirmUpgrade}
      />
    </div>
  );
}
