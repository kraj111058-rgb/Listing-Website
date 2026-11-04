"use client";

import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";
import { Container } from "@/components/common";
import { packages } from "@/data";

export function AdvertisePackages() {
  return (
    <section id="packages" className="py-20 md:py-28 bg-white scroll-mt-12">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <span>OUR PACKAGES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Choose Your Advertising Package
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Four powerful ways to grow your business and reach customers across India.
          </p>
        </div>

        {/* Packages Cards Grid: 3 in 1st row, 1 centered in 2nd row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                pkg.highlight
                  ? "bg-white border-2 border-indigo-500 shadow-[0_12px_40px_rgba(99,102,241,0.18)] lg:-translate-y-3 p-8 sm:p-9"
                  : "bg-card border border-border shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-xl p-8"
              } ${index === 3 ? "md:col-span-2 md:max-w-md md:mx-auto lg:col-span-1 lg:col-start-2 lg:max-w-none w-full" : ""}`}
            >
              {/* Top Badges for Featured Package */}
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center rounded-full shadow-md shadow-indigo-500/20 overflow-hidden whitespace-nowrap z-10 border border-white/40">
                  <span className="bg-indigo-600 text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 whitespace-nowrap">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div>
                {/* Icon Box above PACKAGE 1, 2, 3, 4 */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-xs transition-transform hover:scale-105 ${pkg.iconBg}`}
                  >
                    <span>{pkg.icon}</span>
                  </div>
                </div>

                {/* Header tag */}
                <div className="mb-2">
                  <span className={`text-xs font-bold tracking-wider uppercase ${pkg.tagColor}`}>
                    {pkg.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-foreground mb-4">
                  {pkg.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-baseline gap-1.5 mb-5">
                  <span className="text-[36px] font-bold text-foreground tracking-tight leading-none">
                    {pkg.price}
                  </span>
                  <span className="text-slate-500 font-semibold text-sm">
                    {pkg.period}
                  </span>
                </div>

                <div className="space-y-2 pb-6 border-b border-border">
                  <h4 className={`font-bold text-sm ${pkg.headlineColor}`}>
                    {pkg.headline}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="py-6 space-y-3.5">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Features Included
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm">
                    {pkg.included.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-slate-700 font-medium">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${pkg.checkBg}`}>
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {pkg.excluded.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-slate-400">
                        <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                          <X size={11} strokeWidth={3} />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-border">
                <Link
                  href={pkg.buttonHref}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 ${pkg.buttonStyle}`}
                >
                  <span>{pkg.buttonText}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
