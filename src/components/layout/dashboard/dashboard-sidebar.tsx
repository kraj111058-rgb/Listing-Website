"use client";

import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Building,
  Building2,
  Globe,
  Inbox,
  LayoutDashboard,
  MessageSquareText,
  PlusCircle,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    title: "My Listings",
    href: "/dashboard/my-listings",
    icon: Building2,
  },
  {
    title: "Add Listing",
    href: "/dashboard/create-listing",
    icon: PlusCircle,
  },
  {
    title: "Customer Inquiries",
    href: "/dashboard/inquiries",
    icon: Inbox,
  },
  {
    title: "Customer Reviews",
    href: "/dashboard/customer-reviews",
    icon: Star,
  },
  {
    title: "My Reviews",
    href: "/dashboard/my-reviews",
    icon: MessageSquareText,
  },
];

interface DashboardSidebarProps {
  onCloseMobile?: () => void;
}

export function DashboardSidebar({ onCloseMobile }: DashboardSidebarProps) {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col h-full select-none">
      {/* Brand Header */}
      <div className="h-20 px-5 border-b border-slate-200/80 flex items-center justify-between shrink-0">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 group"
          onClick={onCloseMobile}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-fuchsia-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5 leading-none">
              <span className="text-lg font-black tracking-tight text-slate-900">
                IndianListing
              </span>
              <span className="text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
                Bucket
              </span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">
              Business Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Scrollable Navigation Links Area */}
      <div className="flex-1 px-3.5 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Main Menu
        </div>
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={cn(
                "group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-indigo-50/90 text-indigo-600 font-semibold shadow-2xs shadow-indigo-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon
                className={cn(
                  "w-4.5 h-4.5 transition-colors",
                  active
                    ? "text-indigo-600"
                    : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              <span>{item.title}</span>
            </Link>
          );
        })}

        {/* Quick Link to Public Portal */}
        <div className="pt-4 mt-4 border-t border-slate-100">
          <div className="px-3 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Shortcut
          </div>
          <Link
            href="/"
            onClick={onCloseMobile}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <Globe className="w-4.5 h-4.5 text-slate-400" />
            <span>View Public Website</span>
          </Link>
        </div>
      </div>

      {/* Pinned Bottom Upgrade / Growth Card */}
      <div className="p-3.5 border-t border-slate-100 bg-slate-50/50 shrink-0">
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/5 to-white border border-indigo-100/90 shadow-2xs relative overflow-hidden group">
          {/* Subtle Radial Glow */}
          <div className="absolute -right-4 -bottom-4 size-20 bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/20 rounded-full blur-lg pointer-events-none" />

          {/* Icon & Title */}
          <div className="flex items-center gap-2.5 mb-2 relative">
            <div className="size-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-fuchsia-600 flex items-center justify-center text-white shadow-xs shadow-indigo-500/20 shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="size-4 text-white" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 tracking-tight leading-tight truncate">
                Boost Your Listings
              </h4>
              <p className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600 uppercase tracking-wider">
                Featured Growth
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-snug relative">
            Get up to 5x more customer leads by featuring your verified business!
          </p>

          {/* Clean Semantic Link Styled as Button */}
          <Link
            href="/advertise"
            onClick={onCloseMobile}
            className="w-full h-8.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs shadow-indigo-500/20 flex items-center justify-center gap-1.5 transition-all mt-3 relative cursor-pointer"
          >
            <span>Explore Plans</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
