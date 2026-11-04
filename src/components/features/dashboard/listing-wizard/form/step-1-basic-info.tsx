"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";
import {
  InputWithLabel,
  SelectWithLabel,
  TextareaWithLabel,
} from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categoryOptions } from "@/data";
import { cn, generateSlug } from "@/lib/utils";
import type { ListingWizardFormValues } from "@/schemas";
import { FieldError, FieldLabel } from "@/components/ui/field";

export function Step1BasicInfo() {
  const { control, setValue } = useFormContext<ListingWizardFormValues>();
  const [tagInput, setTagInput] = useState("");

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900">
          Basic Information
        </h3>
      </div>

      <div className="space-y-4">
        {/* Business Name */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWithLabel
              id="biz-name"
              label="Business Name"
              placeholder="Enter your business name"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                setValue("slug", generateSlug(e.target.value), {
                  shouldValidate: true,
                });
              }}
              error={error?.message}
            />
          )}
        />

        {/* Slug */}
        <Controller
          name="slug"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWithLabel
              id="biz-slug"
              label="Slug"
              placeholder="e.g. royal-palace-hotel"
              {...field}
              onChange={(e) => field.onChange(generateSlug(e.target.value))}
              error={error?.message}
            />
          )}
        />

        {/* Single Category */}
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <SelectWithLabel
              id="biz-category"
              label="Category"
              placeholder="Select a category..."
              value={field.value}
              onValueChange={(val) => field.onChange(val)}
              options={categoryOptions.map((cat) => ({ value: cat, label: cat }))}
              error={error?.message}
            />
          )}
        />

        {/* Short Description */}
        <Controller
          name="shortDescription"
          control={control}
          render={({ field, fieldState: { error } }) => {
            const val = field.value || "";
            return (
              <InputWithLabel
                id="biz-short-desc"
                label="Short Description"
                maxLength={160}
                placeholder="One-line summary of your business (max 160 chars)"
                {...field}
                error={error?.message}
                rightElement={
                  <span className="flex justify-end text-[11px] text-slate-400">
                    {val.length}/160
                  </span>
                }
              />
            );
          }}
        />

        {/* Full Description */}
        <Controller
          name="fullDescription"
          control={control}
          render={({ field, fieldState: { error } }) => {
            const val = field.value || "";

            return (
              <TextareaWithLabel
                id="biz-full-desc"
                label="Full Description"
                rows={4}
                maxLength={600}
                placeholder="Describe your business, services, specialties..."
                {...field}
                error={error?.message}
                rightElement={
                  <span className="flex justify-end text-[11px] text-slate-400">
                    {val.length}/600
                  </span>
                }
              />
            );
          }}
        />

        {/* Year Established & No. of Employees (2 columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name="established"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputWithLabel
                id="biz-established"
                label="Year Established"
                placeholder="e.g. 2015"
                {...field}
                error={error?.message}
              />
            )}
          />

          <Controller
            name="employees"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <SelectWithLabel
                id="biz-employees"
                label="No. of Employees"
                placeholder="Select employee range"
                value={field.value}
                onValueChange={(val) => field.onChange(val)}
                options={[
                  { value: "1-5", label: "1-5 Employees" },
                  { value: "6-20", label: "6-20 Employees" },
                  { value: "21-50", label: "21-50 Employees" },
                  { value: "51-200", label: "51-200 Employees" },
                  { value: "200+", label: "200+ Employees" },
                ]}
                error={error?.message}
              />
            )}
          />
        </div>

        {/* GST Number - Optional with standard 15-char GSTIN format validation */}
        <Controller
          name="gstin"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWithLabel
              id="biz-gstin"
              label="GST Number (optional)"
              placeholder="e.g. 08AAACR1234F1Z5"
              maxLength={15}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              error={error?.message}
            />
          )}
        />

        {/* Keywords / Tags (At least 1 , max 20) */}
        <Controller
          name="tags"
          control={control}
          render={({ field, fieldState: { error } }) => {
            const currentTags: string[] = field.value || [];

            const addTag = () => {
              if (tagInput.trim() && currentTags.length < 20) {
                const clean = tagInput.trim().replace(/^#/, "");
                if (!currentTags.includes(clean)) {
                  field.onChange([...currentTags, clean]);
                }
                setTagInput("");
              }
            };

            const removeTag = (tagToRemove: string) => {
              field.onChange(currentTags.filter((t: string) => t !== tagToRemove));
            };

            return (
              <div className="space-y-2">
                <FieldLabel className="text-xs sm:text-sm font-bold text-slate-700 select-none">
                  Keywords / Tags (Max 20)
                </FieldLabel>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Add a keyword and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    disabled={currentTags.length >= 20}
                    className={cn(
                      "flex-1 h-11 px-4 rounded-[10px] border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-600 text-sm font-medium",
                      error && "border-destructive focus-visible:ring-destructive/20"
                    )}
                  />
                  <Button
                    type="button"
                    size="icon"
                    onClick={addTag}
                    disabled={!tagInput.trim() || currentTags.length >= 20}
                    className="h-11 w-11 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white shrink-0 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>

                {/* Tags Validation Error Message */}
                {error && <FieldError>{error.message}</FieldError>}

                {/* Tags Pills */}
                {currentTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {currentTags.map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-rose-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}
