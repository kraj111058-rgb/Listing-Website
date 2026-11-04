"use client";

import { InputWithLabel } from "@/components/common";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "@/data";
import {
  profileFormSchema,
  type ProfileFormValues,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, LockKeyholeIcon, RotateCcw, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

interface ProfileInfoFormProps {
  profile: UserProfile;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
}

export function ProfileInfoForm({ profile, onSave }: ProfileInfoFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    onSave(data);
  };

  const handleResetForm = () => {
    reset({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
      {/* Form Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/40">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-600" />
          <span>Personal Information</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Update your personal identity and verified contact details.
        </p>
      </div>

      {/* Form Fields: Only Used Fields (Name, Phone, Email) */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Full Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="profile-name"
                label="Full Name"
                placeholder="e.g. Rahul Sharma"
                error={errors.name?.message}
                disabled={isSubmitting}
                {...field}
              />
            )}
          />

          {/* Phone Number */}
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="profile-phone"
                type="tel"
                label="Phone Number"
                placeholder="98765 43210"
                error={errors.phone?.message}
                disabled={isSubmitting}
                {...field}
                onChange={(e) => {
                  const clean = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                  field.onChange(clean);
                }}
              />
            )}
          />

          {/* Email Address (Read-only Login Identity) */}
          <div className="sm:col-span-2">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  id="profile-email"
                  type="email"
                  label="Email Address"
                  placeholder="name@business.in"
                  error={errors.email?.message}
                  rightElement={
                    <span className="text-slate-400 p-2">
                      <LockKeyholeIcon className="size-4" />
                    </span>
                  }
                  {...field}
                />
              )}
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
          {isDirty && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetForm}
              disabled={isSubmitting}
              className="h-10 px-4 border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 gap-1.5 cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </Button>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 cursor-pointer flex items-center gap-2 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
