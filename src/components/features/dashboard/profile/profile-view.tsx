"use client";

import { useState } from "react";
import { initialUserProfile, type UserProfile } from "@/data";
import { ProfileSummaryCard } from "./profile-summary-card";
import { ProfileInfoForm } from "./profile-info-form";

export function ProfileView() {
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);

  const handleSaveInfo = (updatedFields: Partial<UserProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedFields,
    }));
  };

  const handleAvatarChange = (newAvatarUrl: string) => {
    setProfile((prev) => ({
      ...prev,
      avatar: newAvatarUrl,
    }));
  };

  return (
    <div className="space-y-6">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: User Summary Card (Avatar, Quick details, Stats) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <ProfileSummaryCard
            profile={profile}
            onAvatarChange={handleAvatarChange}
          />
        </div>

        {/* Right Column: Personal Information Form */}
        <div className="lg:col-span-8">
          <ProfileInfoForm
            profile={profile}
            onSave={handleSaveInfo}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
