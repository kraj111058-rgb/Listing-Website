"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HelpCircle, Loader2 } from "lucide-react";
import {
  Modal,
  InputWithLabel,
  TextareaWithLabel,
  SelectWithLabel,
} from "@/components/common";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { faqFormSchema, type FaqFormValues } from "@/schemas";
import type { ListingFaqItem, UserListingItem } from "@/data";

interface ManageFaqModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingFaq?: ListingFaqItem | null;
  listings: UserListingItem[];
  defaultListingId?: string;
  onSave: (data: FaqFormValues) => void;
}

export function ManageFaqModal({
  open,
  onOpenChange,
  editingFaq,
  listings,
  defaultListingId,
  onSave,
}: ManageFaqModalProps) {
  const isEditing = Boolean(editingFaq);

  const fallbackListingId =
    editingFaq?.listingId ||
    (defaultListingId && defaultListingId !== "All" ? defaultListingId : "") ||
    listings[0]?.id ||
    "";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: {
      listingId: fallbackListingId,
      question: "",
      answer: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (editingFaq) {
      reset({
        listingId: editingFaq.listingId,
        question: editingFaq.question,
        answer: editingFaq.answer,
        isActive: editingFaq.isActive !== false,
      });
    }
  }, [editingFaq, defaultListingId, listings, reset, open]);

  const onSubmit = (data: FaqFormValues) => {
    onSave(data);
    onOpenChange(false);
  };

  const listingOptions = listings.map((l) => ({
    value: l.id,
    label: l.name,
  }));

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      maxWidth="sm:max-w-xl"
      title={isEditing ? "Edit Custom FAQ" : "Add New Custom FAQ"}
      description={
        isEditing
          ? "Update question, answer, and visibility for this listing."
          : "Add frequently asked questions on your specific business list."
      }
      headerIcon={<HelpCircle className="size-5" />}
      asForm={true}
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <div className="flex items-center justify-end gap-2.5 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-10 px-4 rounded-[10px] text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 px-5 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white text-xs font-semibold shadow-md shadow-indigo-600/20 cursor-pointer flex items-center gap-1.5 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : isEditing ? (
              <span>Save Changes</span>
            ) : (
              <span>Add FAQ</span>
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-4 pt-1">
        {/* Business Listing Selector using Controller */}
        <Controller
          name="listingId"
          control={control}
          render={({ field }) => (
            <SelectWithLabel
              label="Associated Business Listing"
              placeholder="Select a business listing..."
              value={field.value}
              onValueChange={field.onChange}
              error={errors.listingId?.message}
              options={listingOptions}
            />
          )}
        />

        {/* Question Field using Controller */}
        <Controller
          name="question"
          control={control}
          render={({ field }) => (
            <InputWithLabel
              label="Question"
              placeholder="e.g. Do you offer free consultations or home visits?"
              error={errors.question?.message}
              rightElement={
                <span
                  className={`text-[11px] font-mono ${
                    (field.value || "").length > 140
                      ? "text-amber-600 font-semibold"
                      : "text-slate-400"
                  }`}
                >
                  {(field.value || "").length}/150
                </span>
              }
              {...field}
            />
          )}
        />

        {/* Answer Field using Controller */}
        <Controller
          name="answer"
          control={control}
          render={({ field }) => (
            <TextareaWithLabel
              label="Answer"
              rows={4}
              placeholder="Provide a clear, direct answer to help prospective customers get the right information..."
              error={errors.answer?.message}
              rightElement={
                <span
                  className={`text-[11px] font-mono ${
                    (field.value || "").length > 550
                      ? "text-amber-600 font-semibold"
                      : "text-slate-400"
                  }`}
                >
                  {(field.value || "").length}/600
                </span>
              }
              {...field}
            />
          )}
        />

        {/* Status Toggle Switch using Controller */}
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/70">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      field.value ? "bg-emerald-500" : "bg-slate-400"
                    }`}
                  />
                  <span>Status ({field.value ? "Active" : "Inactive"})</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Visible on your business listing page when set to Active.
                </p>
              </div>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-emerald-600 cursor-pointer"
              />
            </div>
          )}
        />
      </div>
    </Modal>
  );
}
