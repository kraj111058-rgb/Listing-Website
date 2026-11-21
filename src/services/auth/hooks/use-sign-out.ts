"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../auth.service";
import { AUTH_QUERY_KEYS } from "../auth-query-keys";

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      toast.success("Signed out successfully.");
      queryClient.setQueryData(AUTH_QUERY_KEYS.CURRENT_USER, null);
      queryClient.invalidateQueries();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
