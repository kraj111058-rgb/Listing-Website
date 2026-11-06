"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import { PopoverMenu } from "@/components/common/popover-menu";
import { Modal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

import {
  MapPin,
  Phone,
  Eye,
  Star,
  Edit,
  ExternalLink,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  MoreVertical,
  Crown,
  Briefcase,
  HelpCircle,
} from "lucide-react";
import { type UserListingItem } from "@/data";

interface ListingActionsCellProps {
  listing: UserListingItem;
  onDelete: (id: string) => void;
}

function ListingActionsCell({ listing, onDelete }: ListingActionsCellProps) {
  const [isReasonOpen, setIsReasonOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isApproved = listing.status === "Approved";
  const isRejected = listing.status === "Rejected";

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
        contentClass="w-44 p-1"
      >
        <div className="flex flex-col gap-1">
          {/* View Rejection Reason inside PopoverMenu for Rejected listings */}
          {isRejected && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setMenuOpen(false);
                setIsReasonOpen(true);
              }}
              className="w-full justify-start font-semibold gap-2 h-9 px-2 hover:bg-rose-50 hover:text-rose-700 text-rose-600 transition-all text-xs cursor-pointer"
            >
              <AlertCircle className="size-4 text-rose-600" />
              <span>View Reason</span>
            </Button>
          )}

          {/* Edit */}
          <Link
            href={`/dashboard/edit-listing/${listing.id}`}
            onClick={() => setMenuOpen(false)}
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start font-semibold gap-2 h-9 px-2 hover:bg-primary/10 hover:text-primary transition-all text-xs cursor-pointer"
            >
              <Edit className="size-4 text-indigo-600" />
              <span>Edit Listing</span>
            </Button>
          </Link>

          {/* Manage FAQs */}
          <Link
            href={`/dashboard/faqs?listingId=${listing.id}`}
            onClick={() => setMenuOpen(false)}
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start font-semibold gap-2 h-9 px-2 hover:bg-primary/10 hover:text-primary transition-all text-xs cursor-pointer"
            >
              <HelpCircle className="size-4 text-indigo-600" />
              <span>Manage FAQs</span>
            </Button>
          </Link>

          {/* Services & Products (Featured Plan Only) */}
          {listing.plan === "Featured" && (
            <Link
              href={`/dashboard/my-listings/${listing.id}/services-products`}
              onClick={() => setMenuOpen(false)}
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start font-semibold gap-2 h-9 px-2 hover:bg-primary/10 hover:text-primary transition-all text-xs cursor-pointer"
              >
                <Briefcase className="size-4 text-indigo-600" />
                <span>Services & Products</span>
              </Button>
            </Link>
          )}

          {/* View Public Listing (if Approved) */}
          {isApproved && (
            <Link
              href="/listings"
              target="_blank"
              onClick={() => setMenuOpen(false)}
            >
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start font-semibold gap-2 h-9 px-2 hover:bg-primary/10 hover:text-primary transition-all text-xs cursor-pointer"
              >
                <ExternalLink className="size-4 text-slate-500" />
                <span>View Public</span>
              </Button>
            </Link>
          )}

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setMenuOpen(false);
              onDelete(listing.id);
            }}
            className="w-full justify-start text-destructive gap-2 h-9 px-2 hover:text-destructive hover:bg-destructive/10 transition-all text-xs cursor-pointer"
          >
            <Trash2 className="size-4" />
            <span>Delete</span>
          </Button>
        </div>
      </PopoverMenu>

      {/* Common Modal for Rejection Reason */}
      {isRejected && (
        <Modal
          open={isReasonOpen}
          onOpenChange={setIsReasonOpen}
          title="Rejection Reason"
          description={`Admin feedback for ${listing.name}`}
          headerIcon={<AlertCircle className="w-5 h-5 text-rose-600" />}
          footer={
            <div className="flex items-center justify-end w-full">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsReasonOpen(false)}
                className="h-9 px-4 rounded-[10px] text-xs font-semibold cursor-pointer"
              >
                Close
              </Button>
            </div>
          }
        >
          <div className="bg-rose-50/80 border border-rose-200/80 rounded-xl p-4 text-xs text-rose-900 leading-relaxed">
            <span className="font-bold block text-rose-950 mb-1">
              Reason for Rejection:
            </span>
            <p className="text-rose-800">
              {listing.rejectionReason || "No specific reason provided."}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

interface MyListingsTableProps {
  data: UserListingItem[];
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function MyListingsTable({
  data,
  onToggleActive,
  onDelete,
}: MyListingsTableProps) {
  const columns = useMemo<ColumnDef<UserListingItem>[]>(
    () => [
      // 0. Index / Serial Number Column
      {
        id: "index",
        header: "No.",
        cell: ({ row }) => (
          <span className="text-xs font-semibold text-slate-500">
            {row.index + 1}
          </span>
        ),
      },

      // 1. Business Info Column
      {
        id: "business",
        header: "Business Details",
        cell: ({ row }) => {
          const listing = row.original;
          return (
            <div className="flex items-start gap-3.5 min-w-[240px]">
              <Image
                src={listing.image}
                alt={listing.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-100 shadow-2xs"
              />
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {listing.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {listing.name}
                </h4>
                <div className="flex items-center gap-1 text-xs text-slate-400 truncate max-w-xs">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{listing.address}</span>
                </div>
              </div>
            </div>
          );
        },
      },

      // 2. City & Contact Column
      {
        id: "contact",
        header: "Contact & City",
        cell: ({ row }) => {
          const listing = row.original;
          return (
            <div className="space-y-1 min-w-[130px]">
              <div className="text-xs font-semibold text-slate-800">
                {listing.city}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{listing.phone}</span>
              </div>
            </div>
          );
        },
      },

      // 3. Plan Column
      {
        id: "plan",
        header: "Plan",
        cell: ({ row }) => {
          const plan = row.original.plan || "Free";
          if (plan === "Featured") {
            return (
              <Badge variant="amber" className="gap-1 font-semibold">
                <Crown className="w-3 h-3 text-amber-600 fill-amber-400" />
                <span>Featured</span>
              </Badge>
            );
          }
          return (
            <Badge variant="muted" className="gap-1 font-semibold text-slate-600">
              <span>Free</span>
            </Badge>
          );
        },
      },

      // 4. Services & Products Column (Featured Plan Only: icon button, Free Plan: -)
      {
        id: "servicesAndProducts",
        header: "Services & Products",
        cell: ({ row }) => {
          const listing = row.original;
          const isFeatured = listing.plan === "Featured";
          const count = listing.servicesAndProducts?.length ?? 0;

          if (!isFeatured) {
            return (
              <div
                className="flex items-center min-w-[130px]"
                title="Services & Products catalog is available on Featured Plan only"
              >
                <span className="text-slate-400 font-bold text-sm px-2 select-none">
                  —
                </span>
              </div>
            );
          }

          return (
            <div className="flex items-center min-w-[130px]">
              <Link
                href={`/dashboard/my-listings/${listing.id}/services-products`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200/90 bg-indigo-50/70 hover:bg-indigo-100 hover:border-indigo-300 text-indigo-700 transition-all text-xs font-bold group cursor-pointer shadow-2xs hover:shadow-xs"
                title={`Manage Services & Products (${count} items)`}
              >
                <Briefcase className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform shrink-0" />
                <span>Manage</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-white text-indigo-700 border border-indigo-200/80 shadow-2xs">
                  {count}
                </span>
              </Link>
            </div>
          );
        },
      },

      // 4. Approval Status Column
      {
        id: "approval",
        header: "Approval Status",
        cell: ({ row }) => {
          const listing = row.original;
          return (
            <div className="flex items-center min-w-[110px]">
              {listing.status === "Approved" && (
                <Badge variant="emerald" className="gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Approved</span>
                </Badge>
              )}

              {listing.status === "Pending" && (
                <Badge variant="amber" className="gap-1 font-semibold">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>Pending</span>
                </Badge>
              )}

              {listing.status === "Rejected" && (
                <Badge variant="rose" className="gap-1 font-semibold">
                  <XCircle className="w-3 h-3 text-rose-600" />
                  <span>Rejected</span>
                </Badge>
              )}
            </div>
          );
        },
      },

      // 4. Analytics & Rating Column
      {
        id: "views",
        header: "Views",
        cell: ({ row }) => {
          const listing = row.original;
          return (
            <div className="space-y-1 min-w-[120px] text-xs">
              <div className="flex items-center gap-1 text-slate-800 font-bold">
                {listing.views.toLocaleString()}
              </div>
            </div>
          );
        },
      },

      // 5. Status Toggle Column with Switch (Action column aagal)
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const listing = row.original;
          const isApproved = listing.status === "Approved";
          const isActive = isApproved && listing.isActive !== false;

          return (
            <div className="flex items-center gap-2 min-w-[110px]">
              <Switch
                checked={isActive}
                disabled={!isApproved}
                onCheckedChange={() => onToggleActive(listing.id)}
                className="cursor-pointer data-[checked]:bg-emerald-600"
                title={
                  isApproved
                    ? isActive
                      ? "Active "
                      : "Inactive"
                    : "Only approved listings can be toggled"
                }
              />
              <span
                className={`text-xs font-semibold select-none ${!isApproved
                    ? "text-slate-400"
                    : isActive
                      ? "text-emerald-700"
                      : "text-slate-500"
                  }`}
              >
                {!isApproved ? "Disabled" : isActive ? "Active" : "Inactive"}
              </span>
            </div>
          );
        },
      },

      // 6. Action Buttons Column with PopoverMenu & Modal
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <ListingActionsCell
            listing={row.original}
            onDelete={onDelete}
          />
        ),
      },
    ],
    [onToggleActive, onDelete]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No listings found matching your search or filter."
    />
  );
}
