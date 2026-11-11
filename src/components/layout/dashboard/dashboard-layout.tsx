"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardTopbar } from "./dashboard-topbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Hide sidebar and topbar completely for distraction-free listing creation & editing
  const isWizardRoute =
    pathname.startsWith("/dashboard/create-listing") ||
    pathname.startsWith("/dashboard/edit-listing");

  if (isWizardRoute) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex flex-col antialiased">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex flex-col antialiased">
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0 sticky top-0 h-screen z-40">
          <DashboardSidebar />
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 lg:hidden animate-in fade-in"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="w-64 h-full bg-white animate-in slide-in-from-left duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <DashboardSidebar onCloseMobile={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardTopbar onOpenMobile={() => setMobileOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

