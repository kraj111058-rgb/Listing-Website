"use client";

import { useQuery } from "@tanstack/react-query";
import { AUTH_QUERY_KEYS } from "../auth-query-keys";
import { authService } from "../auth.service";
import type { CurrentUserResponse } from "../auth.types";

export function useCurrentUser() {
  return useQuery<CurrentUserResponse>({
    queryKey: AUTH_QUERY_KEYS.CURRENT_USER,
    queryFn: authService.getCurrentUser,
    staleTime: 1000 * 60 * 10, // 10 minutes cache to avoid excessive refetching
    retry: false,
  });
}
