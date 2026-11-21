"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../auth.service";

export function useResetPassword() {
  return useMutation({
    mutationFn: (password: string) => authService.resetPassword(password),
    onSuccess: () => {
      toast.success("Password updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to reset password");
    },
  });
}
