"use client";

import { Container } from "@/components/common";
import { cn } from "@/lib/utils";
import { getPlanTheme, useActiveSubscriptionPlans } from "@/services";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

interface AdvertisePackagesProps {
  isDashboard?: boolean;
}

export function AdvertisePackages({ isDashboard }: AdvertisePackagesProps) {
  const { data: plans, isLoading } = useActiveSubscriptionPlans();

  return (
    <section
      id="packages"
      className={cn(
        "py-20 md:py-28 bg-white scroll-mt-12",
        isDashboard && "bg-transparent shadow-none p-0!"
      )}
    >
      <Container>
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-14 space-y-3",
            isDashboard && "space-y-2.5"
          )}
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <span>OUR PACKAGES</span>
          </div>
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight",
              isDashboard && "text-xl sm:text-[26px]!"
            )}
          >
            Choose Your Advertising Package
          </h2>
          <p
            className={cn(
              "text-muted-foreground text-base sm:text-lg leading-relaxed",
              isDashboard && "text-xs sm:text-sm"
            )}
          >
            Powerful ways to grow your business and reach customers across India.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch",
            isDashboard && "lg:grid-cols-2 xl:grid-cols-3"
          )}
        >
          {isLoading ? (
            <>
              {[1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className="rounded-3xl flex flex-col justify-between bg-card border border-border shadow-[0_4px_24px_rgba(0,0,0,0.05)] p-8 relative animate-pulse"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-slate-200 mb-4" />
                    <div className="h-3.5 w-20 bg-slate-200 rounded mb-2" />
                    <div className="h-7 w-3/4 bg-slate-200 rounded-lg mb-4" />
                    <div className="flex items-baseline gap-2 mb-5">
                      <div className="h-9 w-28 bg-slate-200 rounded-lg" />
                      <div className="h-4 w-16 bg-slate-200 rounded" />
                    </div>
                    <div className="space-y-2 pb-6 border-b border-border">
                      <div className="h-4 w-1/2 bg-slate-200 rounded" />
                      <div className="h-3.5 w-full bg-slate-200 rounded" />
                      <div className="h-3.5 w-4/5 bg-slate-200 rounded" />
                    </div>
                    <div className="py-6 space-y-3.5">
                      <div className="h-3 w-28 bg-slate-200 rounded mb-2" />
                      <div className="space-y-2.5">
                        {[1, 2, 3, 4].map((fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-slate-200 shrink-0" />
                            <div className="h-3.5 flex-1 bg-slate-200 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="w-full h-12 bg-slate-200 rounded-xl" />
                  </div>
                </div>
              ))}
            </>
          ) : !plans || plans.length === 0 ? (
            <div className={cn("col-span-full py-16 text-center border-2 border-border rounded-2xl px-8 bg-slate-50/50", isDashboard && "bg-background ")}>
              <p className="text-lg font-bold text-slate-800">
                No active subscription packages available.
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Please configure active plans in the admin panel.
              </p>
            </div>
          ) : (
            plans.map((plan) => {
              const theme = getPlanTheme(plan);

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                    plan.popular
                      ? "bg-white border-2 border-indigo-500 shadow-[0_12px_40px_rgba(99,102,241,0.18)] lg:-translate-y-3 p-8 sm:p-9"
                      : "bg-card border border-border shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-xl p-8"
                  }`}
                >
                  {/* Top Badges for Popular Package */}
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center rounded-full shadow-md shadow-indigo-500/20 overflow-hidden whitespace-nowrap z-10 border border-white/40">
                      <span className="bg-indigo-600 text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 whitespace-nowrap">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Icon Box */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs transition-transform hover:scale-105 border ${theme.iconStyle}`}
                      >
                        <span>{plan.icon || theme.icon}</span>
                      </div>
                    </div>

                    {/* Header tag */}
                    <div className="mb-2">
                      <span
                        className={`text-xs font-bold tracking-wider uppercase ${theme.tagColor}`}
                      >
                        {plan.tag || theme.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-foreground mb-4">
                      {plan.name}
                    </h3>

                    {/* Price Display */}
                    <div className="flex items-baseline gap-1.5 mb-5">
                      <span className="text-[36px] font-bold text-foreground tracking-tight leading-none">
                        ₹{plan.price}
                      </span>
                      <span className="text-slate-500 font-semibold text-sm">
                        {plan.period}
                      </span>
                    </div>

                    {/* Headline & Description */}
                    <div className="space-y-2 pb-6 border-b border-border">
                      <h4 className={cn("font-bold text-sm", theme.headline.color)}>
                        {plan.headline || theme.headline.text}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="py-6 space-y-3.5">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Features Included
                      </div>
                      <ul className="space-y-2.5 text-xs sm:text-sm">
                        {(plan.included_features || []).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-slate-700 font-medium"
                          >
                            <div
                              className={cn(
                                "w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                                theme.checkBg
                              )}
                            >
                              <Check size={11} strokeWidth={3} />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-border mt-auto">
                    <Link
                      href={theme.button.href}
                      className={cn(
                        "w-full py-3.5 px-6 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5",
                        theme.button.style,
                        isDashboard && "py-2.75 px-5"
                      )}
                    >
                      <span>{theme.button.text}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Container>
    </section>
  );
}
