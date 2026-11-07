"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Crown,
  Rocket,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Loader2,
  Check,
} from "lucide-react";
import { Modal } from "@/components/common/modal";
import { SelectWithLabel } from "@/components/common/select-with-label";
import { Button } from "@/components/ui/button";
import type { ListingPlanItem } from "@/data";

interface UpgradePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listings: ListingPlanItem[];
  selectedListingId: string | null;
  initialPlanId?: "featured" | "featured-pro";
  onConfirmUpgrade: (listingId: string, planId: "featured" | "featured-pro") => void;
}

export function UpgradePlanModal({
  open,
  onOpenChange,
  listings,
  selectedListingId,
  initialPlanId = "featured",
  onConfirmUpgrade,
}: UpgradePlanModalProps) {
  const [activeListingId, setActiveListingId] = useState<string>("");
  const [chosenPlanId, setChosenPlanId] = useState<"featured" | "featured-pro">("featured");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (selectedListingId) {
      setActiveListingId(selectedListingId);
    } else if (listings.length > 0 && !activeListingId) {
      setActiveListingId(listings[0].id);
    }
  }, [selectedListingId, listings, activeListingId]);

  useEffect(() => {
    if (initialPlanId) {
      setChosenPlanId(initialPlanId);
    }
  }, [initialPlanId]);

  const currentListing = listings.find((l) => l.id === activeListingId) || listings[0];

  // Pricing calculations
  const basePriceNum = chosenPlanId === "featured" ? 199 : 499;
  const gst = Math.round(basePriceNum * 0.18 * 100) / 100;
  const total = (basePriceNum + gst).toFixed(2);

  const listingOptions = listings.map((l) => ({
    value: l.id,
    label: `${l.listingName} (${l.planName})`,
  }));

  const handlePay = async () => {
    if (!activeListingId) return;
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsProcessing(false);
    onConfirmUpgrade(activeListingId, chosenPlanId);
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      maxWidth="sm:max-w-xl"
      title="Upgrade Business Plan"
      description="Choose the business listing and select the advertising tier you want to activate."
      headerIcon={<Crown className="size-5 text-[#5c67f2]" />}
      footer={
        <div className="flex items-center justify-end gap-2.5 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
            className="h-10 px-4 rounded-[10px] text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handlePay}
            disabled={isProcessing || !activeListingId}
            className="h-10 px-5 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white text-xs font-semibold shadow-md shadow-indigo-600/20 cursor-pointer flex items-center gap-1.5 transition-all"
          >
            {isProcessing ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="size-4" />
                <span>Pay ₹{total} & Activate</span>
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-4 pt-1">
        {/* Step 1: Select Business Listing */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-800">
            Target Business Listing:
          </label>
          <SelectWithLabel
            placeholder="Select business listing"
            value={activeListingId}
            onValueChange={setActiveListingId}
            options={listingOptions}
          />
        </div>

        {/* Selected Listing Summary Card */}
        {currentListing && (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200">
              <Image
                src={currentListing.image}
                alt={currentListing.listingName}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="text-xs font-bold text-slate-900 truncate">
                {currentListing.listingName}
              </h5>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span>Current: <strong>{currentListing.planName}</strong></span>
                <span>&bull;</span>
                <span>Expiry: {currentListing.expiryDate}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Choose Upgrade Tier (Featured ₹199 vs Featured Pro ₹499) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-800">
            Select Advertising Package:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Featured Listing - ₹199 */}
            <div
              onClick={() => setChosenPlanId("featured")}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                chosenPlanId === "featured"
                  ? "border-[#5c67f2] bg-indigo-50/50 shadow-xs"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80">
                  PACKAGE 2
                </span>
                <span className="text-xs font-extrabold text-slate-900">
                  ₹199 <span className="text-[10px] text-slate-500 font-normal">/ 3 mos</span>
                </span>
              </div>
              <h5 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Crown className="size-4 text-amber-500" />
                <span>Featured Listing</span>
              </h5>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Featured on homepage, category priority, up to 5 services & products.
              </p>
            </div>

            {/* Featured Pro - ₹499 */}
            <div
              onClick={() => setChosenPlanId("featured-pro")}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                chosenPlanId === "featured-pro"
                  ? "border-[#5c67f2] bg-indigo-50/50 shadow-xs"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/80">
                  PACKAGE 3
                </span>
                <span className="text-xs font-extrabold text-slate-900">
                  ₹499 <span className="text-[10px] text-slate-500 font-normal">/ 3 mos</span>
                </span>
              </div>
              <h5 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Rocket className="size-4 text-purple-600" />
                <span>Featured Pro</span>
              </h5>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Maximum search power, homepage spotlight, up to 10 services & products.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Billing & GST Breakdown */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
          <div className="flex items-center justify-between text-slate-600">
            <span>Package Price (3 Months)</span>
            <span className="font-semibold text-slate-800">₹{basePriceNum}.00</span>
          </div>
          <div className="flex items-center justify-between text-slate-600">
            <span>GST (18% Goods & Services Tax)</span>
            <span className="font-semibold text-slate-800">₹{gst.toFixed(2)}</span>
          </div>
          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-sm font-extrabold text-slate-900">
            <span>Total Payable Amount</span>
            <span className="text-[#5c67f2] font-mono text-base">₹{total}</span>
          </div>
        </div>

        {/* Step 4: Payment Method */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-800">
            Payment Method:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("upi")}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                paymentMethod === "upi"
                  ? "border-[#5c67f2] bg-indigo-50/60 text-[#5c67f2]"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <QrCode className="size-4" />
              <span>UPI / QR</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                paymentMethod === "card"
                  ? "border-[#5c67f2] bg-indigo-50/60 text-[#5c67f2]"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <CreditCard className="size-4" />
              <span>Cards</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("netbanking")}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                paymentMethod === "netbanking"
                  ? "border-[#5c67f2] bg-indigo-50/60 text-[#5c67f2]"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Building className="size-4" />
              <span>Net Banking</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
