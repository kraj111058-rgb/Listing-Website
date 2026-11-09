"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Building } from "lucide-react";

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
      <Link
        href="/"
        className="inline-flex items-center gap-3 group mb-6 text-left select-none"
      >
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-fuchsia-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform shrink-0">
          <Building className="w-6 h-6" />
        </div>
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
      </Link>

      {/* Main Centered White Floating Card */}
      <div className="w-full bg-white rounded-3xl p-6 sm:p-9 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-100/90">
        {children}
      </div>
    </div>
  );
}
