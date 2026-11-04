"use client";

import {
  Building2,
  MapPin,
  Image as ImageIcon,
  Globe,
  Crown,
  Check,
} from "lucide-react";

export const listingWizardSteps = [
  { id: 1, name: "Basic Info", icon: Building2, desc: "Name & Category" },
  { id: 2, name: "Location & Contact", icon: MapPin, desc: "Address & Hours" },
  { id: 3, name: "Photos & Social", icon: ImageIcon, desc: "Logo, Gallery & Links" },
  { id: 4, name: "SEO Details", icon: Globe, desc: "Meta Tags & Rank" },
  { id: 5, name: "Choose Plan", icon: Crown, desc: "Select Plan" },
];

interface StepperHeaderProps {
  currentStep: number;
  onSelectStep?: (stepId: number) => void;
}

export function StepperHeader({
  currentStep,
  onSelectStep,
}: StepperHeaderProps) {
  const currentStepData =
    listingWizardSteps.find((s) => s.id === currentStep) ||
    listingWizardSteps[0];
  const progressPercent = Math.round(
    ((currentStep - 1) / (listingWizardSteps.length - 1)) * 100
  );

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-2xs p-4 sm:p-5 lg:p-6 overflow-hidden select-none">
      {/* Mobile Stepper View (< md) */}
      <div className="md:hidden space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-indigo-500/20 shrink-0">
              {currentStep}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Step {currentStep} of {listingWizardSteps.length}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-tight">
                {currentStepData.name}
              </h4>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100/60">
            {progressPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.max(10, progressPercent)}%` }}
          />
        </div>

        {/* Step Pills on mobile (Display only - not changing steps on click) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 -mx-1 px-1 scrollbar-none">
          {listingWizardSteps.map((step) => {
            const isCurrent = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const Icon = step.icon;

            const pillClasses = `shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all select-none ${isCurrent
                ? "bg-indigo-600 text-white shadow-xs"
                : isCompleted
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-slate-100 text-slate-500"
              }`;

            if (onSelectStep) {
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => onSelectStep(step.id)}
                  className={`${pillClasses} cursor-pointer`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{step.name}</span>
                </button>
              );
            }

            return (
              <div key={step.id} className={pillClasses}>
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                )}
                <span>{step.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop & Tablet Stepper View (>= md) */}
      <div className="hidden md:flex items-center justify-between relative">
        {listingWizardSteps.map((step, index) => {
          const isCurrent = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const Icon = step.icon;
          const isLast = index === listingWizardSteps.length - 1;

          const stepBadgeAndText = (
            <>
              {/* Step Circle / Badge */}
              <div
                className={`w-9 h-9 lg:w-10 lg:h-10 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all shrink-0 ${isCurrent
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-4 ring-indigo-50"
                    : isCompleted
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "bg-slate-100 text-slate-400"
                  }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 lg:w-5 lg:h-5 text-white stroke-[2.5]" />
                ) : (
                  <Icon className="w-4 h-4 lg:w-4.5 lg:h-4.5" />
                )}
              </div>

              {/* Step Text */}
              <div className="min-w-0">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider block ${isCurrent
                      ? "text-indigo-600"
                      : isCompleted
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`}
                >
                  Step 0{step.id}
                </span>
                <p
                  className={`text-xs lg:text-sm font-bold truncate ${isCurrent
                      ? "text-indigo-600"
                      : isCompleted
                        ? "text-slate-900"
                        : "text-slate-500"
                    }`}
                >
                  {step.name}
                </p>
                <p className="text-[10px] text-slate-400 hidden xl:block truncate">
                  {step.desc}
                </p>
              </div>
            </>
          );

          return (
            <div
              key={step.id}
              className="flex items-center flex-1 last:flex-none"
            >
              {onSelectStep ? (
                <button
                  type="button"
                  onClick={() => onSelectStep(step.id)}
                  className="flex items-center gap-2.5 lg:gap-3 group cursor-pointer focus:outline-none text-left"
                >
                  {stepBadgeAndText}
                </button>
              ) : (
                <div className="flex items-center gap-2.5 lg:gap-3 text-left">
                  {stepBadgeAndText}
                </div>
              )}

              {/* Connecting Line between steps */}
              {!isLast && (
                <div className="flex-1 mx-2.5 lg:mx-4">
                  <div
                    className={`h-[2px] w-full rounded-full transition-colors duration-300 ${currentStep > step.id ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
