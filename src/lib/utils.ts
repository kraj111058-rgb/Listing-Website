import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  if (!name) return ""
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const generateSlug = (val: string) => {
  return val
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export function formatDate(
  date: string | Date | null | undefined,
  fallback: string = "-"
): string {
  if (!date) return fallback
  const d = new Date(date)
  if (isNaN(d.getTime())) return fallback
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

export const GMAIL_EMAIL_REGEX = /^[a-z0-9._-]+@gmail\.com$/

export const GMAIL_ONLY_ERROR_MESSAGE = "Please enter a valid Gmail address."

export function isGmailEmail(email: string): boolean {
  return GMAIL_EMAIL_REGEX.test(email.trim().toLowerCase())
}
