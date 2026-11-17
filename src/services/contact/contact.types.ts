import { ContactFormValues } from "@/schemas";
import type { ContactInquiryStatus } from "@/enums";

export type ContactInquiryPayload = ContactFormValues;

export interface ContactInquiryData {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: ContactInquiryStatus;
  created_at: string;
  updated_at: string;
}

export type ContactInquiryResponse= ContactInquiryData; 