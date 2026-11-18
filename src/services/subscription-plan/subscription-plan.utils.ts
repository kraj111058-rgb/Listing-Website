import type { SubscriptionPlanData } from "./subscription-plan.types";

export type PlanTier = "free" | "featured" | "featured-pro" | "banner-ads";

export interface PlanThemeConfig {
  tier: PlanTier;
  icon: string;
  tag: string;
  tagColor: string;
  iconStyle: string;
  checkBg: string;
  headline: {
    text: string;
    color: string;
  };
  button: {
    text: string;
    href: string;
    style: string;
  };
}

/**
 * Resolves plan tier based on the plan name.
 * Checks for keywords: "banner", "pro", "featured", defaulting to "free".
 */
export function resolvePlanTier(name?: string): PlanTier {
  if (!name) return "free";
  const clean = name.toLowerCase().trim();

  if (clean.includes("banner")) {
    return "banner-ads";
  }
  if (clean.includes("pro")) {
    return "featured-pro";
  }
  if (clean.includes("featured")) {
    return "featured";
  }
  return "free";
}

/**
 * Returns default icon for a plan tier or name
 */
export function getPlanIcon(name?: string, customIcon?: string | null): string {
  if (customIcon) return customIcon;
  const tier = resolvePlanTier(name);
  switch (tier) {
    case "free":
      return "🏢";
    case "featured":
      return "⭐";
    case "featured-pro":
      return "🚀";
    case "banner-ads":
      return "🖼️";
    default:
      return "🏢";
  }
}

/**
 * Returns default tag for a plan tier or name
 */
export function getPlanTag(name?: string, customTag?: string | null): string {
  if (customTag) return customTag;
  const tier = resolvePlanTier(name);
  switch (tier) {
    case "free":
      return "PACKAGE 1";
    case "featured":
      return "PACKAGE 2";
    case "featured-pro":
      return "PACKAGE 3";
    case "banner-ads":
      return "PACKAGE 4";
    default:
      return "PACKAGE";
  }
}

/**
 * Returns icon container style class names matching the original design
 */
export function getPlanIconStyle(nameOrTier?: string): string {
  const tier = resolvePlanTier(nameOrTier);
  switch (tier) {
    case "free":
      return "bg-slate-100 border-slate-200/80";
    case "featured":
      return "bg-amber-100 border-amber-200/90";
    case "featured-pro":
      return "bg-purple-100 border-purple-200/90";
    case "banner-ads":
      return "bg-indigo-50 border-indigo-100";
    default:
      return "bg-slate-100 border-slate-200";
  }
}

/**
 * Returns tag text color class name matching the original design
 */
export function getPlanTagColor(nameOrTier?: string): string {
  const tier = resolvePlanTier(nameOrTier);
  switch (tier) {
    case "free":
      return "text-slate-500";
    case "featured":
      return "text-amber-600";
    case "featured-pro":
      return "text-purple-600";
    case "banner-ads":
      return "text-indigo-600";
    default:
      return "text-slate-500";
  }
}

/**
 * Returns headline text and color matching the original design
 */
export function getPlanHeadline(
  nameOrTier?: string,
  customHeadline?: string | null
): { text: string; color: string } {
  const tier = resolvePlanTier(nameOrTier);
  switch (tier) {
    case "free":
      return {
        text: customHeadline || "Get Started for Free",
        color: "text-slate-900",
      };
    case "featured":
      return {
        text: customHeadline || "Maximum Visibility for Your Business",
        color: "text-amber-600",
      };
    case "featured-pro":
      return {
        text: customHeadline || "Maximum Power for Growing Brands",
        color: "text-purple-600",
      };
    case "banner-ads":
      return {
        text: customHeadline || "Instant Brand Recognition",
        color: "text-indigo-600",
      };
    default:
      return {
        text: customHeadline || "",
        color: "text-slate-900",
      };
  }
}

/**
 * Returns feature checkmark badge color style matching the original design
 */
export function getPlanCheckBg(nameOrTier?: string): string {
  const tier = resolvePlanTier(nameOrTier);
  switch (tier) {
    case "free":
      return "bg-slate-100 text-slate-700";
    case "featured":
      return "bg-amber-100 text-amber-700";
    case "featured-pro":
      return "bg-purple-100 text-purple-700";
    case "banner-ads":
      return "bg-indigo-50 text-indigo-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

/**
 * Returns call to action button attributes matching the original design
 */
export function getPlanButton(nameOrTier?: string): {
  text: string;
  href: string;
  style: string;
} {
  const tier = resolvePlanTier(nameOrTier);
  switch (tier) {
    case "free":
      return {
        text: "Add Free Listing",
        href: "/listings/create",
        style:
          "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 font-bold",
      };
    case "featured":
      return {
        text: "Get Featured Now",
        href: "/listings/create",
        style:
          "bg-amber-100 hover:bg-amber-200/90 text-amber-800 border border-amber-200 font-bold",
      };
    case "featured-pro":
      return {
        text: "Get Featured Pro",
        href: "/listings/create",
        style:
          "bg-purple-100 hover:bg-purple-200/90 text-purple-800 border border-purple-200 font-bold",
      };
    case "banner-ads":
      return {
        text: "Enquire About Banners",
        href: "/advertise/banner-ads",
        style:
          "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 font-bold",
      };
    default:
      return {
        text: "Select Plan",
        href: "/listings/create",
        style: "bg-primary text-primary-foreground font-bold",
      };
  }
}

/**
 * Master helper returning complete theme and styling configuration for any plan
 */
export function getPlanTheme(
  planOrName: string | Partial<SubscriptionPlanData>
): PlanThemeConfig {
  const name = typeof planOrName === "string" ? planOrName : planOrName.name || "";
  const customIcon = typeof planOrName === "object" ? planOrName.icon : undefined;
  const customTag = typeof planOrName === "object" ? planOrName.tag : undefined;
  const customHeadline = typeof planOrName === "object" ? planOrName.headline : undefined;

  const tier = resolvePlanTier(name);

  return {
    tier,
    icon: getPlanIcon(name, customIcon),
    tag: getPlanTag(name, customTag),
    tagColor: getPlanTagColor(tier),
    iconStyle: getPlanIconStyle(tier),
    checkBg: getPlanCheckBg(tier),
    headline: getPlanHeadline(tier, customHeadline),
    button: getPlanButton(tier),
  };
}
