"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../auth.service";
import { AUTH_QUERY_KEYS } from "../auth-query-keys";
import type { SignInPayload } from "../auth.types";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: SignInPayload) => authService.signIn(credentials),
    onSuccess: () => {
      toast.success("Welcome back! Login successful.");
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.CURRENT_USER });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
