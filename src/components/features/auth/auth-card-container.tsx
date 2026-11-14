"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface AuthCardContainerProps {
  children: ReactNode;
  maxWidth?: "max-w-md" | "max-w-lg";
}

export function AuthCardContainer({
  children,
  maxWidth = "max-w-lg",
}: AuthCardContainerProps) {
  return (
    <div className={`w-full ${maxWidth} mx-auto flex flex-col items-center`}>
      {/* Centered Brand Logo above Card */}
      <div
        className="inline-flex items-center gap-1.75 group mb-6 text-left select-none"
      >
        <Image
          src="/images/brand-logo-main.svg"
          alt="OneListy"
          width={54}
          height={54}
          className="w-13.5 h-13.5 object-contain mix-blend-multiply"
          priority
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-0.5 leading-none">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              One
            </span>
            <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
              Listy
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-400 tracking-wide">
            India&apos;s Premier Directory
          </span>
        </div>
      </div>

      {/* Main Centered White Floating Card */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-9 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100/90">
        {children}
      </div>
    </div>
  );
}
