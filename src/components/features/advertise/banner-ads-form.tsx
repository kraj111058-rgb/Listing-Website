"use client";

import {
  InputWithLabel,
  SelectWithLabel,
  TextareaWithLabel,
  Loader,
} from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  bannerAdsFormSchema,
  bannerTypeOptions,
  type BannerAdsFormValues,
} from "@/schemas";
import { useBannerAds } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ruler, Send, Sparkles } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const sizePresets = [
  { label: "728 × 90 px (Leaderboard)", width: "728px", height: "90px", type: "Header Banner" },
  { label: "300 × 250 px (Medium Box)", width: "300px", height: "250px", type: "Side Banner" },
  { label: "300 × 600 px (Half Page)", width: "300px", height: "600px", type: "Side Banner" },
  { label: "728 × 300 px (In-Article)", width: "728px", height: "300px", type: "Blog Page Banner" },
  { label: "970 × 250 px (Billboard)", width: "970px", height: "250px", type: "Header Banner" },
  { label: "All Slots (Bundle)", width: "Responsive", height: "Multi-size", type: "All in One" },
];

export function BannerAdsForm() {
  const { mutate: submitInquiry, isPending } = useBannerAds();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BannerAdsFormValues>({
    resolver: zodResolver(bannerAdsFormSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      banner_type: "",
      width: "",
      height: "",
      notes: "",
    },
  });

  const onSubmit = (data: BannerAdsFormValues) => {
    submitInquiry(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const applyPreset = (preset: (typeof sizePresets)[number]) => {
    setValue("width", preset.width, { shouldValidate: true });
    setValue("height", preset.height, { shouldValidate: true });
    if (preset.type) {
      setValue("banner_type", preset.type, { shouldValidate: true });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
      <div className="mb-6 pb-6 border-b border-slate-100">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={13} />
          <span>Custom Ad Campaign</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Banner Ads Enquiry
        </h2>
        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
          Provide your preferred ad specifications and our team will get in touch with placement availability and pricing options.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Row 1: Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="banner-name"
                label="Contact Name"
                placeholder="Rahul Sharma"
                error={errors.name?.message}
                disabled={isPending}
                {...field}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="banner-email"
                label="Email Address"
                type="email"
                placeholder="rahul@brand.com"
                error={errors.email?.message}
                disabled={isPending}
                {...field}
              />
            )}
          />
        </div>

        {/* Row 2: Mobile Number and Banner Placement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="banner-mobile"
                type="tel"
                label="Mobile Number"
                placeholder="98765 43210"
                error={errors.mobile?.message}
                disabled={isPending}
                {...field}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(val);
                }}
              />
            )}
          />

          <Controller
            name="banner_type"
            control={control}
            render={({ field }) => (
              <SelectWithLabel
                id="banner-type"
                label="Preferred Ad Slot"
                placeholder="Choose banner slot"
                value={field.value}
                onValueChange={field.onChange}
                options={[...bannerTypeOptions]}
                error={errors.banner_type?.message}
                disabled={isPending}
              />
            )}
          />
        </div>

        {/* Preset Dimension Chips */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
            <Ruler size={13} className="text-indigo-600" />
            <span>Popular Standard Sizes (Click to Auto-fill)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizePresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                disabled={isPending}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50/50 hover:text-indigo-700 font-medium transition-all text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Custom Width and Height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Controller
            name="width"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="banner-width"
                label="Banner Width"
                placeholder="e.g., 728px"
                error={errors.width?.message}
                disabled={isPending}
                {...field}
              />
            )}
          />

          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="banner-height"
                label="Banner Height"
                placeholder="e.g., 90px"
                error={errors.height?.message}
                disabled={isPending}
                {...field}
              />
            )}
          />
        </div>

        {/* Row 4: Additional Notes / Requirements */}
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextareaWithLabel
              id="banner-notes"
              label="Campaign Details or Specific Requirements (Optional)"
              rows={4}
              placeholder="Share your landing page URL, target city/categories, planned duration (e.g., 30 days), or creative design assistance needs..."
              error={errors.notes?.message}
              disabled={isPending}
              {...field}
            />
          )}
        />

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isPending}
            size="lg"
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 h-11 cursor-pointer font-semibold"
          >
            {isPending ? (
              <>
                <Loader inline size="sm" />
                <span>Submitting Campaign Details...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Submit Banner Ads Enquiry</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
