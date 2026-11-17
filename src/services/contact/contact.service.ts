import { ContactInquiryStatus } from "@/enums";
import { supabase, SUPABASE_CONSTANTS } from "@/lib/supabase";
import type { ContactInquiryPayload } from "./contact.types";

export const contactService = {
  // Format Postgres error codes (e.g. 23505 unique pending inquiry)
  formatContactError: (
    error: { code?: string; message: string; details?: string | null },
    payload?: ContactInquiryPayload
  ): Error => {
    if (error.code === "23505") {
      const raw = `${error.message} ${error.details || ""}`.toLowerCase();
      if (raw.includes("email")) {
        return new Error(
          payload?.email
            ? `An inquiry with email "${payload.email}" is already in progress. Our team will contact you shortly!`
            : "An inquiry with this email is already in progress. Our team will contact you shortly!"
        );
      }
      if (raw.includes("phone")) {
        return new Error(
          payload?.phone
            ? `An inquiry with phone "${payload.phone}" is already in progress. Our team will contact you shortly!`
            : "An inquiry with this phone number is already in progress. Our team will contact you shortly!"
        );
      }
      return new Error("You already have an inquiry in progress. Our team will contact you shortly!");
    }
    return new Error(error.message);
  },

  // Submit inquiry to Supabase
  submitInquiry: async (payload: ContactInquiryPayload): Promise<void> => {
    const { error } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.CONTACT_INQUIRIES)
      .insert({
        ...payload,
        email: payload.email.trim().toLowerCase(),
        status: ContactInquiryStatus.NEW,
      });

    if (error) throw contactService.formatContactError(error, payload);
  },
};
