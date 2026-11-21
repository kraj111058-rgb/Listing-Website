"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "../auth.service";
import { AUTH_QUERY_KEYS } from "../auth-query-keys";
import type { UpdateProfilePayload } from "../auth.types";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => authService.updateProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.CURRENT_USER });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile.");
    },
  });
}
