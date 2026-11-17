"use client";

import { type ReactNode } from "react";
import { ReactQueryProvider } from "@/providers/react-query-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      {children}
    </ReactQueryProvider>
  );
}
