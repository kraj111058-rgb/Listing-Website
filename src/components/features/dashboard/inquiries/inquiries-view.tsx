"use client";

import { useState, useEffect, useMemo } from "react";
import { AlertModal } from "@/components/common";
import {
  getStoredInquiries,
  updateCustomerInquiryStatus,
  deleteCustomerInquiry,
  type CustomerInquiryItem,
} from "@/data";
import { InquiriesFilters, type InquiryStatusTabItem } from "./inquiries-filters";
import { InquiriesTable } from "./inquiries-table";
import { InquiriesEmpty } from "./inquiries-empty";
import { InquiryDetailsModal } from "./inquiry-details-modal";

export function InquiriesView() {
  const [inquiries, setInquiries] = useState<CustomerInquiryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeInquiry, setActiveInquiry] = useState<CustomerInquiryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteInquiryId, setDeleteInquiryId] = useState<string | null>(null);

  // Sync inquiries state
  useEffect(() => {
    const refreshData = () => {
      setInquiries(getStoredInquiries());
    };

    refreshData();

    window.addEventListener("inquiries-updated", refreshData);
    return () => {
      window.removeEventListener("inquiries-updated", refreshData);
    };
  }, []);

  // Handle status update
  const handleStatusChange = (id: string, newStatus: CustomerInquiryItem["status"]) => {
    updateCustomerInquiryStatus(id, newStatus);
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (activeInquiry && activeInquiry.id === id) {
      setActiveInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Handle delete
  const confirmDeleteInquiry = () => {
    if (deleteInquiryId) {
      deleteCustomerInquiry(deleteInquiryId);
      setInquiries((prev) => prev.filter((item) => item.id !== deleteInquiryId));
      if (activeInquiry && activeInquiry.id === deleteInquiryId) {
        setIsModalOpen(false);
        setActiveInquiry(null);
      }
      setDeleteInquiryId(null);
    }
  };

  const inquiryToDelete = inquiries.find((item) => item.id === deleteInquiryId);

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      // Status filter
      if (statusFilter !== "All" && item.status !== statusFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.fullName.toLowerCase().includes(q);
        const matchesPhone = item.phone.toLowerCase().includes(q);
        const matchesEmail = item.email.toLowerCase().includes(q);
        const matchesService = item.service.toLowerCase().includes(q);
        const matchesListing = item.listingName.toLowerCase().includes(q);
        const matchesMessage = (item.message || "").toLowerCase().includes(q);

        if (
          !matchesName &&
          !matchesPhone &&
          !matchesEmail &&
          !matchesService &&
          !matchesListing &&
          !matchesMessage
        ) {
          return false;
        }
      }

      return true;
    });
  }, [inquiries, statusFilter, searchQuery]);

  // Tab counts
  const allCount = inquiries.length;
  const pendingCount = inquiries.filter((i) => i.status === "Pending").length;
  const resolvedCount = inquiries.filter((i) => i.status === "Resolved").length;
  const rejectedCount = inquiries.filter((i) => i.status === "Rejected").length;

  const tabs: InquiryStatusTabItem[] = [
    { id: "All", label: "All", count: allCount },
    { id: "Pending", label: "Pending", count: pendingCount },
    { id: "Resolved", label: "Resolved", count: resolvedCount },
    { id: "Rejected", label: "Rejected", count: rejectedCount },
  ];

  const handleOpenDetails = (inquiry: CustomerInquiryItem) => {
    setActiveInquiry(inquiry);
    setIsModalOpen(true);
  };

  const hasActiveFilters = statusFilter !== "All" || searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setStatusFilter("All");
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Customer Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your customer service inquiries, view request details, and update status.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <InquiriesFilters
        tabs={tabs}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Inquiries Table or Empty State */}
      {filteredInquiries.length === 0 ? (
        <InquiriesEmpty
          hasFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
        />
      ) : (
        <InquiriesTable
          data={filteredInquiries}
          onViewDetails={handleOpenDetails}
          onStatusChange={handleStatusChange}
          onDelete={(id) => setDeleteInquiryId(id)}
        />
      )}

      {/* Inquiry Full Details Inspection Modal */}
      <InquiryDetailsModal
        inquiry={activeInquiry}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      {/* Delete Confirmation Alert Modal */}
      <AlertModal
        open={!!deleteInquiryId}
        onOpenChange={(open) => !open && setDeleteInquiryId(null)}
        title="Delete Customer Inquiry"
        description={
          inquiryToDelete
            ? `Are you sure you want to delete the inquiry from ${inquiryToDelete.fullName}? This action cannot be undone.`
            : "Are you sure you want to delete this customer inquiry? This action cannot be undone."
        }
        confirmLabel="Delete Inquiry"
        cancelLabel="Cancel"
        confirmVariant="destructive"
        onConfirm={confirmDeleteInquiry}
      />
    </div>
  );
}
