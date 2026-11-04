"use client";

import { Controller, useFormContext } from "react-hook-form";
import { GalleryUpload, ImageUpload, InputWithLabel } from "@/components/common";
import { FieldLabel } from "@/components/ui/field";
import type { ListingWizardFormValues } from "@/schemas";

export function Step3PhotosSocial() {
  const { control } = useFormContext<ListingWizardFormValues>();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900">
          Photos & Social Links
        </h3>
      </div>

      <div className="space-y-6">
        {/* 1. Cover Image */}
        <Controller
          name="logo"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <ImageUpload
              id="biz-cover-image"
              label="Cover Image"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
              maxSizeMB={5}
              description="SVG, PNG, JPG or WEBP (max. 5MB). High-quality cover photo recommended."
            />
          )}
        />

        {/* 2. Photo Gallery (Max 5 Images) */}
        <Controller
          name="gallery"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <GalleryUpload
              id="biz-gallery"
              label="Photo Gallery (Max 5 Images)"
              value={field.value || []}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={error?.message}
              maxImages={5}
              maxSizeMB={5}
              description="SVG, PNG, JPG or WEBP (max. 5MB per image)"
            />
          )}
        />

        {/* 3. Social Media Links */}
        <div className="pt-2">
          <FieldLabel className="text-xs sm:text-sm font-semibold mb-3">
            Social Media Links
          </FieldLabel>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp Number */}
            <Controller
              name="whatsapp"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputWithLabel
                  id="biz-whatsapp"
                  label="WhatsApp Number"
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    field.onChange(value);
                  }}
                  error={error?.message}
                />
              )}
            />

            {/* Facebook Page */}
            <Controller
              name="facebook"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputWithLabel
                  id="biz-facebook"
                  label="Facebook Page"
                  type="url"
                  placeholder="https://facebook.com/..."
                  {...field}
                  error={error?.message}
                />
              )}
            />

            {/* Instagram */}
            <Controller
              name="instagram"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputWithLabel
                  id="biz-instagram"
                  label="Instagram"
                  type="url"
                  placeholder="https://instagram.com/..."
                  {...field}
                  error={error?.message}
                />
              )}
            />

            {/* Twitter/X */}
            <Controller
              name="twitter"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputWithLabel
                  id="biz-twitter"
                  label="Twitter/X"
                  type="url"
                  placeholder="https://twitter.com/..."
                  {...field}
                  error={error?.message}
                />
              )}
            />

            {/* LinkedIn */}
            <Controller
              name="linkedin"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputWithLabel
                  id="biz-linkedin"
                  label="LinkedIn"
                  type="url"
                  placeholder="https://linkedin.com/company/..."
                  {...field}
                  error={error?.message}
                />
              )}
            />

            {/* YouTube Channel */}
            <Controller
              name="youtube"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputWithLabel
                  id="biz-youtube"
                  label="YouTube Channel"
                  type="url"
                  placeholder="https://youtube.com/..."
                  {...field}
                  error={error?.message}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
