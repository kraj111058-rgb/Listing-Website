import { BannerAdInquiryStatus } from "@/enums";
import { supabase, SUPABASE_CONSTANTS } from "@/lib/supabase";
import type { BannerAdInquiryPayload } from "./banner-ads.types";

export const bannerAdsService = {
  // Format Postgres error codes (e.g. 23505 unique pending inquiry)
  formatBannerAdError: (
    error: { code?: string; message: string; details?: string | null },
    payload?: BannerAdInquiryPayload
  ): Error => {
    if (error.code === "23505") {
      const raw = `${error.message} ${error.details || ""}`.toLowerCase();
      if (raw.includes("email")) {
        return new Error(
          payload?.email
            ? `An ad inquiry with email "${payload.email}" is already in progress. Our team will contact you shortly!`
            : "An ad inquiry with this email is already in progress. Our team will contact you shortly!"
        );
      }
      if (raw.includes("mobile")) {
        return new Error(
          payload?.mobile
            ? `An ad inquiry with mobile "${payload.mobile}" is already in progress. Our team will contact you shortly!`
            : "An ad inquiry with this mobile number is already in progress. Our team will contact you shortly!"
        );
      }
      return new Error(
        "You already have a pending ad inquiry in progress. Our team will contact you shortly!"
      );
    }
    return new Error(error.message);
  },

  // Submit banner ad inquiry to Supabase
  submitInquiry: async (payload: BannerAdInquiryPayload): Promise<void> => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.BANNER_AD_INQUIRIES)
      .insert({
        ...payload,
        email: payload.email.trim().toLowerCase(),
        notes: payload.notes?.trim() || null,
        status: BannerAdInquiryStatus.NEW,
      });

    if (error) throw bannerAdsService.formatBannerAdError(error, payload);
  },
};
