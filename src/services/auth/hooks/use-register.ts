"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../auth.service";
import { AUTH_QUERY_KEYS } from "../auth-query-keys";
import type { SignUpPayload } from "../auth.types";

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SignUpPayload) => authService.signUp(payload),
    onSuccess: (data) => {
      if (data.session) {
        toast.success("Registration successful!");
        queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.CURRENT_USER });
      } else {
        toast.success("Registration successful! Please check your email to verify your account.");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
