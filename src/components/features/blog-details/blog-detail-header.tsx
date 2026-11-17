"use client";

import Link from "next/link";
import { ArrowLeft, Eye, Calendar } from "lucide-react";
import type { BlogPostDataWithCategory } from "@/services/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogDetailHeaderProps {
  post: BlogPostDataWithCategory;
}

export function BlogDetailHeader({ post }: BlogDetailHeaderProps) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  const categoryName = post.category?.name ?? "Article";

  return (
    <div className="space-y-6">
      {/* Top Nav: Back button & Breadcrumbs */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Link href="/blog">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-slate-200 text-slate-700 hover:text-indigo-600 hover:bg-white font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>All Articles</span>
          </Button>
        </Link>

        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-slate-500"
        >
          <Link href="/" className="hover:text-slate-800 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-slate-800 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-indigo-600 truncate max-w-[200px]">
            {categoryName}
          </span>
        </nav>
      </div>

      {/* Badges & Meta info */}
      <div className="flex items-center gap-3 flex-wrap">
        <Badge
          variant="indigo"
          className="font-bold px-3 py-1 rounded-full text-xs"
        >
          {categoryName}
        </Badge>
        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Eye className="w-3.5 h-3.5 text-slate-400" />
          <span>{post.views.toLocaleString()} views</span>
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{formattedDate}</span>
        </span>
      </div>

      {/* Article Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
        {post.title}
      </h1>
    </div>
  );
}
