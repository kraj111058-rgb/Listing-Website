"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, CheckCircle2, Clock, ArrowRight, ShieldCheck, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormSuccessCardProps {
  mode?: "create" | "edit";
}

export function FormSuccessCard({ mode = "create" }: FormSuccessCardProps) {
  const router = useRouter();
  const isCreate = mode === "create";
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/dashboard/my-listings");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, router]);

  const handleGoToListings = () => {
    router.push("/dashboard/my-listings");
  };

  const progressPercentage = (countdown / 20) * 100;

  return (
    <div className="w-full py-6 flex items-center justify-center animate-in fade-in-50 zoom-in-95 duration-300">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-border/90 shadow-xl shadow-slate-900/5 overflow-hidden">
        <div className="p-6 sm:p-8 space-y-5 text-center">
          {/* Glowing Success Icon */}
          <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-xl animate-pulse" />
            <div className="relative w-16 h-16 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/25">
                <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>
          </div>

          {/* Heading & Subtitle with Crisp Typography */}
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              {isCreate
                ? "Listing Submitted Successfully!"
                : "Listing Updated Successfully!"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed font-normal">
              Your business details have been received and are currently queued for
              verification by our team.
            </p>
          </div>

          {/* Clean Status Card */}
          <div className="rounded-xl bg-slate-50/80 border border-border/80 p-3.5 flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
                <Clock className="w-4.5 h-4.5 stroke-[2.2]" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  Status: Under Review
                </p>
                <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                  Estimated review: 24 to 48 hours
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/80 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              <span>Pending</span>
            </span>
          </div>

          {/* Sleek Minimal Timeline Tracker */}
          <div className="rounded-xl bg-slate-50/80 border border-border/80 p-3 flex items-center justify-between text-center">
            {/* Step 1 */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-2xs">
                <Check className="size-4.25 stroke-[2.5]" />
              </div>
              <p className="text-xs font-bold text-emerald-700 leading-tight">
                Submitted
              </p>
              <p className="text-[10px] text-emerald-600 font-medium leading-none">
                Details Saved
              </p>
            </div>

            <span className="text-foreground text-base font-bold pb-3">→</span>

            {/* Step 2 */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shadow-2xs">
                <ShieldCheck className="size-4.25" />
              </div>
              <p className="text-xs font-bold text-amber-700 leading-tight">
                Reviewing
              </p>
              <p className="text-[10px] text-amber-600 font-medium leading-none">
                In Progress
              </p>
            </div>

            <span className="text-foreground text-base font-bold pb-3">→</span>

            {/* Step 3 */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-2xs">
                <Rocket className="size-4.25" />
              </div>
              <p className="text-xs font-bold text-emerald-700 leading-tight">
                Go Live
              </p>
              <p className="text-[10px] text-emerald-600 font-medium leading-none">
                Public Directory
              </p>
            </div>
          </div>

          {/* Action Button & Countdown */}
          <div className="pt-1 space-y-3">
            <Button
              type="button"
              onClick={handleGoToListings}
              className="w-full h-10 font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all hover:gap-3"
            >
              <span>View My Listings</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            {/* Countdown Progress Bar */}
            <div className="w-full space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-0.5">
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                  </span>
                  Redirecting to My Listings
                </span>
                <span className="font-bold text-slate-800 font-mono text-xs bg-slate-100 px-2 py-0.5 rounded-md">
                  {countdown}s
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Minimal Footer */}
          <p className="text-xs text-muted-foreground font-normal pt-1">
            You can update your listing details anytime from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
