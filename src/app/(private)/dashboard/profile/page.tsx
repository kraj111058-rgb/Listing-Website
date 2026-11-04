import type { Metadata } from "next";
import { ProfileView } from "@/components/features/dashboard/profile";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage and update your personal details and business contact information.",
};

export default function ProfilePage() {
  return <ProfileView />;
}

