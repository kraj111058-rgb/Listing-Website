"use client";

import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/common";
import {
  initialListingFaqs,
  initialUserListings,
  type ListingFaqItem,
  type UserListingItem,
} from "@/data";
import type { FaqFormValues } from "@/schemas";
import { PlusCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { FaqsEmpty } from "./faqs-empty";
import { FaqsFilters, type FaqStatusTabItem } from "./faqs-filters";
import { FaqsTable } from "./faqs-table";
import { ManageFaqModal } from "./manage-faq-modal";

interface FaqsManagerViewProps {
  initialListingId?: string;
}

export function FaqsManagerView({ initialListingId }: FaqsManagerViewProps) {
  const searchParams = useSearchParams();
  const queryListingId = searchParams.get("listingId") || initialListingId;

  // Active listings
  const listings: UserListingItem[] = initialUserListings;

  // Default listing filter: if passed via URL and exists in listings, select it; otherwise "All"
  const defaultListingFilter =
    queryListingId && listings.some((l) => l.id === queryListingId)
      ? queryListingId
      : "All";

  const [selectedListingId, setSelectedListingId] = useState<string>(defaultListingFilter);
  const [faqs, setFaqs] = useState<ListingFaqItem[]>(initialListingFaqs);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<ListingFaqItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<ListingFaqItem | null>(null);

  // Toggle active/inactive state
  const toggleActive = (id: string) => {
    setFaqs((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const currentActive = item.isActive !== false;
          return { ...item, isActive: !currentActive };
        }
        return item;
      })
    );
  };

  // CRUD handlers
  const handleOpenAdd = () => {
    setEditingFaq(null);
    setIsManageModalOpen(true);
  };

  const handleOpenEdit = (faq: ListingFaqItem) => {
    setEditingFaq(faq);
    setIsManageModalOpen(true);
  };

  const handleOpenDelete = (faq: ListingFaqItem) => {
    setFaqToDelete(faq);
    setIsDeleteModalOpen(true);
  };

  const handleSaveFaq = (data: FaqFormValues) => {
    if (editingFaq) {
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === editingFaq.id
            ? {
                ...f,
                listingId: data.listingId,
                question: data.question,
                answer: data.answer,
                isActive: data.isActive,
              }
            : f
        )
      );
      setEditingFaq(null);
    } else {
      const newFaq: ListingFaqItem = {
        id: `faq-${Date.now()}`,
        listingId: data.listingId,
        question: data.question,
        answer: data.answer,
        createdAt: "Today",
        isActive: data.isActive,
      };
      setFaqs((prev) => [newFaq, ...prev]);
    }
  };

  const confirmDeleteFaq = () => {
    if (faqToDelete) {
      setFaqs((prev) => prev.filter((f) => f.id !== faqToDelete.id));
      setFaqToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  // Listings lookup map
  const listingsMap = useMemo(() => {
    const map = new Map<string, UserListingItem>();
    listings.forEach((l) => map.set(l.id, l));
    return map;
  }, [listings]);

  // Tab counts based on current listing filter
  const listingScopedFaqs = useMemo(() => {
    if (selectedListingId === "All") return faqs;
    return faqs.filter((f) => f.listingId === selectedListingId);
  }, [faqs, selectedListingId]);

  const allCount = listingScopedFaqs.length;
  const approvedCount = listingScopedFaqs.filter(
    (f) => (listingsMap.get(f.listingId)?.status || "Approved") === "Approved"
  ).length;
  const pendingCount = listingScopedFaqs.filter(
    (f) => listingsMap.get(f.listingId)?.status === "Pending"
  ).length;
  const rejectedCount = listingScopedFaqs.filter(
    (f) => listingsMap.get(f.listingId)?.status === "Rejected"
  ).length;

  const tabs: FaqStatusTabItem[] = [
    { id: "All", label: "All", count: allCount },
    { id: "Approved", label: "Approved", count: approvedCount },
    { id: "Pending", label: "Pending", count: pendingCount },
    { id: "Rejected", label: "Rejected", count: rejectedCount },
  ];

  // Filtered FAQs (by Listing + Approval Status Tab + Search Query)
  const filteredFaqs = useMemo(() => {
    return faqs.filter((item) => {
      // 1. Business listing filter
      if (selectedListingId !== "All" && item.listingId !== selectedListingId) {
        return false;
      }

      // 2. Approval status tab filter (All, Approved, Pending, Rejected)
      const listing = listingsMap.get(item.listingId);
      const listingStatus = listing?.status || "Approved";
      if (statusFilter !== "All" && listingStatus !== statusFilter) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesQuestion = item.question.toLowerCase().includes(query);
        const matchesAnswer = item.answer.toLowerCase().includes(query);
        const matchesListingName = listing?.name.toLowerCase().includes(query) ?? false;
        if (!matchesQuestion && !matchesAnswer && !matchesListingName) {
          return false;
        }
      }

      return true;
    });
  }, [faqs, selectedListingId, statusFilter, searchQuery, listingsMap]);

  const isFiltered =
    selectedListingId !== "All" || statusFilter !== "All" || searchQuery.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Top Header & Add Action matching My Business Listings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Custom FAQs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage custom frequently asked questions across your business listings to resolve customer inquiries faster.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleOpenAdd}
          className="h-11 px-5 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New FAQ</span>
        </Button>
      </div>

      {/* Tabs & Search Filter Bar */}
      <FaqsFilters
        tabs={tabs}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        listings={listings}
        selectedListingId={selectedListingId}
        onListingChange={setSelectedListingId}
      />

      {/* Table or Empty State matching My Business Listings */}
      {filteredFaqs.length === 0 ? (
        <FaqsEmpty onAddNew={handleOpenAdd} isFiltered={isFiltered} />
      ) : (
        <FaqsTable
          faqs={filteredFaqs}
          listings={listings}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onToggleActive={toggleActive}
        />
      )}

      {/* Add / Edit FAQ Modal */}
      <ManageFaqModal
        open={isManageModalOpen}
        onOpenChange={setIsManageModalOpen}
        editingFaq={editingFaq}
        listings={listings}
        defaultListingId={selectedListingId}
        onSave={handleSaveFaq}
      />

      {/* Delete Confirmation Alert Modal matching My Business Listings */}
      <AlertModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="Delete Custom FAQ"
        description={
          faqToDelete
            ? `Are you sure you want to delete "${faqToDelete.question}"? This will permanently remove it from your live business listing.`
            : "Are you sure you want to delete this FAQ? This action cannot be undone."
        }
        confirmLabel="Delete FAQ"
        cancelLabel="Cancel"
        confirmVariant="destructive"
        onConfirm={confirmDeleteFaq}
      />
    </div>
  );
}
