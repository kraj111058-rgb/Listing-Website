import { z } from "zod";

export const step1BasicInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name cannot exceed 100 characters"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .max(100, "Slug cannot exceed 100 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens (e.g. my-business-name)"
    ),
  category: z
    .string()
    .trim()
    .min(1, "Please select a category"),
  shortDescription: z
    .string()
    .trim()
    .min(5, "Short description must be at least 5 characters")
    .max(160, "Short description cannot exceed 160 characters"),
  fullDescription: z
    .string()
    .trim()
    .min(20, "Full description must be at least 20 characters")
    .max(600, "Full description cannot exceed 600 characters"),
  established: z
    .string()
    .trim()
    .min(1, "Year established is required")
    .regex(/^(19|20)\d{2}$/, "Please enter a valid 4-digit year (e.g. 2015)"),
  employees: z
    .string()
    .trim()
    .min(1, "Please select number of employees"),
  gstin: z
    .string()
    .trim()
    .refine(
      (val) => !val || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(val),
      {
        message: "Please enter a valid 15-character GSTIN (e.g. 08AAACR1234F1Z5)",
      }
    )
    .optional(),
  tags: z
    .array(z.string())
    .min(1, "Please add at least 1 keyword/tag")
    .max(20, "Maximum 20 keywords allowed"),
});

export const step2ContactLocationSchema = z.object({
  state: z
    .string()
    .trim()
    .min(1, "Please select a state"),
  city: z
    .string()
    .trim()
    .min(1, "Please select a city"),
  address: z
    .string()
    .trim()
    .min(1, "Full address is required"),
  pincode: z
    .string()
    .trim()
    .min(1, "Pincode is required")
    .regex(/^[0-9]{6}$/, "Please enter a valid 6-digit pincode"),
  latitude: z
    .string()
    .trim()
    .min(1, "Latitude is required")
    .refine((val) => {
        const num = Number(val);
        return !isNaN(num) && num >= -90 && num <= 90 && /^-?\d+(\.\d+)?$/.test(val);
      },
      {
        message: "Please enter a valid latitude between -90 and 90 (e.g. 28.7041)",
      }
    ),
  longitude: z
    .string()
    .trim()
    .min(1, "Longitude is required")
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= -180 && num <= 180 && /^-?\d+(\.\d+)?$/.test(val);
      },
      {
        message: "Please enter a valid longitude between -180 and 180 (e.g. 77.1025)",
      }
    ),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Please enter a valid phone number (at least 10 digits)"),
  secondaryPhone: z
    .string()
    .trim()
    .refine((val) => !val || /^[0-9]{10}$/.test(val), {
      message: "Please enter a valid phone number (at least 10 digits)",
    })
    .optional(),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  website: z
    .string()
    .trim()
    .refine((val) => !val || /^https?:\/\/.+/i.test(val), {
      message: "Please enter a valid website URL (starting with http:// or https://)",
    })
    .optional(),
  is24x7: z.boolean().optional(),
  openTime: z.string().optional(),
  closeTime: z.string().optional(),
  closedDays: z.array(z.string()).optional(),
});

export const step3PhotosSocialSchema = z.object({
  logo: z.string().trim().min(1, "Cover image is required"),
  gallery: z
    .array(z.string())
    .min(1, "Please upload at least 1 gallery photo")
    .max(5, "Maximum 5 gallery photos allowed"),
  whatsapp: z
    .string()
    .trim()
    .refine((val) => !val || /^[0-9]{10}$/.test(val), {
      message: "Please enter a valid Whatsapp number (at least 10 digits)",
    })
    .optional(),
  facebook: z
    .string()
    .trim()
    .refine((val) => !val || /^https?:\/\/.+/i.test(val), {
      message: "Please enter a valid Facebook URL",
    })
    .optional(),
  instagram: z
    .string()
    .trim()
    .refine((val) => !val || /^https?:\/\/.+/i.test(val), {
      message: "Please enter a valid Instagram URL",
    })
    .optional(),
  twitter: z
    .string()
    .trim()
    .refine((val) => !val || /^https?:\/\/.+/i.test(val), {
      message: "Please enter a valid Twitter/X URL",
    })
    .optional(),
  linkedin: z
    .string()
    .trim()
    .refine((val) => !val || /^https?:\/\/.+/i.test(val), {
      message: "Please enter a valid LinkedIn URL",
    })
    .optional(),
  youtube: z
    .string()
    .trim()
    .refine((val) => !val || /^https?:\/\/.+/i.test(val), {
      message: "Please enter a valid YouTube URL",
    })
    .optional(),
});

export const step4SeoDetailsSchema = z.object({
  metaTitle: z
    .string()
    .trim()
    .min(1, "Meta title is required")
    .max(100, "Meta title cannot exceed 100 characters"),
  metaDescription: z
    .string()
    .trim()
    .min(1, "Meta description is required")
    .max(200, "Meta description cannot exceed 200 characters"),
  metaKeywords: z
    .string()
    .trim()
    .min(1, "Meta keywords are required"),
});

export const step5ChoosePlanSchema = z.object({
  selectedPlan: z.enum(["free", "featured", "featured-pro"]),
});

export const listingWizardSchema = step1BasicInfoSchema
  .merge(step2ContactLocationSchema)
  .merge(step3PhotosSocialSchema)
  .merge(step4SeoDetailsSchema)
  .merge(step5ChoosePlanSchema)
  .superRefine((data, ctx) => {
    // If not open 24x7, Daily Opening Time and Closing Time are required
    if (!data.is24x7) {
      if (!data.openTime || !data.openTime.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["openTime"],
          message: "Daily opening time is required",
        });
      }
      if (!data.closeTime || !data.closeTime.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["closeTime"],
          message: "Daily closing time is required",
        });
      }
    }
  });

export type ListingWizardFormValues = z.infer<typeof listingWizardSchema>;

export const stepFieldsMap: Record<number, (keyof ListingWizardFormValues)[]> = {
  1: ["name", "slug", "category", "shortDescription", "fullDescription", "established", "employees", "gstin", "tags"],
  2: ["state", "city", "address", "pincode", "latitude", "longitude", "phone", "secondaryPhone", "email", "website", "is24x7", "openTime", "closeTime", "closedDays"],
  3: ["logo", "gallery", "whatsapp", "facebook", "instagram", "twitter", "linkedin", "youtube"],
  4: ["metaTitle", "metaDescription", "metaKeywords"],
  5: ["selectedPlan"],
};
