"use client";

import { Check, X } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";
import { listingWizardPlans, type ListingPackageItem } from "@/data";
import type { ListingWizardFormValues } from "@/schemas";

export function Step5ChoosePlan() {
  const { setValue, control } = useFormContext<ListingWizardFormValues>();

  const selectedPlan =
    (useWatch({ control, name: "selectedPlan" }) as "free" | "featured" | "featured-pro") ||
    "free";

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Step Header */}
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900">
          Choose Your Plan
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Select the listing package that best fits your business promotion and growth goals.
        </p>
      </div>

      {/* 3-Package Grid (Reusing packages from @/data) */}
      <div className="py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {listingWizardPlans.map((pkg: ListingPackageItem) => {
            const isSelected = selectedPlan === pkg.id;

            return (
              <div
                key={pkg.id}
                onClick={() =>
                  setValue("selectedPlan", pkg.id as "free" | "featured" | "featured-pro", {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 cursor-pointer relative ${
                  isSelected
                    ? "bg-white border-2 border-[#5c67f2] shadow-xl shadow-indigo-500/10 ring-4 ring-indigo-50/70"
                    : "bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                {/* Optional Top Badges */}
                {pkg.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center rounded-full shadow-md shadow-indigo-500/15 overflow-hidden whitespace-nowrap z-10 border border-white/60">
                    <span className="bg-indigo-600 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 whitespace-nowrap">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div>
                  {/* Icon & Selection Radio */}
                  <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs ${pkg.iconBg}`}
                    >
                      <span>{pkg.icon}</span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#5c67f2] text-white shadow-xs"
                          : "border-2 border-slate-300"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Tag & Plan Name */}
                  <div className="mb-1">
                    <span
                      className={`text-[11px] font-bold tracking-wider uppercase ${pkg.tagColor}`}
                    >
                      {pkg.tag}
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 mb-3">
                    {pkg.name}
                  </h4>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                      {pkg.price}
                    </span>
                    <span className="text-slate-500 font-semibold text-xs">
                      {pkg.period}
                    </span>
                  </div>

                  {/* Headline & Description */}
                  <div className="space-y-1 pb-5 border-b border-slate-100">
                    <h5 className={`font-bold text-xs ${pkg.headlineColor}`}>
                      {pkg.headline}
                    </h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="py-5 space-y-3">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Features Included
                    </div>
                    <ul className="space-y-2.5 text-xs">
                      {pkg.included.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-slate-700 font-medium"
                        >
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${pkg.checkBg}`}
                          >
                            <Check size={11} strokeWidth={3} />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}

                      {pkg.excluded.map((feature, idx) => (
                        <li
                          key={`ex-${idx}`}
                          className="flex items-start gap-2.5 text-slate-400"
                        >
                          <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                            <X size={11} strokeWidth={3} />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Select Action Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? "bg-[#5c67f2] text-white shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Selected Plan</span>
                      </>
                    ) : (
                      <span>Choose {pkg.name}</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
