"use client";

import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  InputWithLabel,
  TextareaWithLabel,
} from "@/components/common";
import type { ListingWizardFormValues } from "@/schemas";

export function Step4SeoDetails() {
  const { control, getValues, setValue } = useFormContext<ListingWizardFormValues>();

  // Pure react-hook-form auto-fill: Defaults from Step 1 & 2 if fields are currently empty
  useEffect(() => {
    const currentMetaTitle = getValues("metaTitle");
    const businessName = getValues("name");
    const city = getValues("city");
    if (!currentMetaTitle && businessName) {
      const generatedTitle = city ? `${businessName} in ${city}` : businessName;
      setValue("metaTitle", generatedTitle.slice(0, 100), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    const currentMetaDesc = getValues("metaDescription");
    const shortDesc = getValues("shortDescription");
    if (!currentMetaDesc && shortDesc) {
      setValue("metaDescription", shortDesc.slice(0, 200), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    const currentKeywords = getValues("metaKeywords");
    const tags = getValues("tags");
    if (!currentKeywords && tags && tags.length > 0) {
      setValue("metaKeywords", tags.slice(0, 5).join(", "), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [getValues, setValue]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900">
          SEO Details
        </h3>
      </div>

      {/* Pro Tip Banner */}
      <div className="p-4 rounded-lg bg-indigo-50/90 text-foreground border border-primary flex items-start gap-2 text-xs md:text-sm">
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
              placeholder="e.g. Royal Palace Heritage Hotel & Resort in Jaipur"
              {...field}
              error={error?.message}
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
              rows={4}
              placeholder="e.g. Luxury heritage hotel in Jaipur offering 5-star suites, royal dining, and event spaces."
              {...field}
              error={error?.message}
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
              placeholder="e.g. hotel in jaipur, luxury resort, heritage stay"
              description="Separate keywords with commas (e.g. hotel in jaipur, luxury resort, heritage stay, ...)"
              {...field}
              error={error?.message}
            />
          )}
        />
      </div>
    </div>
  );
}
