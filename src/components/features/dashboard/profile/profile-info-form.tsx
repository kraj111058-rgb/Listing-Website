"use client";

import { useEffect } from "react";
import { InputWithLabel, Loader } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  profileFormSchema,
  type ProfileFormValues,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LockKeyholeIcon, RotateCcw, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateProfile } from "@/services/auth";
import { useUploadFile, useRemoveFile } from "@/services/storage";
import { SUPABASE_CONSTANTS } from "@/lib/supabase";
import type { UserProfileData } from "@/services/auth/auth.types";

interface ProfileInfoFormProps {
  profile?: UserProfileData | null;
  avatarFile?: File | null;
  onResetAvatar?: () => void;
}

export function ProfileInfoForm({
  profile,
  avatarFile,
  onResetAvatar,
}: ProfileInfoFormProps) {
  // TanStack Query Mutations & Pending States
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const { mutateAsync: removeFile, isPending: isRemoving } = useRemoveFile();
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const isPending = isUploading || isRemoving || isUpdating;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      city: profile?.city || "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        city: profile.city || "",
      });
    }
  }, [profile, reset]);

  // Form has modifications if text inputs are dirty OR a new avatar was picked
  const hasChanges = isDirty || Boolean(avatarFile);

  const onSubmit = async (data: ProfileFormValues) => {
    let finalAvatarUrl: string | undefined = undefined;

    // 1. Upload new avatar ONLY on submit if a new file was chosen
    if (avatarFile) {
      const uploadResult = await uploadFile({
        file: avatarFile,
        folder: SUPABASE_CONSTANTS.STORAGE.FOLDERS.USER_PROFILE
      });
      finalAvatarUrl = uploadResult.publicUrl;

      // 2. Cleanup old avatar if it existed
      const oldAvatarUrl = profile?.avatar_url;
      if (oldAvatarUrl) {
        await removeFile({
          fileUrl: oldAvatarUrl,
          bucket: SUPABASE_CONSTANTS.STORAGE.BUCKETS.ONELISTY,
        });
      }
    }

    // 3. Update profile in database with spread payload & reset baseline on success
    await updateProfile(
      {
        name: data.name.trim(),
        phone: data.phone?.trim() || null,
        city: data.city?.trim() || null,
        ...(finalAvatarUrl !== undefined ? { avatar_url: finalAvatarUrl } : {}),
      },
      {
        onSuccess: () => {
          onResetAvatar?.();
          reset(data);
        },
      }
    );
  };

  const handleResetForm = () => {
    reset({
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      city: profile?.city || "",
    });
    onResetAvatar?.();
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

      {/* Form Fields */}
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
                disabled={isPending}
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
                placeholder="9876543210"
                error={errors.phone?.message}
                disabled={isPending}
                {...field}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  field.onChange(value);
                }}
              />
            )}
          />

          {/* City */}
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="profile-city"
                label="City"
                placeholder="e.g. Surat, Ahmedabad"
                error={errors.city?.message}
                disabled={isPending}
                {...field}
                value={field.value || ""}
              />
            )}
          />

          {/* Email Address (Read-only Login Identity) */}
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
                disabled={true}
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

        {/* Submit Actions */}
        <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
          {hasChanges && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleResetForm}
              disabled={isPending}
              className="h-10 px-4 border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 gap-1.5 cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </Button>
          )}

          <Button
            type="submit"
            disabled={!hasChanges || isPending}
            className="h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 cursor-pointer flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader inline size="sm" />
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
