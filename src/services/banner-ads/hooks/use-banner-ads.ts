import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { bannerAdsService } from "../banner-ads.service";
import type { BannerAdInquiryPayload } from "../banner-ads.types";

export function useBannerAds() {
  return useMutation({
    mutationFn: (payload: BannerAdInquiryPayload) => bannerAdsService.submitInquiry(payload),
    onSuccess: () => {
      toast.success("Thank you! Your banner ad inquiry has been submitted successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
