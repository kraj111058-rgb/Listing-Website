import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ScrollToTop } from "@/components/common";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Business Listing Sites in India — Free Business Directory | IndianListingBucket",
  description: "Find & list local businesses across India. Browse verified business listings, reviews & ratings. India's most trusted free business listing website covering 500+ cities.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={cn("antialiased", plusJakartaSans.variable, sora.variable, "font-sans")}
    >
      <body className="min-h-screen bg-white text-slate-900">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}