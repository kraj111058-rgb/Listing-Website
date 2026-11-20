"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Loader2, Check } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/common";
import {
  listingWizardSchema,
  stepFieldsMap,
  type ListingWizardFormValues,
} from "@/schemas";
import {
  StepperHeader,
  Step1BasicInfo,
  Step2ContactLocation,
  Step3PhotosSocial,
  Step4SeoDetails,
  Step5ChoosePlan,
  FormSuccessCard,
} from "./form";

interface ListingFormWizardProps {
  mode?: "create" | "edit";
  listingId?: string;
}

function getDefaultListingValues(
  mode: "create" | "edit"
): ListingWizardFormValues {
  return {
    // Step 1: Basic Information
    name: mode === "edit" ? "Royal Palace Heritage Hotel & Resort" : "",
    slug: mode === "edit" ? "royal-palace-heritage-hotel-resort" : "",
    category: mode === "edit" ? "Hotels & Travel" : "",
    shortDescription:
      mode === "edit"
        ? "Experience 5-star royal heritage in the heart of Jaipur"
        : "",
    fullDescription:
      mode === "edit"
        ? "Centrally located heritage hotel offering opulent suites, royal dining, and world-class hospitality in the heart of Jaipur."
        : "",
    established: mode === "edit" ? "2015" : "",
    employees: mode === "edit" ? "21-50" : "",
    gstin: mode === "edit" ? "08AAACR1234F1Z5" : "",
    tags: mode === "edit" ? ["hotel", "luxury", "jaipur"] : [],

    // Step 2: Location & Contact + Business Hours
    state: mode === "edit" ? "Rajasthan" : "",
    city: mode === "edit" ? "Jaipur" : "",
    address: mode === "edit" ? "Palace Road, Near City Palace" : "",
    pincode: mode === "edit" ? "302002" : "",
    latitude: mode === "edit" ? "28.7041" : "",
    longitude: mode === "edit" ? "77.1025" : "",
    phone: mode === "edit" ? "+91 92438 37806" : "",
    secondaryPhone: mode === "edit" ? "" : "",
    email: mode === "edit" ? "business@email.com" : "",
    website: mode === "edit" ? "https://yourbusiness.com" : "",
    is24x7: mode === "edit" ? true : false,
    openTime: "",
    closeTime: "",
    closedDays: [""],

    // Step 3: Photos & Social Links
    logo:
      mode === "edit"
        ? "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200"
        : "",
    gallery:
      mode === "edit"
        ? [
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
            "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500",
          ]
        : [],
    whatsapp: mode === "edit" ? "+91 92438 37806" : "",
    facebook: mode === "edit" ? "https://facebook.com/royalpalace" : "",
    instagram: mode === "edit" ? "https://instagram.com/royalpalace" : "",
    twitter: mode === "edit" ? "https://twitter.com/royalpalace" : "",
    linkedin: mode === "edit" ? "https://linkedin.com/company/royalpalace" : "",
    youtube: mode === "edit" ? "https://youtube.com/@royalpalace" : "",

    // Step 4: SEO Details
    metaTitle:
      mode === "edit" ? "Best Heritage Hotel in Jaipur | Royal Palace" : "",
    metaDescription:
      mode === "edit"
        ? "Book luxury heritage suites at Royal Palace Hotel Jaipur. 5-star experience."
        : "",
    metaKeywords:
      mode === "edit" ? "hotel jaipur, royal palace, heritage resort" : "",

    // Step 5: Choose Plan
    selectedPlan: "free",
  };
}

export function ListingFormWizard({
  mode = "create",
  listingId,
}: ListingFormWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Unsaved changes alert modal state
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingNavUrl, setPendingNavUrl] = useState<string | null>(null);
  const allowNavigationRef = useRef(false);

  const methods = useForm<ListingWizardFormValues>({
    resolver: zodResolver(listingWizardSchema),
    mode: "onChange",
    defaultValues: getDefaultListingValues(mode),
  });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting, isDirty },
  } = methods;

  // Check if user has unsaved progress (dirty form or progressed past step 1)
  const hasUnsavedChanges =
    (isDirty || currentStep > 1) && !isSubmitted;

  // 1. Browser Tab Close / Refresh Protection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !isSubmitted) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges, isSubmitted]);

  // 2. Browser Back / Popstate Button Protection
  useEffect(() => {
    if (!hasUnsavedChanges || isSubmitted) return;

    window.history.pushState({ formGuard: true }, "", window.location.href);

    const handlePopState = () => {
      if (allowNavigationRef.current) return;
      window.history.pushState({ formGuard: true }, "", window.location.href);
      setPendingNavUrl("BACK");
      setShowUnsavedModal(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [hasUnsavedChanges, isSubmitted]);

  // 3. Document-Level Link Click Interceptor
  useEffect(() => {
    const handleClickCapture = (e: MouseEvent) => {
      if (isSubmitted || allowNavigationRef.current) return;
      if (!hasUnsavedChanges) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      const targetUrl = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);
      if (
        targetUrl.pathname === currentUrl.pathname &&
        targetUrl.search === currentUrl.search
      ) {
        return;
      }

      // Stop navigation
      e.preventDefault();
      e.stopPropagation();

      setPendingNavUrl(targetUrl.pathname + targetUrl.search);
      setShowUnsavedModal(true);
    };

    document.addEventListener("click", handleClickCapture, { capture: true });
    return () => {
      document.removeEventListener("click", handleClickCapture, {
        capture: true,
      });
    };
  }, [hasUnsavedChanges, isSubmitted]);

  // Cancel button click handler
  const handleCancelClick = (targetUrl: string = "/dashboard/my-listings") => {
    if (hasUnsavedChanges) {
      setPendingNavUrl(targetUrl);
      setShowUnsavedModal(true);
    } else {
      router.push(targetUrl);
    }
  };

  // User confirmed "Discard & Leave"
  const handleConfirmDiscard = () => {
    allowNavigationRef.current = true;
    setShowUnsavedModal(false);
    if (pendingNavUrl === "BACK") {
      window.history.go(-2);
    } else if (pendingNavUrl) {
      router.push(pendingNavUrl);
    } else {
      router.push("/dashboard/my-listings");
    }
  };

  // User chose to "Keep Editing"
  const handleStay = () => {
    setShowUnsavedModal(false);
    setPendingNavUrl(null);
  };

  const handleNext = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const fieldsToValidate = stepFieldsMap[currentStep];
    const isStepValid = await trigger(fieldsToValidate);
    if (!isStepValid) {
      return;
    }
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmit = async (_values: ListingWizardFormValues) => {
    if (currentStep < 5) {
      await handleNext();
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSubmitted) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fc] py-10 px-4 flex items-center justify-center">
        <FormSuccessCard mode={mode} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Title & Navigation Header (Original Clean Style) */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {mode === "create" ? "Add New Business" : "Edit Business Listing"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Complete the 5 steps below to showcase your business to thousands of
            daily visitors.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleCancelClick("/dashboard/my-listings")}
          className="h-9 px-3.5 rounded-[9px] border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
        >
          Cancel
        </Button>
      </div>

      {/* Stepper Header (1 to 5) - Visual progress tracker */}
      <StepperHeader currentStep={currentStep} />

      {/* Step Form Body */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                (e.target as HTMLElement).tagName !== "TEXTAREA"
              ) {
                e.preventDefault();
                if (currentStep < 5) {
                  handleNext();
                }
              }
            }}
          >
            {currentStep === 1 && <Step1BasicInfo />}
            {currentStep === 2 && <Step2ContactLocation />}
            {currentStep === 3 && <Step3PhotosSocial />}
            {currentStep === 4 && <Step4SeoDetails />}
            {currentStep === 5 && <Step5ChoosePlan />}

            {/* Stepper Footer Buttons */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <Button
                  key="wizard-prev-btn"
                  type="button"
                  variant="outline"
                  onClick={handlePrev}
                  className="h-11 px-5 rounded-[10px] border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <Button
                  key="wizard-next-btn"
                  type="button"
                  onClick={handleNext}
                  className="h-11 px-5 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 cursor-pointer flex items-center gap-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  key="wizard-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="h-11 px-5 rounded-[10px] bg-[#5c67f2] hover:bg-[#4f59e0] text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/20 cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Listing...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Submit</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>

      {/* Unsaved Changes Confirmation Dialog using common AlertModal */}
      <AlertModal
        open={showUnsavedModal}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleStay();
        }}
        title="Unsaved Listing Changes"
        description="You have unsaved changes in your listing form. If you leave now, all your entered business details will be lost."
        confirmLabel="Discard & Leave"
        cancelLabel="Keep Editing"
        confirmVariant="destructive"
        onConfirm={handleConfirmDiscard}
      />
    </div>
  );
}
