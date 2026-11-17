"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPostDataWithCategory } from "@/services/blog";
import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/features/blog/blog-card";

interface BlogDetailRelatedProps {
  posts: BlogPostDataWithCategory[];
  category: string;
}

export function BlogDetailRelated({ posts, category }: BlogDetailRelatedProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 bg-slate-50/70 border-t border-slate-200/70">
      <Container>
        <div className="space-y-8 sm:space-y-10">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Related Articles &amp; Guides
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                More actionable insights from the {category} category
              </p>
            </div>

            <Link href="/blog">
              <Button
                variant="outline"
                className="border-slate-300 text-slate-700 hover:text-indigo-600 hover:bg-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
