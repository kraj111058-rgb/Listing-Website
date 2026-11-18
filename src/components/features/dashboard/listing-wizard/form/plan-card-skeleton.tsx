import { Skeleton } from "@/components/ui/skeleton";

interface PlanCardSkeletonProps {
  count?: number;
}

export function PlanCardSkeleton({ count = 3 }: PlanCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl p-6 sm:p-7 flex flex-col justify-between bg-white border border-slate-200/90 shadow-xs relative"
        >
          <div>
            {/* Icon & Radio placeholder */}
            <div className="flex items-center justify-between gap-2 mb-4 pt-1">
              <Skeleton className="w-12 h-12 rounded-2xl" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>

            {/* Tag & Plan Name */}
            <Skeleton className="h-3 w-20 mb-2.5 rounded" />
            <Skeleton className="h-6 w-3/4 mb-3 rounded-lg" />

            {/* Price & Period */}
            <div className="flex items-baseline gap-2 mb-4">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>

            {/* Headline & Description */}
            <div className="space-y-1.5 pb-5 border-b border-slate-100">
              <Skeleton className="h-4 w-2/3 rounded" />
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-4/5 rounded" />
            </div>

            {/* Features List */}
            <div className="py-5 space-y-3">
              <Skeleton className="h-2.5 w-24 mb-3 rounded" />
              <div className="space-y-2.5">
                {[1, 2, 3, 4].map((fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5">
                    <Skeleton className="w-4 h-4 rounded-full shrink-0" />
                    <Skeleton className="h-3.5 flex-1 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Button */}
          <div className="pt-4 border-t border-slate-100">
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </>
  );
}
