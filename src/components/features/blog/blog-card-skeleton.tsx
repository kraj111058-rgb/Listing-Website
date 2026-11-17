import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col justify-between">
      <div>
        {/* Cover Image Placeholder */}
        <Skeleton className="h-52 sm:h-56 w-full rounded-none" />

        {/* Content Body Placeholder */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-12" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-3/5" />
          </div>

          <div className="space-y-1.5 pt-1">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-2/3" />
          </div>
        </div>
      </div>

      {/* Footer Placeholder */}
      <div className="p-5 sm:p-6 pt-0 mt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-10 h-10 rounded-full shrink-0" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2.5 w-16" />
          </div>
        </div>
        <Skeleton className="h-8 w-16 rounded-lg" />
      </div>
    </article>
  );
}
