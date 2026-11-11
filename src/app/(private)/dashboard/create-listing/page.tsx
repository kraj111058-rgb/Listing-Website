import type { Metadata } from "next";
import { ListingFormWizard } from "@/components/features/dashboard/listing-wizard";

export const metadata: Metadata = {
  title: "Add New Business Listing",
  description: "Add your business in 5 easy steps on IndianListingBucket.",
};

export default function CreateListingPage() {
  return <ListingFormWizard mode="create" />;
}