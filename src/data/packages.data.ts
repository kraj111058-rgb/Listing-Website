export interface ListingPackageItem {
  id: "free" | "featured" | "featured-pro" | "banner-ads";
  icon: string;
  iconBg: string;
  tag: string;
  tagColor: string;
  name: string;
  price: string;
  period: string;
  highlight: boolean;
  headline: string;
  headlineColor: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  buttonStyle: string;
  checkBg: string;
  included: string[];
  excluded: string[];
}

export const packages: ListingPackageItem[] = [
  {
    id: "free",
    icon: "🏢",
    iconBg: "bg-slate-100 border border-slate-200/80",
    tag: "PACKAGE 1",
    tagColor: "text-slate-500",
    name: "Free Listing",
    price: "₹0",
    period: "/ forever",
    highlight: false,
    headline: "Get Started for Free",
    headlineColor: "text-slate-900",
    description:
      "Add your business to our directory at absolutely no cost. Perfect for businesses just starting their online journey.",
    buttonText: "Add Free Listing",
    buttonHref: "/listings/create",
    buttonStyle: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 font-bold",
    checkBg: "bg-slate-100 text-slate-700",
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
    iconBg: "bg-amber-100 border border-amber-200/90",
    tag: "PACKAGE 2",
    tagColor: "text-amber-600",
    name: "Featured Listing",
    price: "₹199",
    period: "/ 3 months",
    highlight: true,
    headline: "Maximum Visibility for Your Business",
    headlineColor: "text-amber-600",
    description:
      "Featured Listing includes listing for unlimited days, Featured listing on homepage, Featured listing on featured page, and priority placement in category and search results.",
    buttonText: "Get Featured Now",
    buttonHref: "/listings/create",
    buttonStyle: "bg-amber-100 hover:bg-amber-200/90 text-amber-800 border border-amber-200 font-bold",
    checkBg: "bg-amber-100 text-amber-700",
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
    iconBg: "bg-purple-100 border border-purple-200/90",
    tag: "PACKAGE 3",
    tagColor: "text-purple-600",
    name: "Featured Pro",
    price: "₹499",
    period: "/ 3 months",
    highlight: false,
    headline: "Maximum Power for Growing Brands",
    headlineColor: "text-purple-600",
    description:
      "Featured Pro includes listing for unlimited days, Featured listing on homepage, Featured listing on featured page, and priority placement in category and search results.",
    buttonText: "Get Featured Pro",
    buttonHref: "/listings/create",
    buttonStyle: "bg-purple-100 hover:bg-purple-200/90 text-purple-800 border border-purple-200 font-bold",
    checkBg: "bg-purple-100 text-purple-700",
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
    iconBg: "bg-indigo-50 border border-indigo-100",
    tag: "PACKAGE 4",
    tagColor: "text-indigo-600",
    name: "Banner Ads",
    price: "Custom",
    period: "Pricing",
    highlight: false,
    headline: "Instant Brand Recognition",
    headlineColor: "text-indigo-600",
    description:
      "Banner ads target local customers and help to build brand recognition immediately. Your banner appears across relevant pages reaching thousands of daily visitors.",
    buttonText: "Enquire About Banners",
    buttonHref: "/advertise/banner-ads",
    buttonStyle: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 font-bold",
    checkBg: "bg-indigo-50 text-indigo-700",
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

