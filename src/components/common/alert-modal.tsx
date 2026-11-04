"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface AlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "default" | "destructive" | "outline" | "secondary" | "success";
  onConfirm: () => void | Promise<void>;
  children?: React.ReactNode;
  contentClassName?: string;
}

export function AlertModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  confirmVariant = "default",
  onConfirm,
  children,
  contentClassName,
}: AlertModalProps) {
  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={cn(
          "bg-card p-6",
          contentClassName
        )}
      >
        <AlertDialogHeader className="gap-2 text-left">
          <AlertDialogTitle className="text-base lg:text-lg">
            {title}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {children && <div className="py-2">{children}</div>}

        <AlertDialogFooter className="mt-2 flex-row justify-end gap-2 sm:gap-2">
          <AlertDialogCancel className="h-9 rounded-md px-4 text-sm font-semibold cursor-pointer">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(
              "h-9 rounded-md px-4 text-sm font-semibold cursor-pointer transition-colors text-white",
              confirmVariant === "destructive" &&
                "bg-destructive hover:bg-destructive/90",
              confirmVariant === "success" &&
                "bg-emerald-600 hover:bg-emerald-700"
            )}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
