"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AlertModal } from "@/components/common";
import { Button } from "@/components/ui/button";
import { initialGivenReviews, type GivenReviewItem } from "@/data";
import { MyReviewsStatsCard } from "./my-reviews-stats-card";
import { MyReviewsList } from "./my-reviews-list";

export function MyReviewsView() {
  const [reviews, setReviews] = useState<GivenReviewItem[]>(initialGivenReviews);
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);

  const confirmDelete = () => {
    if (deleteReviewId) {
      setReviews((prev) => prev.filter((r) => r.id !== deleteReviewId));
      setDeleteReviewId(null);
    }
  };

  const reviewToDelete = reviews.find((r) => r.id === deleteReviewId);

  const avgRating =
    reviews.length > 0
      ? (
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      ).toFixed(1)
      : "0";

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My Reviews
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage and view all the reviews and ratings you have submitted for businesses.
          </p>
        </div>

        <Link href="/listings">
          <Button
            type="button"
            className="h-10 px-4 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Write New Review</span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <MyReviewsStatsCard
        totalReviews={reviews.length}
        avgRating={avgRating}
        fiveStarCount={fiveStarCount}
      />

      {/* Reviews List with Search */}
      <MyReviewsList
        reviews={reviews}
        onDelete={(id) => setDeleteReviewId(id)}
      />

      {/* Delete Confirmation Alert Modal */}
      <AlertModal
        open={!!deleteReviewId}
        onOpenChange={(open) => !open && setDeleteReviewId(null)}
        title="Delete Review"
        description={
          reviewToDelete
            ? `Are you sure you want to delete your review for "${reviewToDelete.businessName}"? This action cannot be undone.`
            : "Are you sure you want to delete this review? This action cannot be undone."
        }
        confirmLabel="Delete Review"
        cancelLabel="Cancel"
        confirmVariant="destructive"
        onConfirm={confirmDelete}
      />
    </div>
  );
}
