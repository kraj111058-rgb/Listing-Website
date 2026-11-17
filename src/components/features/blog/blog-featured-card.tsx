"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, ArrowRight } from "lucide-react";
import type { BlogPostDataWithCategory } from "@/services/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogFeaturedCardProps {
  post: BlogPostDataWithCategory;
}

export function BlogFeaturedCard({ post }: BlogFeaturedCardProps) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <article className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.07)] hover:shadow-lg transition-all duration-300 group">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Featured Image */}
        <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] overflow-hidden bg-slate-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:hidden" />
        </div>

        {/* Right: Content details */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          <div className="space-y-4">
            {/* Meta Row: Category + Views */}
            <div className="flex items-center gap-3 flex-wrap text-xs font-semibold text-slate-500">
              {post.category?.name && (
                <Badge
                  variant="indigo"
                  className="font-bold px-2.5 py-0.5 rounded-full"
                >
                  {post.category.name}
                </Badge>
              )}
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>{post.views.toLocaleString()} views</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>

            {/* Excerpt */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            {/* Tags preview */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Row: Author + CTA Button */}
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-200 ring-2 ring-indigo-50 shrink-0">
                {post.author_avatar ? (
                  <Image
                    src={post.author_avatar}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-sm text-slate-600 bg-slate-200">
                    {post.author?.charAt(0) || "A"}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-tight">
                  {post.author}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {formattedDate}
                </p>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <Button
                variant="default"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-md shadow-indigo-600/20 group/btn cursor-pointer"
              >
                <span>Read</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
