import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { contactService } from "../contact.service";
import type { ContactInquiryPayload } from "../contact.types";

export function useContact() {
  return useMutation({
    mutationFn: (payload: ContactInquiryPayload) => contactService.submitInquiry(payload),
    onSuccess: () => {
      toast.success("Thank you! Your message has been sent successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
