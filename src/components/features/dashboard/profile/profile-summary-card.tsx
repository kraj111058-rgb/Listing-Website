"use client";

import { UserAvatar } from "@/components/common/user-avatar";
import { Badge } from "@/components/ui/badge";
import type { UserProfile } from "@/data";
import {
  ACCEPTED_PROFILE_IMAGE_TYPES
} from "@/schemas";
import {
  Building2,
  Calendar,
  Camera,
  Mail,
  MessageSquare,
  Pencil,
  Phone,
  User,
} from "lucide-react";
import { useRef } from "react";

interface ProfileSummaryCardProps {
  profile: UserProfile;
  onAvatarChange: (newAvatarUrl: string) => void;
}

export function ProfileSummaryCard({
  profile,
  onAvatarChange,
}: ProfileSummaryCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onAvatarChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
      {/* Clean Card Header Matching Form Card */}
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/40">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-600" />
          <span>Profile Summary</span>
        </h3>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* User Identity & Avatar */}
        <div className="flex flex-col items-center text-center">
          <div className="relative group inline-block">
            {/* Clickable Avatar with Smooth Hover State */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative cursor-pointer rounded-2xl overflow-hidden"
              title="Click to Change Photo"
            >
              <UserAvatar
                name={profile.name}
                src={profile.avatar}
                className="size-20 rounded-2xl border-2 border-indigo-100 shadow-sm bg-indigo-50 transition-transform group-hover:scale-[1.02]"
                fallbackClassName="text-2xl font-bold bg-indigo-600 text-white rounded-xl"
              />
              {/* Smooth hover state on avatar */}
              <div className="absolute inset-0 bg-slate-900/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                <Camera className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-0.5">Upload</span>
              </div>
            </div>

            {/* Top-Right Edit Badge on Avatar - Bold Indigo with Crisp White Ring */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -top-1.5 -right-1.5 size-5.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 ring-2 ring-white flex items-center justify-center transition-all cursor-pointer z-10 group-hover:scale-110 active:scale-95"
              title="Change Profile Photo"
            >
              <Pencil className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_PROFILE_IMAGE_TYPES.join(",")}
            className="hidden"
            onChange={handleFileChange}
          />

          <h3 className="text-base sm:text-lg font-bold text-foreground mt-3.5 tracking-tight">
            {profile.name}
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <Badge variant="indigo" className="text-xs font-semibold py-0.5 px-2">
              {profile.role}
            </Badge>
          </div>
        </div>

        {/* Quick Contact & Details List */}
        <div className="pt-4 border-t border-slate-100 space-y-3 text-sm text-foreground">
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{profile.email}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
            <span>+91 {profile.phone}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Member since {profile.memberSince}</span>
          </div>
        </div>

        {/* Business Stats Grid */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-center gap-1.5 text-indigo-600 font-bold text-base">
              <Building2 className="w-4.5 h-4.5 text-indigo-500" />
              <span>{profile.activeListingsCount}</span>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Listings
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-center gap-1.5 text-sky-600 font-bold text-base">
              <MessageSquare className="w-4.5 h-4.5 text-sky-500" />
              <span>{profile.totalInquiriesCount}</span>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Inquiries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
