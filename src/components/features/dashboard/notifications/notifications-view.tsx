"use client";

import { useState, useMemo } from "react";
import {
  BellOff,
  RotateCcw,
  Search,
} from "lucide-react";
import {
  type NotificationItem,
  initialNotifications,
} from "@/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NotificationsTable } from "./notifications-table";
import { cn } from "@/lib/utils";

export function NotificationsView() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Tabs: ONLY "All" and "Unread"
  const tabs = [
    { id: "all", label: "All", count: notifications.length },
    { id: "unread", label: "Unread", count: unreadCount },
  ];

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      // Tab filter
      if (activeTab === "unread" && item.read) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesMessage = item.message.toLowerCase().includes(q);
        const matchesType = item.type.toLowerCase().includes(q);
        if (!matchesTitle && !matchesMessage && !matchesType) {
          return false;
        }
      }

      return true;
    });
  }, [notifications, activeTab, searchQuery]);

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleResetFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Notifications
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage and track all your updates and alerts.
        </p>
      </div>

      {/* Tabs Filter Bar & Search: Tabs are ONLY "All" and "Unread" */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
          {/* Status Tabs: All & Unread */}
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as string)}
            className="w-full lg:w-auto"
          >
            <TabsList className="h-10 p-1 bg-slate-50/90 rounded-xl flex items-center gap-1 overflow-x-auto w-full sm:w-auto border border-slate-200/70">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={cn(
                      "text-xs font-semibold px-4 py-1.5 rounded-[9px] transition-all flex items-center gap-2 cursor-pointer border whitespace-nowrap",
                      isActive
                        ? "bg-white text-indigo-600 shadow-xs border-slate-200/70 font-bold"
                        : "text-slate-500 hover:text-slate-800 hover:bg-white/60 border-transparent"
                    )}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={cn(
                        "px-1.5 py-0.2 rounded-full text-[10px] font-bold transition-colors",
                        isActive
                          ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                          : "bg-slate-200/60 text-slate-500"
                      )}
                    >
                      {tab.count}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications..."
              className="w-full h-9 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all font-medium"
            />
          </div>
        </div>
      </div>

      {/* Notifications Table or Empty State */}
      {filteredNotifications.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200/80 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto shadow-xs border border-indigo-100">
            <BellOff className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="text-base font-bold text-slate-900">
              {searchQuery || activeTab !== "all"
                ? "No matching alerts found"
                : "You're all caught up!"}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {searchQuery || activeTab !== "all"
                ? "Try adjusting your search query or switch to the All tab."
                : "There are no notifications at the moment. We will notify you when new inquiries or updates arrive."}
            </p>
          </div>
          {(searchQuery || activeTab !== "all") && (
            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResetFilters}
                className="h-9 px-4 rounded-xl text-xs font-semibold cursor-pointer border-slate-200 hover:bg-slate-50"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                <span>Reset Filters</span>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <NotificationsTable
          data={filteredNotifications}
          onToggleRead={handleToggleRead}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default NotificationsView;
