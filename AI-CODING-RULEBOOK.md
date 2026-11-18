# Listing-Web — AI Coding Rulebook & Architectural Standard

> **Single Source of Truth** for architectural patterns, coding standards, Next.js 16 App Router conventions, Supabase API communication, TanStack Query management, and file conventions in this project.
> Any AI assistant or developer working on new or existing website features **MUST** strictly follow these rules to ensure zero dead code, consistent structure, robust error handling, flawless SEO, and optimal performance.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Layered Architecture & Directory Structure](#2-layered-architecture--directory-structure)
3. [Next.js 16 App Router & React 19 Standards](#3-nextjs-16-app-router--react-19-standards)
4. [Service Layer & Supabase API Rules](#4-service-layer--supabase-api-rules)
5. [TanStack Query (Hooks) Pattern](#5-tanstack-query-hooks-pattern)
6. [Form Handling & UI Patterns](#6-form-handling--ui-patterns)
7. [Types, Schemas & Enums](#7-types-schemas--enums)
8. [Supabase Storage & File Upload Pattern](#8-supabase-storage--file-upload-pattern)
9. [What NOT to Do (Strict DON'Ts)](#9-what-not-to-do-strict-donts)
10. [What to Do (Strict DOs)](#10-what-to-do-strict-dos)

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript (Strict mode enabled) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS v4 + `clsx` / `tailwind-merge` (`cn` helper) |
| **Component Primitives** | Base UI (`@base-ui/react`) + Shadcn + `cva` |
| **Icons** | Lucide React |
| **Backend & DB** | Supabase (`@supabase/supabase-js`, `@supabase/ssr`) |
| **Server State & Cache** | TanStack Query v5 (`@tanstack/react-query`) |
| **Form Handling** | React Hook Form |
| **Validation** | Zod (`@hookform/resolvers/zod`) |
| **Notifications** | Sonner (`toast` via `@/components/ui/sonner`) |

---

## 2. Layered Architecture & Directory Structure

Every feature module on the website strictly follows this layered flow:

```
App Router Page (src/app/)
  └── Feature Component (src/components/features/<domain>/)
        └── Custom Query / Mutation Hook (src/services/<domain>/hooks/)
              └── Service Layer (src/services/<domain>/<domain>.service.ts)
                    └── Supabase Client (src/lib/supabase/)
                          └── PostgreSQL Database / Supabase Storage
```

### Route Groups in `src/app/`:
- **`src/app/(public)/`**: Publicly accessible pages (`about`, `advertise`, `blog`, `categories`, `contact`, `featured`, `listings`, `privacy`, `terms`).
- **`src/app/(auth)/`**: Authentication pages (`login`, `register`, `forgot-password`, `reset-password`).
- **`src/app/(private)/dashboard/`**: User dashboard pages (`my-listings`, `create-listing`, `edit-listing`, `inquiries`, `customer-reviews`, `profile`, `my-plans`, `notifications`).

### Directory Layout:
```
src/
├── app/                       # Next.js App Router pages and route groups
├── components/
│   ├── common/                # Shared reusable components (AppPagination, Loader, InputWithLabel, etc.)
│   ├── features/              # Domain-specific UI features (blog, contact, auth, listings, etc.)
│   ├── layout/                # Layout components (Header, Footer, Navigation)
│   └── ui/                    # Base UI primitives (button, badge, dialog, sonner, etc.)
├── enums/                     # Central TypeScript enums (status, roles)
├── hooks/                     # Reusable general hooks (useDebounce)
├── lib/
│   ├── react-query/           # Query client configuration
│   ├── supabase/              # Browser client, server client, and SUPABASE_CONSTANTS
│   └── utils.ts               # Formatting, cn() helper
├── providers/                 # React Query Provider, Theme Provider
├── schemas/                   # Zod schemas for forms and validations
├── services/                  # Domain service layer (src/services/<domain>/)
└── types/                     # Shared TypeScript interfaces (PaginatedResponse, PaginationParams)
```

### Barrel Export Standards:
Every domain in `src/services/<domain>/` must have an `index.ts` re-exporting its service, types, and hooks. The top-level `src/services/index.ts` re-exports all domains:
```typescript
// src/services/contact/index.ts
export * from "./contact.service";
export * from "./contact.types";
export * from "./hooks";

// src/services/index.ts
export * from "./blog";
export * from "./contact";
```
Components must import from the clean barrel path: `import { useContact } from "@/services";`.

---

## 3. Next.js 16 App Router & React 19 Standards

### 1. Client vs. Server Component Boundaries
* **Server Components (Default)**: Keep Page components (`page.tsx`) as Server Components whenever possible to maximize SEO, enable metadata generation, and reduce client bundle sizes.
* **Client Components (`"use client";`)**: Add `"use client";` at Line 1 for any component that uses:
  * React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)
  * Form Hooks (`useForm`, `useFormContext`)
  * TanStack Query Hooks (`useQuery`, `useMutation`)
  * Browser events (`onClick`, `onChange`, `onSubmit`)
  * Interactive components (modals, dropdowns, carousels)
* **Never Mix**: Never import server-only Supabase functions (`@/lib/supabase/server`, `cookies()`, `headers()`) inside `"use client"` components.

### 2. Next.js 16 Dynamic Route Params (`await params`)
In Next.js 16+, `params` and `searchParams` in Page components and `generateMetadata` are **Promises**. You **MUST** `await` them:
```typescript
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlog(slug);
  ...
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) notFound();
  ...
}
```

### 3. SEO & Structured Data (JSON-LD)
* Dynamic detail pages (blog posts, listings) must implement `generateMetadata()` with title, meta description, OpenGraph, Twitter card, and canonical URL.
* Use React `cache()` to deduplicate database calls between `generateMetadata()` and the Page component:
  ```typescript
  import { cache } from "react";

  const getBlog = cache(async (slug: string) => {
    return await blogService.getBlogBySlug(slug);
  });
  ```
* Include Schema.org JSON-LD structured data for article/listing pages:
  ```tsx
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
  ```

### 4. 404 / Not Found Handling
When a record cannot be found by slug or ID in a server page, invoke `notFound()` from `"next/navigation"`. Never show an empty or broken page.

---

## 4. Service Layer & Supabase API Rules

All database communication lives strictly in `src/services/<domain>/<domain>.service.ts`.

### 1. Public `anon` INSERT Rule (Strictly NO `.select().single()`)
* When an unauthenticated visitor submits a public form (Contact Us, Banner Ad Inquiry, Listing Inquiry, Newsletter):
  * **NEVER** append `.select().single()` to the `.insert()` call.
  * `.select()` asks Postgres to return row data (`RETURNING *`), triggering an implicit `SELECT` permission check. If RLS only grants `INSERT` to the `anon` role, Postgres throws:
    `ERROR: 42501: new row violates row-level security policy for table "..."`.
  * **Correct Pattern**:
    ```typescript
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
    ```

### 2. Public Data Integrity (Published / Active Records Only)
The public website must never display draft, archived, or inactive content. Always filter queries with `.eq("status", ...)`:
* Blogs: `.eq("status", BlogStatus.PUBLISHED)`
* Categories: `.eq("status", BlogCategoryStatus.ACTIVE)`
* Listings: `.eq("status", "Active")`

### 3. Detail Queries by Slug: Use `.maybeSingle()`
Always use `.maybeSingle()` instead of `.single()` when querying by slug:
```typescript
const { data, error } = await supabase
  .from(SUPABASE_CONSTANTS.DB_TABLES.BLOGS)
  .select("*, category:category_id (*)")
  .eq("slug", slug)
  .eq("status", BlogStatus.PUBLISHED)
  .maybeSingle();

if (error) throw new Error(error.message);
return data; // Returns null if not found, allowing clean notFound() handling
```

### 4. Server-Side Pagination, Ordering & Search Sanitization
* Compute server-side ranges: `from = (page - 1) * pageLimit`, `to = from + pageLimit - 1`.
* Always sanitize search strings before passing to PostgREST `.or(...)` to remove characters that break PostgREST syntax (commas, parentheses):
  ```typescript
  if (search) {
    const cleanSearch = search.replace(/[,()]/g, "").trim();
    if (cleanSearch) {
      query = query.or(`title.ilike.%${cleanSearch}%,excerpt.ilike.%${cleanSearch}%`);
    }
  }
  ```
* Always order by date descending: `.order("published_at", { ascending: false })` or `.order("created_at", { ascending: false })`.
* Return a standardized `PaginatedResponse<T>` (`{ data, total, page, pageLimit, totalPages }`).

### 5. Postgres Error Code 23505 Translation
Catch Postgres code `23505` (unique constraint violation) and format user-friendly feedback:
```typescript
formatContactError: (
  error: { code?: string; message: string; details?: string | null },
  payload?: ContactInquiryPayload
): Error => {
  if (error.code === "23505") {
    const raw = `${error.message} ${error.details || ""}`.toLowerCase();
    if (raw.includes("email")) {
      return new Error(`An inquiry with email "${payload?.email}" is already in progress. Our team will contact you shortly!`);
    }
    if (raw.includes("phone")) {
      return new Error(`An inquiry with phone "${payload?.phone}" is already in progress. Our team will contact you shortly!`);
    }
    return new Error("You already have an active inquiry. Our team will contact you shortly!");
  }
  return new Error(error.message);
}
```

### 6. Central Constants
Always reference tables and storage buckets/folders via `SUPABASE_CONSTANTS` in `@/lib/supabase`:
`SUPABASE_CONSTANTS.DB_TABLES.CONTACT_INQUIRIES`, `SUPABASE_CONSTANTS.STORAGE.FOLDERS.*`.

---

## 5. TanStack Query (Hooks) Pattern

All website React Query hooks live in `src/services/<domain>/hooks/`.

### 1. Central Query Keys Object
```typescript
export const BLOG_QUERY_KEYS = {
  all: ["blogs"] as const,
  list: (params?: BlogPostQueryParams) => [...BLOG_QUERY_KEYS.all, "list", params] as const,
  categories: () => [...BLOG_QUERY_KEYS.all, "categories"] as const,
  detail: (slug: string) => [...BLOG_QUERY_KEYS.all, "detail", slug] as const,
} as const;
```

### 2. Automatic Toast Notifications Inside Mutation Hooks
Mutation hooks own user feedback using `sonner`:
```typescript
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
```
**NEVER** duplicate `toast.success` or `toast.error` calls inside components.

### 3. Cache Duration (`staleTime`)
* Public lists: `staleTime: 1000 * 60 * 2` (2 minutes).
* Categories/Options: `staleTime: 1000 * 60 * 10` (10 minutes).
* Details: `staleTime: 1000 * 60 * 5` (5 minutes).

---

## 6. Form Handling & UI Patterns

### 1. Form Setup Standard
Use `useForm` with `zodResolver`, `Controller`, and explicit default values:
```tsx
const {
  control,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm<ContactFormValues>({
  resolver: zodResolver(contactFormSchema),
  defaultValues: {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  },
});
```

### 2. Submit Button & Common Loader Standard
* Derive `isPending` directly from the mutation hook:
  ```typescript
  const { mutate: submitForm, isPending } = useContact();
  ```
* Disable all inputs, textareas, dropdowns, and the submit button while `isPending` is true.
* The submit button must render `<Loader inline size="sm" />` when submitting:
  ```tsx
  <Button
    type="submit"
    disabled={isPending}
    className="cursor-pointer font-semibold"
  >
    {isPending ? (
      <>
        <Loader inline size="sm" />
        <span>Sending...</span>
      </>
    ) : (
      <>
        <Send size={16} />
        <span>Send Message</span>
      </>
    )}
  </Button>
  ```
* Reset form fields strictly in `onSuccess`:
  ```typescript
  const onSubmit = (data: ContactFormValues) => {
    submitForm(data, {
      onSuccess: () => {
        reset();
      },
    });
  };
  ```

### 3. Reusable Form Components
Always reuse common input components from `@/components/common`:
* `InputWithLabel`
* `SelectWithLabel`
* `TextareaWithLabel`
* `FieldWrapper`
* `ImageUpload` / `GalleryUpload`

### 4. Search Debouncing & Pagination Flow
* Always debounce search inputs using `useDebounce(query.trim(), 400)`.
* Always reset `currentPage` to `1` when search query or category/filter tab changes:
  ```typescript
  const handleCategorySelect = (id: string) => {
    setActiveCategoryId(id);
    setCurrentPage(1);
  };
  ```
* Use `AppPagination` from `@/components/common/app-pagination`:
  ```tsx
  <AppPagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
  />
  ```

### 5. Skeleton Loading & Empty States
* Provide realistic skeleton components (e.g. `BlogCardSkeleton`, `ListingCardSkeleton`) during `isLoading`.
* When `data.length === 0`, display a structured empty state with an icon, descriptive heading, helper text, and a "Reset Filters" action button.

---

## 7. Types, Schemas & Enums

### 1. Central Enums
* Define domain enums in `src/enums/<domain>.enum.ts` and re-export in `src/enums/index.ts`.
* Always use enums (e.g. `ContactInquiryStatus.NEW`, `BlogStatus.PUBLISHED`) instead of raw string literals.

### 2. Zod Schemas as Single Source of Truth
* All form schemas belong in `src/schemas/<domain>-form.schema.ts` and re-export in `src/schemas/index.ts`.
* Infer form types with `z.infer<typeof schema>`.

### 3. DRY TypeScript Definitions
* Use TypeScript utility types (`Omit`, `Partial`) to derive payload types from entity types.
* Standard paginated responses must use `PaginatedResponse<T>` from `src/types/common.types.ts`.

---

## 8. Supabase Storage & File Upload Pattern

### 1. Upload ONLY on Form Submit
* **NEVER** upload images to Supabase Storage on file picker change.
* Keep the `File` object in local state (`useState<File | null>(null)`).
* Upload strictly during `onSubmit` after form validation passes.

### 2. Storage Cleanup
* When users edit an entity and replace or remove an existing image, delete the old file from Supabase Storage.
* When deleting an entity, delete any attached image files from storage.

---

## 9. What NOT to Do (Strict DON'Ts)

1. **Don't use `.insert({...}).select().single()` on public `anon` forms** — this causes RLS permission error `42501`. Use plain `.insert({...})`.
2. **Don't forget `"use client";`** on components using React hooks, forms, or browser events.
3. **Don't access `params` synchronously in Next.js 16** — `params` is a Promise; always `await params`.
4. **Don't expose draft, rejected, or inactive content** — always filter public queries with `.eq("status", ...)`.
5. **Don't use `.single()` for slug lookups** — use `.maybeSingle()` so non-existent records return `null` and trigger `notFound()`.
6. **Don't create manual `useState(false)` loading flags** — derive `isPending` directly from TanStack Query mutations.
7. **Don't wrap mutation calls in nested `try/catch` or use `console.error`** inside components — hooks handle toasts.
8. **Don't duplicate `toast.success` or `toast.error`** inside components.
9. **Don't upload files on file picker select** — hold `File` in state and upload strictly on submit.
10. **Don't leave mock submit handlers (`_data`)** or fake `setTimeout` logic in production forms.
11. **Don't pass un-sanitized search queries** to PostgREST — always clean search inputs with `replace(/[,()]/g, "").trim()`.
12. **Don't use raw string literals for statuses** — always use central TypeScript enums.
13. **Don't import server-only Supabase clients into client components**.
14. **Don't re-invent custom loaders or inputs** — use common `Loader`, `InputWithLabel`, etc.
15. **Don't leave `console.log` or unused imports** in any file.
16. **Don't create redundant intermediate mapping objects** — consume query responses directly in JSX (`data.map(...)`) to keep code clean and concise.
17. **Don't leave legacy mock data in `src/data/`** — purge or deprecate mock arrays immediately when a module is migrated to Supabase.
18. **Don't alter visual styling during dynamic integration** — preserve 100% of original Tailwind classes, font sizes, colors, and layout (Zero Visual Regression).

---

## 10. What to Do (Strict DOs)

1. **Do follow the Layered Architecture**: `Page` ➔ `Feature Component` ➔ `Custom Hook` ➔ `Service Layer` ➔ `Supabase`.
2. **Do export through barrel `index.ts` files** for clean, organized imports.
3. **Do place all domain services and hooks in `src/services/<domain>/`**.
4. **Do use `<Loader inline size="sm" />`** in submit buttons during `isPending`.
5. **Do disable all inputs and the submit button** while `isPending` is true.
6. **Do reset form fields strictly inside `onSuccess`**.
7. **Do debounce search inputs** with `useDebounce(query, 400)` and reset to page 1 on filter/search change.
8. **Do use `cache()` from `"react"`** to deduplicate database queries between `generateMetadata` and `Page`.
9. **Do handle SEO properly** with dynamic metadata and Schema.org JSON-LD structured data.
10. **Do use `AppPagination`** with `currentPage`, `totalPages`, and `onPageChange`.
11. **Do provide skeleton loaders** during loading and structured empty states on zero results.
12. **Do catch Postgres code `23505`** and format user-friendly duplicate error messages.
13. **Do verify with `node ./node_modules/typescript/bin/tsc --noEmit`** before declaring any task complete.
14. **Do consume query data directly in JSX** without redundant intermediate transformation arrays.
15. **Do purge migrated mock data immediately** from `src/data/` adhering to the Zero Dead Code Policy.
16. **Do preserve 100% of original Tailwind classes** and styling when converting static UI to dynamic data.
