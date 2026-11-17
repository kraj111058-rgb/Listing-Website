import type { Metadata } from "next";
import { BlogContent } from "@/components/features/blog";

export const metadata: Metadata = {
  title: "Business Growth & Local SEO Blog — Free Guides & Tips | OneListy",
  description:
    "Read actionable local SEO guides, business directory listing tips, citation strategies, and digital marketing insights to grow your business across India.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Business Growth & Local SEO Blog — Free Guides & Tips | OneListy",
    description:
      "Read actionable local SEO guides, business directory listing tips, citation strategies, and digital marketing insights to grow your business across India.",
    type: "website",
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Growth & Local SEO Blog — Free Guides & Tips | OneListy",
    description:
      "Read actionable local SEO guides, business directory listing tips, citation strategies, and digital marketing insights to grow your business across India.",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
