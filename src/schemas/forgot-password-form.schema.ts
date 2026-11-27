import { z } from "zod";
import { GMAIL_ONLY_ERROR_MESSAGE, isGmailEmail } from "@/lib/utils";

export const forgotPasswordFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
    .refine(isGmailEmail, GMAIL_ONLY_ERROR_MESSAGE),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>;
