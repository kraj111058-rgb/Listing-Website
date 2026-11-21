"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../auth.service";

export function useResendVerification() {
  return useMutation({
    mutationFn: (email: string) => authService.resendVerificationEmail(email),
    onSuccess: () => {
      toast.success("Verification link sent! Please check your email.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to resend verification email");
    },
  });
}
