# AGENTS.md — AI Agent Guidelines for Listing-Web

This file provides critical guidance and operational rules for AI assistants (Antigravity, Claude Code, Cursor, Copilot) working in this repository.

---

## 1. Single Source of Truth

Before creating new pages, implementing website features, creating forms, or writing Supabase queries, you **MUST** read and strictly follow:
👉 **[`AI-CODING-RULEBOOK.md`](./AI-CODING-RULEBOOK.md)**

It defines the exact architectural patterns, Next.js 16 App Router standards, client vs. server component rules, public Supabase query conventions, form workflows, and zero-dead-code rules for `Listing-Web`.

---

## 2. Essential Commands

```bash
# Start development server
npm run dev

# Run TypeScript type check (Run this before declaring any task complete)
node ./node_modules/typescript/bin/tsc --noEmit

# Run ESLint
npm run lint

# Run Next.js production build check
npm run build
```

---

## 3. Communication & User Workflow Guidelines

1. **User Communication Language**: Respond to the user in **Gujarati** unless requested otherwise.
2. **Permission Boundary**: Always explain planned modifications and get user confirmation before touching or editing project files (*"mne pucha vagar kai nay karto"*).
3. **Verification**: Always run `tsc --noEmit` to verify that no TypeScript errors or broken imports are introduced.

---

## 4. Architectural Quick Reference

```
Next.js App Router (src/app/)
  └── Server / Client Page (page.tsx)
        └── Feature Component (src/components/features/<domain>/)
              └── Custom TanStack Hook (src/services/<domain>/hooks/)
                    └── Service Layer (src/services/<domain>/<domain>.service.ts)
                          └── Supabase Client (src/lib/supabase/)
                                └── PostgreSQL Database / Supabase Storage
```

### Golden Rules for Website:
- **Client vs Server Boundary**: Add `"use client";` at Line 1 for all interactive components, forms, hooks, and modals. Never import server-only Supabase clients into `"use client"` components.
- **Next.js 16 Promise Params**: Route `params` in pages and `generateMetadata` is a Promise — always `await params`.
- **Public `anon` INSERT Rule**: NEVER use `.insert({...}).select().single()` on public forms (contact, inquiries). Use plain `.insert({...})` to prevent RLS `42501` errors.
- **Published / Active Data Only**: Always filter public fetches with `.eq("status", ...)` (e.g., `BlogStatus.PUBLISHED`, `BlogCategoryStatus.ACTIVE`) so draft/archived data never leaks to visitors.
- **Use `.maybeSingle()` for Slugs**: Use `.maybeSingle()` instead of `.single()` on slug detail fetches to handle non-existent records gracefully with `notFound()`.
- **Domain Service Structure**: Place all services and query hooks in `src/services/<domain>/` with clean barrel re-exports in `src/services/index.ts`.
- **Common Loader on Submit**: Use `<Loader inline size="sm" /> <span>Sending...</span>` on submit buttons when `isPending` is true.
- **No Manual Loading Flags**: Derive `isPending` directly from TanStack Query mutations.
- **No Nested Try/Catch in Components**: Let custom hooks handle toasts and use `onSuccess` for callbacks and `reset()`.
- **Search Sanitization**: Sanitize search inputs with `.replace(/[,()]/g, "").trim()` before passing to PostgREST `.or(...)`.
- **Search Debounce & Page Reset**: Debounce search with `useDebounce(query, 400)` and reset to page 1 on filter/search change.
- **Duplicate Error Handling**: Catch Postgres code `23505` in services and format friendly user messages for active inquiries or duplicate records.
- **Upload Storage ONLY on Submit**: Hold `File` in state, upload strictly on form submission, and clean up orphan files.
- **Zero Console.log & Zero Dead Code**: Remove all debugging statements, mock submit handlers, and unused imports before completing tasks.
