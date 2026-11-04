"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import { PopoverMenu } from "@/components/common/popover-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Phone,
  Building2,
  Calendar,
  Clock,
  MoreVertical,
  Eye,
  Trash2,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";
import type { CustomerInquiryItem } from "@/data";

interface InquiriesTableProps {
  data: CustomerInquiryItem[];
  onViewDetails: (inquiry: CustomerInquiryItem) => void;
  onStatusChange: (id: string, newStatus: CustomerInquiryItem["status"]) => void;
  onDelete: (id: string) => void;
}

export function InquiriesTable({
  data,
  onViewDetails,
  onStatusChange,
  onDelete,
}: InquiriesTableProps) {
  const columns = useMemo<ColumnDef<CustomerInquiryItem>[]>(
    () => [
      // 1. Customer
      {
        accessorKey: "fullName",
        header: "Customer",
        cell: ({ row }) => {
          const item = row.original;

          return (
            <div className="min-w-[160px] space-y-0.5">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                {item.fullName}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <a
                  href={`tel:${item.phone}`}
                  className="hover:text-indigo-600 transition-colors flex items-center gap-1"
                >
                  <Phone size={11} className="text-slate-400" />
                  <span>+91 {item.phone}</span>
                </a>
              </div>
            </div>
          );
        },
      },

      // 2. Business Listing
      {
        accessorKey: "listingName",
        header: "Business Listing",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="min-w-[170px] space-y-0.5">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-[220px]">
                {item.listingName}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {item.listingCategory} • {item.listingCity}
              </p>
            </div>
          );
        },
      },

      // 3. Service Requested
      {
        accessorKey: "service",
        header: "Service Requested",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="min-w-[170px] space-y-0.5">
              <p className="text-xs font-bold text-indigo-700 truncate max-w-[200px]">
                {item.service}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Calendar size={11} />
                <span>{item.date} {item.time && `• ${item.time}`}</span>
              </div>
            </div>
          );
        },
      },

      // 4. Contact Preference
      {
        accessorKey: "preferredContact",
        header: "Contact Via",
        cell: ({ row }) => {
          const method = row.original.preferredContact;

          if (method === "WhatsApp") {
            return (
              <Badge variant="teal" className="gap-1 font-semibold">
                <MessageSquare className="w-3 h-3 text-teal-600" />
                <span>WhatsApp</span>
              </Badge>
            );
          }

          return (
            <Badge variant="indigo" className="gap-1 font-semibold">
              <Phone className="w-3 h-3 text-indigo-600" />
              <span>Phone Call</span>
            </Badge>
          );
        },
      },

      // 5. Status
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <div className="flex items-center min-w-[110px]">
              {status === "Pending" && (
                <Badge variant="amber" className="gap-1 font-semibold">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>Pending</span>
                </Badge>
              )}
              {status === "Resolved" && (
                <Badge variant="emerald" className="gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Resolved</span>
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

      // 6. Actions
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          const [menuOpen, setMenuOpen] = useState(false);
          const cleanPhone = item.phone.replace(/[^0-9]/g, "");
          const waUrl = `https://wa.me/91${cleanPhone.slice(-10)}?text=${encodeURIComponent(
            `Hello ${item.fullName}, regarding your inquiry on IndianListingBucket for ${item.service}: `
          )}`;

          return (
            <div className="flex items-center justify-end gap-1.5">
              {/* Direct Quick WhatsApp or Call CTA */}
              {item.preferredContact === "WhatsApp" ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Chat on WhatsApp"
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 rounded-lg border-teal-200 bg-teal-50/60 hover:bg-teal-100 text-teal-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <MessageSquare size={12} className="text-teal-600" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </Button>
                </a>
              ) : (
                <a href={`tel:${item.phone}`} title="Call Customer">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 rounded-lg border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-800 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Phone size={12} className="text-indigo-600" />
                    <span className="hidden sm:inline">Call</span>
                  </Button>
                </a>
              )}

              {/* More Menu */}
              <PopoverMenu
                open={menuOpen}
                onOpenChange={setMenuOpen}
                trigger={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                  >
                    <MoreVertical size={15} />
                  </Button>
                }
                align="end"
                contentClass="w-48 p-1"
              >
                <div className="flex flex-col gap-0.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMenuOpen(false);
                      onViewDetails(item);
                    }}
                    className="w-full justify-start font-semibold gap-2 h-8.5 px-2 hover:bg-slate-100 text-xs cursor-pointer"
                  >
                    <Eye size={14} className="text-slate-500" />
                    <span>View Details</span>
                  </Button>

                  {item.status !== "Resolved" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setMenuOpen(false);
                        onStatusChange(item.id, "Resolved");
                      }}
                      className="w-full justify-start font-semibold gap-2 h-8.5 px-2 hover:bg-emerald-50 hover:text-emerald-700 text-xs cursor-pointer"
                    >
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span>Mark as Resolved</span>
                    </Button>
                  )}

                  {item.status !== "Pending" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setMenuOpen(false);
                        onStatusChange(item.id, "Pending");
                      }}
                      className="w-full justify-start font-semibold gap-2 h-8.5 px-2 hover:bg-amber-50 hover:text-amber-700 text-xs cursor-pointer"
                    >
                      <Clock size={14} className="text-amber-600" />
                      <span>Mark as Pending</span>
                    </Button>
                  )}

                  {item.status !== "Rejected" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setMenuOpen(false);
                        onStatusChange(item.id, "Rejected");
                      }}
                      className="w-full justify-start font-semibold gap-2 h-8.5 px-2 hover:bg-rose-50 hover:text-rose-700 text-xs cursor-pointer"
                    >
                      <XCircle size={14} className="text-rose-600" />
                      <span>Mark as Rejected</span>
                    </Button>
                  )}

                  <div className="my-1 border-t border-slate-100" />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete(item.id);
                    }}
                    className="w-full justify-start font-semibold gap-2 h-8.5 px-2 hover:bg-rose-50 text-rose-600 hover:text-rose-700 text-xs cursor-pointer"
                  >
                    <Trash2 size={14} />
                    <span>Delete Inquiry</span>
                  </Button>
                </div>
              </PopoverMenu>
            </div>
          );
        },
      },
    ],
    [onViewDetails, onStatusChange, onDelete]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No customer inquiries match your current filter."
    />
  );
}
