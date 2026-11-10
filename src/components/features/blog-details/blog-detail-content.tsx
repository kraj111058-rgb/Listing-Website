"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Plus,
  ArrowRight,
  CheckCircle2,
  Lightbulb
} from "lucide-react";
import { BlogPost } from "@/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogDetailContentProps {
  post: BlogPost;
}

export function BlogDetailContent({ post }: BlogDetailContentProps) {
  return (
    <article className="space-y-10">
      {/* 1. Lead Highlight Quote */}
      <div className="p-6 sm:p-7 rounded-2xl bg-indigo-50/60 border-l-4 border-indigo-600 text-slate-800 text-lg sm:text-xl font-medium leading-relaxed italic">
        &ldquo;{post.excerpt}&rdquo;
      </div>

      {/* 2. Article Paragraphs */}
      <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
        {post.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* 3. Key Takeaways Box */}
      <div className="rounded-3xl p-6 sm:p-8 bg-slate-50 border border-slate-200/80 space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-700">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
          <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">
            Key Takeaways from This Guide
          </h3>
        </div>
        <ul className="space-y-3 text-sm sm:text-base text-slate-600">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>Keep your business Name, Address, and Phone number (NAP) 100% consistent across every directory.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>High DA directory listings grant valuable do-follow backlinks that enhance Google domain authority.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>Complete profiles with photos and working hours receive 3.5x higher conversion rates from local buyers.</span>
          </li>
        </ul>
      </div>

      {/* 4. In-Article Free Business Listing CTA */}
      <div className="my-10 p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-bold border border-white/15">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Free Forever • No Credit Card Required</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
            Ready to Get Your Business Listed in India?
          </h3>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
            Join 5,000+ local businesses. Complete instant OTP registration, gain a free do-follow backlink, and get discovered by thousands of customers.
          </p>

          <div className="pt-2 flex items-center gap-3.5 flex-wrap">
            <Link href="/listings/create">
              <Button
                className="bg-gradient-to-r from-indigo-500 to-fuchsia-600 hover:from-indigo-600 hover:to-fuchsia-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 cursor-pointer border-0"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                <span>Submit Your Free Listing</span>
              </Button>
            </Link>

            <Link href="/featured">
              <Button
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white/20 font-bold text-sm px-5 py-3 rounded-xl cursor-pointer"
              >
                <span>Explore Featured</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 5. Tags Cloud */}
      <div className="pt-6 border-t border-slate-100 flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-slate-400 mr-1">Tags:</span>
        {post.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-indigo-600 font-semibold text-xs px-3 py-1 rounded-lg border-slate-200 transition-colors"
          >
            #{tag}
          </Badge>
        ))}
      </div>

      {/* 6. Author Bio Box */}
      <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-slate-200 ring-2 ring-indigo-100 shrink-0 shadow-xs">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">
                {post.author.name}
              </h4>
              <Badge variant="indigo" className="text-xs font-bold px-2.5 py-0.5 rounded-full">
                Author
              </Badge>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-indigo-600 mt-1">
              {post.author.role}
            </p>
          </div>
        </div>

        {/* Author Social Media Links */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Link
            href={post.author.socialLinks?.instagram || "https://instagram.com"}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 flex items-center justify-center text-white shadow-2xs transition-all hover:scale-110"
          >
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </Link>

          <Link
            href={post.author.socialLinks?.facebook || "https://facebook.com"}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            className="w-8 h-8 rounded-full bg-[#1877F2] hover:bg-[#0c63d4] flex items-center justify-center text-white shadow-2xs transition-all hover:scale-110"
          >
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </Link>

          <Link
            href={post.author.socialLinks?.twitter || "https://twitter.com"}
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
            className="w-8 h-8 rounded-full bg-[#1DA1F2] hover:bg-[#0c85d0] flex items-center justify-center text-white shadow-2xs transition-all hover:scale-110"
          >
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>

          <Link
            href={post.author.socialLinks?.linkedin || "https://linkedin.com"}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="w-8 h-8 rounded-full bg-[#0A66C2] hover:bg-[#084e96] flex items-center justify-center text-white shadow-2xs transition-all hover:scale-110"
          >
            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Optional Author About / Bio */}
      {(post.author.about) && (
        <div className="pt-3.5 border-t border-slate-200/80 space-y-1.5">
          <h5 className="text-sm md:text-base font-semibold text-slate-900 tracking-tight">
            About
          </h5>
          <p className="text-sm leading-relaxed text-slate-600 font-normal">
            {post.author.about}
          </p>
        </div>
      )}
    </div>
    </article>
  );
}
