import { BannerAdsFormValues } from "@/schemas";
import type { BannerAdInquiryStatus } from "@/enums";

export type BannerAdInquiryPayload = BannerAdsFormValues;

export interface BannerAdInquiryData {
  id: string;
  name: string;
  email: string;
  mobile: string;
  banner_type: string;
  width: string;
  height: string;
  notes?: string | null;
  status: BannerAdInquiryStatus;
  created_at: string;
  updated_at: string;
}

export type BannerAdInquiryResponse = BannerAdInquiryData;
