import { z } from "zod";
import { GMAIL_ONLY_ERROR_MESSAGE, isGmailEmail } from "@/lib/utils";

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
    .refine(isGmailEmail, GMAIL_ONLY_ERROR_MESSAGE),
  password: z
    .string()
    .min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
