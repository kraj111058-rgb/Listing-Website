export interface ListingPackageItem {
  id: "free" | "featured" | "featured-pro" | "banner-ads";
  icon: string;
  tag: string;
  name: string;
  price: string;
  period: string;
  highlight: boolean;
  description: string;
  included: string[];
  excluded: string[];
}

export const packages: ListingPackageItem[] = [
  {
    id: "free",
    icon: "🏢",
    tag: "PACKAGE 1",
    name: "Free Listing",
    price: "₹0",
    period: "/ 5 months",
    highlight: false,
    description:
      "Add your business to our directory at absolutely no cost. Perfect for businesses just starting their online journey.",
    included: [
      "Unlimited listing duration with a no-follow website link.",
    ],
    excluded: [
      "No featured listing on the homepage.",
      "No business highlighting on the category pages.",
      "No featured listing on the featured page.",
      "No business highlighting in search results.",
      "No Services & Products catalog.",
    ],
  },
  {
    id: "featured",
    icon: "⭐",
    tag: "PACKAGE 2",
    name: "Featured Listing",
    price: "₹199",
    period: "/ 3 months",
    highlight: true,
    description:
      "Featured Listing includes listing for unlimited days, Featured listing on homepage, Featured listing on featured page, and priority placement in category and search results.",
    included: [
      "Add up to 5 Services & Products.",
      "Unlimited listing duration with a do-follow website link.",
      "Featured listing on the homepage.",
      "Business highlighting on the category pages.",
      "Featured listing on the featured page.",
      "Business highlighting in search results.",
    ],
    excluded: [],
  },
  {
    id: "featured-pro",
    icon: "🚀",
    tag: "PACKAGE 3",
    name: "Featured Pro",
    price: "₹499",
    period: "/ 3 months",
    highlight: false,
    description:
      "Featured Pro includes listing for unlimited days, Featured listing on homepage, Featured listing on featured page, and priority placement in category and search results.",
    included: [
      "Add up to 10 Services & Products.",
      "Unlimited listing duration with a do-follow website link.",
      "Featured listing on the homepage.",
      "Business highlighting on the category pages.",
      "Featured listing on the featured page.",
      "Business highlighting in search results.",
    ],
    excluded: [],
  },
  {
    id: "banner-ads",
    icon: "🖼️",
    tag: "PACKAGE 4",
    name: "Banner Ads",
    price: "Custom",
    period: "Pricing",
    highlight: false,
    description:
      "Banner ads target local customers and help to build brand recognition immediately. Your banner appears across relevant pages reaching thousands of daily visitors.",
    included: [
      "High-visibility banner placements",
      "Targeted to your city or category",
      "Homepage & category page banners",
      "Custom creative design support",
      "Flexible duration (7 / 30 / 90 days)",
      "Click-through tracking & reporting",
      "Mobile-responsive ad formats",
    ],
    excluded: [],
  },
];

export const listingWizardPlans = packages.filter(
  (pkg) => pkg.id !== "banner-ads"
);
