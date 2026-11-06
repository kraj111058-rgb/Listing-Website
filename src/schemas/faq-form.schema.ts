import { z } from "zod";

export const faqFormSchema = z.object({
  listingId: z.string().min(1, "Please select a business listing."),
  question: z
    .string()
    .trim()
    .min(5, "Question must be at least 5 characters.")
    .max(150, "Question cannot exceed 150 characters."),
  answer: z
    .string()
    .trim()
    .min(10, "Answer must be at least 10 characters.") 
    .max(600, "Answer cannot exceed 600 characters."),
  isActive: z.boolean(),
});

export type FaqFormValues = z.infer<typeof faqFormSchema>;
