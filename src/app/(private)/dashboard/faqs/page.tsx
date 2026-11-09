import { Suspense } from "react";
import { FaqsManagerView } from "@/components/features/dashboard/faqs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Custom FAQs | Dashboard",
  description:
    "Add, edit, and organize custom frequently asked questions for your verified business listings on IndianListingBucket.",
};

export default function CustomFaqsPage() {
  return (
    <Suspense fallback={null}>
      <FaqsManagerView />
    </Suspense>
  );
}

