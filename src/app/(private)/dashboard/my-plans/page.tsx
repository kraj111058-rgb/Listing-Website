import type { Metadata } from "next";
import { MyPlansView } from "@/components/features/dashboard/my-plans";

export const metadata: Metadata = {
  title: "My Subscription Plans | Dashboard",
  description:
    "View your active directory subscription package, check remaining validity days & listing limits, and explore upgrade plans on IndianListingBucket.",
};

export default function MyPlansPage() {
  return <MyPlansView />;
}

