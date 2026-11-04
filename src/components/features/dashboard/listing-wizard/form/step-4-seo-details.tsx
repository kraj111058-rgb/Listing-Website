"use client";

import { Controller, useFormContext } from "react-hook-form";
import {
  InputWithLabel,
  TextareaWithLabel,
} from "@/components/common";
import type { ListingWizardFormValues } from "@/schemas";

export function Step4SeoDetails() {
  const { control } = useFormContext<ListingWizardFormValues>();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900">
          SEO Details
        </h3>
      </div>

      {/* Pro Tip Banner */}
      <div className="p-4 rounded-lg bg-indigo-50/90 text-foreground border border-primary flex items-start gap-2 text-xs">
        <div className="text-base leading-none mt-0.5">💡</div>
        <p className="text-indigo-950 font-medium leading-relaxed">
          <span className="font-bold text-indigo-900">Pro Tip:</span> Good SEO details help your listing rank higher on Google and get more organic traffic.
        </p>
      </div>

      <div className="space-y-4">
        {/* Meta Title */}
        <Controller
          name="metaTitle"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWithLabel
              id="biz-meta-title"
              label="Meta Title"
              maxLength={60}
              placeholder="e.g. Best Pizza Restaurant in Delhi | MyBusiness"
              {...field}
              error={error?.message}
              description={
                <span className="flex justify-end text-[11px] text-slate-400">
                  {(field.value || "").length}/60 chars (ideal: 50-60)
                </span>
              }
            />
          )}
        />

        {/* Meta Description */}
        <Controller
          name="metaDescription"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextareaWithLabel
              id="biz-meta-desc"
              label="Meta Description"
              maxLength={160}
              rows={4}
              placeholder="One-line summary for search results..."
              {...field}
              error={error?.message}
              description={
                <span className="flex justify-end text-[11px] text-slate-400">
                  {(field.value || "").length}/160 chars (ideal: 140-160)
                </span>
              }
            />
          )}
        />

        {/* Meta Keywords */}
        <Controller
          name="metaKeywords"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWithLabel
              id="biz-meta-keywords"
              label="Meta Keywords (Max 5)"
              placeholder="e.g. hotel, luxury resort, jaipur stay"
              {...field}
              error={error?.message}
              description="Separate keywords with commas (e.g. hotel, luxury resort, jaipur stay)"
            />
          )}
        />
      </div>
    </div>
  );
}
