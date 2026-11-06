"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  MoreVertical,
} from "lucide-react";
import { DataTable } from "@/components/common/data-table";
import { PopoverMenu } from "@/components/common/popover-menu";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { ListingFaqItem, UserListingItem } from "@/data";

interface FaqActionsCellProps {
  faq: ListingFaqItem;
  onEdit: (faq: ListingFaqItem) => void;
  onDelete: (faq: ListingFaqItem) => void;
}

function FaqActionsCell({ faq, onEdit, onDelete }: FaqActionsCellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-end">
      <PopoverMenu
        open={menuOpen}
        onOpenChange={setMenuOpen}
        trigger={
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-primary/10 transition-colors cursor-pointer"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        }
        align="end"
        contentClass="w-36 p-1"
      >
        <div className="flex flex-col gap-1">
          {/* Edit FAQ */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setMenuOpen(false);
              onEdit(faq);
            }}
            className="w-full justify-start font-semibold gap-2 h-9 px-2 hover:bg-primary/10 hover:text-primary transition-all text-xs cursor-pointer"
          >
            <Edit className="size-4 text-indigo-600" />
            <span>Edit FAQ</span>
          </Button>

          {/* Delete FAQ */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setMenuOpen(false);
              onDelete(faq);
            }}
            className="w-full justify-start text-destructive gap-2 h-9 px-2 hover:text-destructive hover:bg-destructive/10 transition-all text-xs cursor-pointer"
          >
            <Trash2 className="size-4" />
            <span>Delete</span>
          </Button>
        </div>
      </PopoverMenu>
    </div>
  );
}

interface FaqsTableProps {
  faqs: ListingFaqItem[];
  listings: UserListingItem[];
  onEdit: (faq: ListingFaqItem) => void;
  onDelete: (faq: ListingFaqItem) => void;
  onToggleActive: (id: string) => void;
}

export function FaqsTable({
  faqs,
  listings,
  onEdit,
  onDelete,
  onToggleActive,
}: FaqsTableProps) {
  const listingsMap = useMemo(() => {
    const map = new Map<string, UserListingItem>();
    listings.forEach((l) => map.set(l.id, l));
    return map;
  }, [listings]);

  const columns = useMemo<ColumnDef<ListingFaqItem>[]>(
    () => [
      // 1. Index Column matching My Business Listings
      {
        id: "index",
        header: "No.",
        cell: ({ row }) => (
          <span className="text-xs font-semibold text-slate-500">
            {row.index + 1}
          </span>
        ),
      },

      // 2. Question & Answer Column
      {
        id: "questionAndAnswer",
        header: "Question & Answer",
        cell: ({ row }) => {
          const faq = row.original;
          return (
            <div className="min-w-[260px] max-w-md space-y-1 py-1">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                {faq.question}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          );
        },
      },

      // 3. Business Listing Column (only name show)
      {
        id: "listing",
        header: "Business Listing",
        cell: ({ row }) => {
          const faq = row.original;
          const listing = listingsMap.get(faq.listingId);

          return (
            <div className="min-w-[160px] max-w-[220px]">
              <span
                className="font-semibold text-slate-900 text-sm truncate block"
                title={listing?.name}
              >
                {listing?.name || "Unknown Listing"}
              </span>
            </div>
          );
        },
      },

      // 4. Approval Status Column matching My Business Listings
      {
        id: "approval",
        header: "Approval Status",
        cell: ({ row }) => {
          const faq = row.original;
          const listing = listingsMap.get(faq.listingId);
          const status = listing?.status || "Approved";

          return (
            <div className="flex items-center min-w-[110px]">
              {status === "Approved" && (
                <Badge variant="emerald" className="gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Approved</span>
                </Badge>
              )}

              {status === "Pending" && (
                <Badge variant="amber" className="gap-1 font-semibold">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>Pending</span>
                </Badge>
              )}

              {status === "Rejected" && (
                <Badge variant="rose" className="gap-1 font-semibold">
                  <XCircle className="w-3 h-3 text-rose-600" />
                  <span>Rejected</span>
                </Badge>
              )}
            </div>
          );
        },
      },

      // 5. Active/Inactive Toggle Switch
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const faq = row.original;
          const isActive = faq.isActive !== false;

          return (
            <div className="flex items-center gap-1.5 min-w-[85px]">
              <Switch
                checked={isActive}
                onCheckedChange={() => onToggleActive(faq.id)}
                className="cursor-pointer data-[checked]:bg-emerald-600"
                title={
                  isActive
                    ? "Active on public listing"
                    : "Hidden from public listing"
                }
              />
              <span
                className={`text-[11px] font-semibold select-none ${
                  isActive ? "text-emerald-700" : "text-slate-500"
                }`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          );
        },
      },

      // 6. Actions Column with PopoverMenu matching MyListingsTable
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <FaqActionsCell
            faq={row.original}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ],
    [listingsMap, onEdit, onDelete, onToggleActive]
  );

  return (
    <DataTable
      columns={columns}
      data={faqs}
      emptyMessage="No FAQs found matching your search or filter."
    />
  );
}
