"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { queryClient as initialQueryClient } from "@/lib/react-query/react-query-client";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => initialQueryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}
