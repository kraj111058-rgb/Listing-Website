"use client";

import { useState } from "react";
import { Loader } from "@/components/common";
import { useCurrentUser } from "@/services/auth";
import { ProfileSummaryCard } from "./profile-summary-card";
import { ProfileInfoForm } from "./profile-info-form";

export function ProfileView() {
  const { data: currentUser, isLoading } = useCurrentUser();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  if (isLoading) {
    return <Loader size="md" className="min-h-[350px]" />;
  }

  const profile = currentUser?.profile;

  const handleAvatarSelect = (file: File) => {
    setAvatarFile(file);
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const handleResetAvatar = () => {
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  return (
    <div className="space-y-6">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: User Summary Card (Avatar, Quick details, Stats) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <ProfileSummaryCard
            profile={profile}
            avatarPreview={avatarPreview}
            onAvatarSelect={handleAvatarSelect}
          />
        </div>

        {/* Right Column: Personal Information Form */}
        <div className="lg:col-span-8">
          <ProfileInfoForm
            profile={profile}
            avatarFile={avatarFile}
            onResetAvatar={handleResetAvatar}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
