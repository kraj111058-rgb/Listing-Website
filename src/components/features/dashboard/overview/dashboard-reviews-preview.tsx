"use client";

import * as React from "react";
import Link from "next/link";
import { Star, Building2, ArrowRight } from "lucide-react";
import { UserAvatar } from "@/components/common";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { initialReceivedReviews, type ReceivedReviewItem } from "@/data";
import { cn } from "@/lib/utils";

interface DashboardReviewsPreviewProps {
  reviews?: ReceivedReviewItem[];
}

export function DashboardReviewsPreview({
  reviews = initialReceivedReviews,
}: DashboardReviewsPreviewProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Recent Reviews Received
          </h3>
          <p className="text-xs text-slate-400">
            Customer feedback on your listings
          </p>
        </div>
        <Link
          href="/dashboard/customer-reviews"
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Reviews Carousel Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          {/* Header Controls: Count & Next/Prev Arrows */}
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-semibold text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {current || 1}
              </span>{" "}
              of {count || reviews.length}
            </span>

            <div className="flex items-center gap-1.5">
              <CarouselPrevious className="static translate-y-0 size-7.5 rounded-lg border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs cursor-pointer" />
              <CarouselNext className="static translate-y-0 size-7.5 rounded-lg border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs cursor-pointer" />
            </div>
          </div>

          {/* Slides Content */}
          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="basis-full">
                <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 space-y-3 hover:bg-slate-50 transition-colors">
                  {/* Author, Date & Golden Star Rating */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <UserAvatar
                        name={review.author}
                        src={review.avatar?.includes("/") ? review.avatar : undefined}
                        className="size-9.75 shrink-0 shadow-2xs"
                        fallbackClassName="bg-indigo-50 border border-indigo-100/90 text-indigo-600 font-bold text-sm"
                      />
                      <div className="min-w-0">
                        <h5 className="text-sm font-bold text-slate-900 leading-tight truncate">
                          {review.author}
                        </h5>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {review.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed italic line-clamp-3">
                    &ldquo;{review.comment}&rdquo;
                  </p>

                  {/* Target Listing */}
                  <div className="pt-2.5 flex items-center gap-2 text-xs text-slate-500 border-t border-slate-200/60">
                    <Building2 className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span
                      className="font-medium text-slate-600 truncate"
                      title={review.listingName}
                    >
                      {review.listingName}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Dots Indicator */}
          {count > 1 && (
            <div className="flex items-center justify-center gap-1.5 pt-3">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all cursor-pointer",
                    current === i + 1
                      ? "w-5 bg-indigo-600"
                      : "w-1.5 bg-slate-200 hover:bg-slate-300"
                  )}
                  title={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
}
