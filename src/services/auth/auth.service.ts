import { UserRole, UserStatus } from "@/enums";
import { supabase, SUPABASE_CONSTANTS } from "@/lib/supabase";
import { GMAIL_ONLY_ERROR_MESSAGE, isGmailEmail } from "@/lib/utils";
import type {
  CurrentUserResponse,
  ForgotPasswordPayload,
  SignInPayload,
  SignUpPayload,
  UpdateProfilePayload,
  UserProfileData,
  UserStatusCheckResponse,
} from "./auth.types";

const ensureGmailEmail = (email: string): string => {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) {
    throw new Error("Email address is required.");
  }
  if (!isGmailEmail(cleanEmail)) {
    throw new Error(GMAIL_ONLY_ERROR_MESSAGE);
  }
  return cleanEmail;
};


export const authService = {
  // 1. Sign In with Email & Password
  signIn: async ({ email, password }: SignInPayload) => {
    const cleanEmail = ensureGmailEmail(email);

    // Check account status via RPC first
    const { data: statusData } = await supabase.rpc("check_user_email_status", {
      p_email: cleanEmail,
    });
    const statusCheck = statusData as UserStatusCheckResponse | null;

    if (!statusCheck?.exists) {
      throw new Error("No account found with this email address. Please register first.");
    }

    if (statusCheck.role !== UserRole.USER) {
      throw new Error("Invalid login credentials.");
    }

    if (statusCheck.status === UserStatus.INACTIVE) {
      throw new Error("Your account has been deactivated. Please contact support.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("Unable to authenticate user.");

    // Verify role in public.users - only regular users are allowed on web portal
    const { data: profile } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.USERS)
      .select("role, status")
      .eq("id", data.user.id)
      .single();

    if (profile?.role !== UserRole.USER) {
      await supabase.auth.signOut();
      throw new Error("Invalid login credentials.");
    }

    if (profile?.status === UserStatus.INACTIVE) {
      await supabase.auth.signOut();
      throw new Error("Your account has been deactivated. Please contact support.");
    }

    return data;
  },

  // 2. Sign Up with Email, Mobile & Password
  signUp: async ({ fullName, email, phone, password }: SignUpPayload) => {
    const cleanEmail = ensureGmailEmail(email);
    const cleanPhone = phone.trim();

    // Check if phone number is already registered in public.users
    const { data: existingPhone } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.USERS)
      .select("id")
      .eq("phone", cleanPhone)
      .maybeSingle();

    if (existingPhone) {
      throw new Error("This mobile number is already registered with another account.");
    }

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : undefined;

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          name: fullName.trim(),
          full_name: fullName.trim(),
          phone: cleanPhone,
          role: UserRole.USER,
        },
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return {
      user: data.user,
      session: data.session,
      requiresConfirmation: !data.session,
    };
  },

  // 3. Sign Out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return true;
  },

  // 4. Send Password Reset Email
  forgotPassword: async (payload: ForgotPasswordPayload) => {
    const cleanEmail = ensureGmailEmail(payload.email);

    // Verify account exists & is active in database before proceeding
    const { data: statusData } = await supabase.rpc("check_user_email_status", {
      p_email: cleanEmail,
    });
    const statusCheck = statusData as UserStatusCheckResponse | null;

    if (!statusCheck?.exists || statusCheck?.role !== UserRole.USER) {
      throw new Error("No account found with this email address. Please register first.");
    }

    if (statusCheck?.status === UserStatus.INACTIVE) {
      throw new Error("Your account has been deactivated. Please contact support.");
    }

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback?next=/reset-password`
        : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo,
    });

    if (error) throw new Error(error.message);
    return true;
  },

  // 5. Update Password (after landing on /reset-password)
  resetPassword: async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw new Error(error.message);
    return data;
  },

  // 6. Resend Email Verification Link
  resendVerificationEmail: async (email: string) => {
    const cleanEmail = ensureGmailEmail(email);

    // Verify account exists & is active in database before proceeding
    const { data: statusData } = await supabase.rpc("check_user_email_status", {
      p_email: cleanEmail,
    });
    const statusCheck = statusData as UserStatusCheckResponse | null;

    if (!statusCheck?.exists || statusCheck?.role !== UserRole.USER) {
      throw new Error("No account found with this email address. Please register first.");
    }

    if (statusCheck?.status === UserStatus.INACTIVE) {
      throw new Error("Your account has been deactivated. Please contact support.");
    }

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/callback`
        : undefined;

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: cleanEmail,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) throw new Error(error.message);
    return true;
  },

  // 7. Get Current Authenticated User & Profile (matching Admin getUser structure)
  getCurrentUser: async (): Promise<CurrentUserResponse> => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) return null;

    const { data: profile } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.USERS)
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    return {
      ...user,
      profile: (profile as UserProfileData) || null,
    };
  },

  // 8. Update Current User Profile (Both Supabase Auth Metadata & Public Users Table)
  updateProfile: async (payload: UpdateProfilePayload) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("Not authenticated");

    // 1. Sync Supabase Auth user_metadata so session & JWT stay up to date
    const authMetadata: Record<string, unknown> = {};
    if (payload.name !== undefined) {
      authMetadata.name = payload.name;
      authMetadata.full_name = payload.name;
    }
    if (payload.phone !== undefined) {
      authMetadata.phone = payload.phone;
    }
    if (payload.city !== undefined) {
      authMetadata.city = payload.city;
    }
    if (payload.avatar_url !== undefined) {
      authMetadata.avatar_url = payload.avatar_url;
    }

    if (Object.keys(authMetadata).length > 0) {
      const { error: authError } = await supabase.auth.updateUser({
        data: authMetadata,
      });
      if (authError) throw new Error(authError.message);
    }

    // 2. Update public.users database table
    const { data, error } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.USERS)
      .update({
        ...payload,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  },
};
