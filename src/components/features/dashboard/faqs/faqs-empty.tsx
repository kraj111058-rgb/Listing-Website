"use client";

import { HelpCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaqsEmptyProps {
  onAddNew?: () => void;
  isFiltered?: boolean;
}

export function FaqsEmpty({ onAddNew, isFiltered }: FaqsEmptyProps) {
  return (
    <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-300 space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
        <HelpCircle className="w-7 h-7" />
      </div>
      <div className="space-y-1 max-w-sm mx-auto">
        <h3 className="text-base font-bold text-slate-900">
          {isFiltered ? "No FAQs match your filter" : "No FAQs found"}
        </h3>
        <p className="text-xs text-slate-500">
          {isFiltered
            ? "Try adjusting your search query, status tab, or selected business listing."
            : "Add clear questions and answers to help potential customers understand your services and policies."}
        </p>
      </div>
      {onAddNew && (
        <Button
          type="button"
          onClick={onAddNew}
          className="h-10 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white text-xs font-semibold px-4 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add First FAQ
        </Button>
      )}
    </div>
  );
}

