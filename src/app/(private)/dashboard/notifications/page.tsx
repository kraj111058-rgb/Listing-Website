import type { Metadata } from "next";
import { NotificationsView } from "@/components/features/dashboard/notifications";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Manage and track all your updates and alerts.",
};

export default function NotificationsPage() {
  return <NotificationsView />;
}
