import { z } from "zod";

export const MAX_PROFILE_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB max
export const ACCEPTED_PROFILE_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
];

export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Full name must be less than 80 characters"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s-]{10,15}$/, "Please enter a valid phone number"),
  avatar: z
    .string()
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
