"use client";

import { useMemo, useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import { PopoverMenu } from "@/components/common/popover-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Bell,
  Building2,
  CheckCheck,
  Clock,
  CreditCard,
  Megaphone,
  MessageSquare,
  MoreVertical,
  Trash2,
} from "lucide-react";
import type { NotificationItem, NotificationType } from "@/data";

interface NotificationsTableProps {
  data: NotificationItem[];
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "inquiry":
      return MessageSquare;
    case "listing":
      return Building2;
    case "payment":
      return CreditCard;
    case "broadcast":
      return Megaphone;
    default:
      return Bell;
  }
};

const getNotificationIconColor = (type: NotificationType) => {
  switch (type) {
    case "inquiry":
      return "text-sky-600 bg-sky-50 border-sky-200/80";
    case "listing":
      return "text-indigo-600 bg-indigo-50 border-indigo-200/80";
    case "payment":
      return "text-emerald-600 bg-emerald-50 border-emerald-200/80";
    case "broadcast":
      return "text-amber-600 bg-amber-50 border-amber-200/80";
    default:
      return "text-slate-600 bg-slate-50 border-slate-200/80";
  }
};

interface NotificationActionsCellProps {
  item: NotificationItem;
  onToggleRead: (id: string) => void;
  onDelete: (id: string) => void;
}

function NotificationActionsCell({
  item,
  onToggleRead,
  onDelete,
}: NotificationActionsCellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-end">
      <PopoverMenu
        open={menuOpen}
        onOpenChange={setMenuOpen}
        trigger={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
            title="Options"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        }
        align="end"
        contentClass="w-44 p-1"
      >
        <div className="flex flex-col gap-0.5">
          {/* Mark as read (only shown when unread) */}
          {!item.read && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMenuOpen(false);
                  onToggleRead(item.id);
                }}
                className="w-full justify-start font-semibold gap-2 h-8.5 px-2 hover:bg-slate-100 text-xs cursor-pointer text-slate-700 hover:text-slate-900"
              >
                <CheckCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Mark as Read</span>
              </Button>
          )}

          {/* Delete */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setMenuOpen(false);
              onDelete(item.id);
            }}
            className="w-full justify-start font-semibold gap-2 h-8.5 px-2 hover:bg-rose-50 text-rose-600 hover:text-rose-700 text-xs cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </Button>
        </div>
      </PopoverMenu>
    </div>
  );
}

export function NotificationsTable({
  data,
  onToggleRead,
  onDelete,
}: NotificationsTableProps) {
  const columns = useMemo<ColumnDef<NotificationItem>[]>(
    () => [
      // 1. Notification (Icon + Title)
      {
        accessorKey: "title",
        header: "Notification",
        cell: ({ row }) => {
          const item = row.original;
          const Icon = getNotificationIcon(item.type);
          const iconColor = getNotificationIconColor(item.type);

          return (
            <div className="flex items-center gap-2.5 min-w-[200px] max-w-xs py-0.5">
              <div
                className={cn(
                  "size-8.5 rounded-lg flex items-center justify-center shrink-0 border shadow-2xs",
                  iconColor
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="flex items-center gap-1.5 min-w-0">
                <p
                  className={cn(
                    "text-xs sm:text-sm truncate",
                    !item.read
                      ? "font-bold text-slate-900"
                      : "font-medium text-slate-700"
                  )}
                >
                  {item.title}
                </p>
                {!item.read && (
                  <span className="size-1.75 rounded-full bg-indigo-600 shrink-0" />
                )}
              </div>
            </div>
          );
        },
      },

      // 2. Message (Description)
      {
        accessorKey: "message",
        header: "Message",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <p className="text-xs text-slate-600 leading-relaxed max-w-md min-w-60 line-clamp-2" title={item.message}>
              {item.message}
            </p>
          );
        },
      },

      // 3. Type (formerly Category)
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.original.type;

          switch (type) {
            case "inquiry":
              return (
                <Badge variant="sky" className="gap-1 font-semibold">
                  <span>Inquiry</span>
                </Badge>
              );
            case "listing":
              return (
                <Badge variant="indigo" className="gap-1 font-semibold">
                  <span>Listing</span>
                </Badge>
              );
            case "payment":
              return (
                <Badge variant="emerald" className="gap-1 font-semibold">
                  <span>Plan &amp; Billing</span>
                </Badge>
              );
            case "broadcast":
              return (
                <Badge variant="amber" className="gap-1 font-semibold">
                  <span>Announcement</span>
                </Badge>
              );
            default:
              return (
                <Badge variant="muted" className="gap-1 font-semibold">
                  <span>General</span>
                </Badge>
              );
          }
        },
      },

      // 4. Date (formerly Received)
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 whitespace-nowrap font-medium">
              <span>{row.original.createdAt}</span>
            </div>
          );
        },
      },

      // 5. Actions (Popover Menu)
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <NotificationActionsCell
            item={row.original}
            onToggleRead={onToggleRead}
            onDelete={onDelete}
          />
        ),
      },
    ],
    [onToggleRead, onDelete]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No notifications found."
    />
  );
}
