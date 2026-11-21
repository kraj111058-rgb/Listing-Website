import type { User } from "@supabase/supabase-js";
import type { UserRole, UserStatus } from "@/enums";
import { ForgotPasswordFormValues, LoginFormValues, ResetPasswordFormValues } from "@/schemas";

export interface UserProfileData {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  status: UserStatus;
  city: string | null;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export type CurrentUserResponse = (User & { profile: UserProfileData | null }) | null;

export type SignInPayload = LoginFormValues;

export interface SignUpPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export type ForgotPasswordPayload = ForgotPasswordFormValues;

export type ResetPasswordPayload = ResetPasswordFormValues; // only password

export interface AuthActionResult {
  success: boolean;
  message?: string;
  requiresEmailConfirmation?: boolean;
}

export interface UserStatusCheckResponse {
  exists: boolean;
  status: UserStatus | null;
  role: UserRole | null;
}

export interface UpdateProfilePayload {
  name?: string;
  phone?: string | null;
  city?: string | null;
  avatar_url?: string | null;
}
