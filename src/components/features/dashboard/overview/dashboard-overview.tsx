"use client";

import { useEffect } from "react";
import { useCurrentUser } from "@/services/auth";
import { DashboardWelcomeBanner } from "./dashboard-welcome-banner";
import { DashboardStatsGrid } from "./dashboard-stats-grid";
import { DashboardListingsPreview } from "./dashboard-listings-preview";
import { DashboardReviewsPreview } from "./dashboard-reviews-preview";

export function DashboardOverview() {
  const { data: currentUser } = useCurrentUser();
  const userProfile = currentUser?.profile;
  const displayName = userProfile?.name || currentUser?.email?.split("@")[0] || "User";

  // Clean up any stale auth error hash from expired/reused verification links
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.includes("error")) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <div className="space-y-7">
      {/* 1. Welcome Banner */}
      <DashboardWelcomeBanner userName={displayName} />

      {/* 2. KPI Stats Cards */}
      <DashboardStatsGrid />

      {/* 3. Main Split View: Listings Preview & Recent Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
        <div className="lg:col-span-2">
          <DashboardListingsPreview />
        </div>
        <div>
          <DashboardReviewsPreview />
        </div>
      </div>
    </div>
  );
}
