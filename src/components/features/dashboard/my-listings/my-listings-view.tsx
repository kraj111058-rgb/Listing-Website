"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { AlertModal } from "@/components/common";
import { Button } from "@/components/ui/button";
import { initialUserListings, type UserListingItem } from "@/data";
import { MyListingsFilters, type StatusTabItem } from "./my-listings-filters";
import { MyListingsTable } from "./my-listings-table";
import { MyListingsEmpty } from "./my-listings-empty";

export function MyListingsView() {
  const [listings, setListings] = useState<UserListingItem[]>(initialUserListings);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [deleteListingId, setDeleteListingId] = useState<string | null>(null);

  const toggleActive = (id: string) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === id && item.status === "Approved") {
          const currentActive = item.isActive !== false;
          return { ...item, isActive: !currentActive };
        }
        return item;
      })
    );
  };

  const confirmDeleteListing = () => {
    if (deleteListingId) {
      setListings((prev) => prev.filter((item) => item.id !== deleteListingId));
      setDeleteListingId(null);
    }
  };

  const listingToDelete = listings.find((item) => item.id === deleteListingId);

  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const allCount = listings.length;
  const approvedCount = listings.filter((l) => l.status === "Approved").length;
  const pendingCount = listings.filter((l) => l.status === "Pending").length;
  const rejectedCount = listings.filter((l) => l.status === "Rejected").length;

  const tabs: StatusTabItem[] = [
    { id: "All", label: "All", count: allCount },
    { id: "Approved", label: "Approved", count: approvedCount },
    { id: "Pending", label: "Pending", count: pendingCount },
    { id: "Rejected", label: "Rejected", count: rejectedCount },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My Business Listings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your verified businesses, view verification status, and toggle visibility.
          </p>
        </div>

        <Link href="/dashboard/create-listing">
          <Button
            type="button"
            className="h-11 px-5 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New</span>
          </Button>
        </Link>
      </div>

      {/* Tabs Filter Bar with Base UI Tabs and Search */}
      <MyListingsFilters
        tabs={tabs}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Listings Table or Empty State */}
      {filteredListings.length === 0 ? (
        <MyListingsEmpty />
      ) : (
        <MyListingsTable
          data={filteredListings}
          onToggleActive={toggleActive}
          onDelete={(id) => setDeleteListingId(id)}
        />
      )}

      {/* Delete Confirmation Alert Modal */}
      <AlertModal
        open={!!deleteListingId}
        onOpenChange={(open) => !open && setDeleteListingId(null)}
        title="Delete Business Listing"
        description={
          listingToDelete
            ? `Are you sure you want to delete "${listingToDelete.name}"? All associated inquiries, reviews, and catalog data will be permanently removed.`
            : "Are you sure you want to delete this listing? This action cannot be undone."
        }
        confirmLabel="Delete Listing"
        cancelLabel="Cancel"
        confirmVariant="destructive"
        onConfirm={confirmDeleteListing}
      />
    </div>
  );
}
