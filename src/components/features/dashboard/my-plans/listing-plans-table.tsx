"use client";

import { DataTable } from "@/components/common/data-table";
import { SelectWithLabel } from "@/components/common/select-with-label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ListingPlanItem } from "@/data";
import { cn } from "@/lib/utils";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Crown,
  MapPin,
  Rocket,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

interface ListingPlansTableProps {
  listingPlans: ListingPlanItem[];
  onUpgradeListing: (listing: ListingPlanItem) => void;
}

export function ListingPlansTable({
  listingPlans,
  onUpgradeListing,
}: ListingPlansTableProps) {
  const [planFilter, setPlanFilter] = useState<string>("All");

  const filteredData = useMemo(() => {
    if (planFilter === "All") return listingPlans;
    return listingPlans.filter((item) => item.planId === planFilter);
  }, [listingPlans, planFilter]);

  const planFilterOptions = [
    { value: "All", label: "All Listings" },
    { value: "free", label: "Free Tier" },
    { value: "featured", label: "Featured" },
    { value: "featured-pro", label: "Featured Pro" },
  ];

  const columns = useMemo<ColumnDef<ListingPlanItem>[]>(
    () => [
      // 0. Serial Number
      {
        id: "index",
        header: "No.",
        cell: ({ row }) => (
          <span className="text-xs font-semibold text-slate-500">
            {row.index + 1}
          </span>
        ),
      },

      // 1. Business Listing Details
      {
        id: "business",
        header: "Business Listing",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-start gap-3.5 min-w-[240px]">
              <Image
                src={item.image}
                alt={item.listingName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-100 shadow-2xs"
              />
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {item.listingName}
                </h4>
                <div className="flex items-center gap-1 text-xs text-slate-400 truncate max-w-xs">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{item.city}</span>
                </div>
              </div>
            </div>
          );
        },
      },

      // 2. Current Plan (Badges like my-listings table)
      {
        id: "plan",
        header: "Current Plan",
        cell: ({ row }) => {
          const item = row.original;
          if (item.planId === "featured-pro") {
            return (
              <Badge variant="indigo" className="gap-1 font-semibold">
                <Rocket className="w-3 h-3 text-indigo-600" />
                <span>Featured Pro</span>
              </Badge>
            );
          }
          if (item.planId === "featured") {
            return (
              <Badge variant="amber" className="gap-1 font-semibold">
                <Crown className="w-3 h-3 text-amber-600 fill-amber-400" />
                <span>Featured</span>
              </Badge>
            );
          }
          return (
            <Badge variant="muted" className="gap-1 font-semibold text-slate-600">
              <span>Free</span>
            </Badge>
          );
        },
      },

      // 3. Price & Billing
      {
        id: "price",
        header: "Price & Billing",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                {item.price}
              </span>
              <span className="text-[11px] text-slate-500 ml-1">
                {item.period}
              </span>
            </div>
          );
        },
      },

      // 4. Start Date
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => (
          <span className="text-xs text-slate-600 font-medium whitespace-nowrap">
            {row.original.startDate}
          </span>
        ),
      },

      // 5. Expiry Date
      {
        accessorKey: "expiryDate",
        header: "Expiry Date",
        cell: ({ row }) => {
          const isLifetime = row.original.expiryDate === "Lifetime";
          return (
            <span
              className={`text-xs font-semibold whitespace-nowrap ${
                isLifetime ? "text-indigo-600" : "text-slate-700"
              }`}
            >
              {row.original.expiryDate}
            </span>
          );
        },
      },

      // 6. Validity / Days Left (Normal text)
      {
        id: "validity",
        header: "Validity",
        cell: ({ row }) => {
          const item = row.original;
          if (item.status === "Expired" || (item.daysRemaining !== null && item.daysRemaining <= 0)) {
            return (
              <span className="text-xs font-semibold text-rose-600">
                Expired
              </span>
            );
          }

          if (item.daysRemaining === null) {
            return (
              <span className="text-xs font-medium text-slate-600">
                Lifetime
              </span>
            );
          }

          return (
            <span className="text-xs font-medium text-slate-700">
              {item.daysRemaining} Days Left
            </span>
          );
        },
      },

      // 7. Action: Only "Upgrade Plan", disabled until expired
      {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
          const item = row.original;
          const isUpgradeDisabled = item.planId !== "free" && item.status !== "Expired";

          return (
            <div className="flex items-center justify-end">
              <Button
                size="sm"
                disabled={isUpgradeDisabled}
                onClick={() => onUpgradeListing(item)}
                title={isUpgradeDisabled ? "Plan is active until expiration" : "Upgrade Plan"}
                className={cn(
                  "h-8 px-3 rounded-[10px] text-xs font-semibold gap-1.5 transition-all cursor-pointer",
                  isUpgradeDisabled && "cursor-no-drop! pointer-events-auto!"
                )}
              >
                <Sparkles className="size-3.5" />
                <span>Upgrade Plan</span>
              </Button>
            </div>
          );
        },
      },
    ],
    [onUpgradeListing]
  );

  return (
    <div className="space-y-4">
      {/* Table Header Section: Left side title only, Right side SelectWithLabel without label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg sm:text-xl font-bold text-foreground">
          My Active Plans
        </h3>

        <div className="w-full sm:w-56">
          <SelectWithLabel
            value={planFilter}
            onValueChange={setPlanFilter}
            options={planFilterOptions}
            placeholder="All Plans"
            triggerClassName="h-10!"
          />
        </div>
      </div>

      {/* TanStack DataTable */}
      <DataTable
        columns={columns}
        data={filteredData}
        emptyMessage="No business listings found."
        className="rounded-xl"
      />
    </div>
  );
}
