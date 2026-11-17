"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, ArrowRight } from "lucide-react";
import type { BlogPostDataWithCategory } from "@/services/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  post: BlogPostDataWithCategory;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1">
      <div>
        {/* Cover Image */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Category Badge on Image */}
          {post.category?.name && (
            <div className="absolute top-3 left-3 z-10">
              <Badge
                variant="indigo"
                className="bg-white/95 backdrop-blur-xs font-bold text-xs text-indigo-700 shadow-xs border-indigo-100 px-2.5 py-0.5 rounded-full"
              >
                {post.category.name}
              </Badge>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Date & Views */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>{formattedDate}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.views.toLocaleString()}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-slate-900 text-lg leading-snug tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer: Author & Read Link */}
      <div className="p-5 sm:p-6 pt-0 mt-2 border-t border-slate-100/80 flex items-center justify-between gap-3">
        {/* Author info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-9.75 h-9.75 rounded-full overflow-hidden bg-slate-200 shrink-0">
            {post.author_avatar ? (
              <Image
                src={post.author_avatar}
                alt={post.author}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-xs text-slate-600 bg-slate-200">
                {post.author?.charAt(0) || "A"}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-slate-900 truncate leading-tight">
              {post.author}
            </p>
            <p className="text-[11px] text-slate-400 font-medium truncate max-w-[130px] sm:max-w-[160px]">
              {post.author_role}
            </p>
          </div>
        </div>

        {/* Read Button */}
        <Link href={`/blog/${post.slug}`}>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-2 h-auto rounded-lg cursor-pointer group/btn"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </article>
  );
}
