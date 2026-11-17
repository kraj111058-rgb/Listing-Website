"use client";

import { Container } from "@/components/common";
import { Button } from "@/components/ui/button";
import type { BlogPostDataWithCategory } from "@/services/blog";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { BlogDetailContent } from "./blog-detail-content";
import { BlogDetailHeader } from "./blog-detail-header";
import { BlogDetailHeroImage } from "./blog-detail-hero-image";
import { BlogDetailRelated } from "./blog-detail-related";
import { BlogDetailSidebar } from "./blog-detail-sidebar";

interface BlogDetailViewProps {
  post: BlogPostDataWithCategory | null;
  relatedPosts: BlogPostDataWithCategory[];
}

export function BlogDetailView({ post, relatedPosts }: BlogDetailViewProps) {
  if (!post) {
    return (
      <div className="py-24 bg-white text-center">
        <Container>
          <div className="max-w-md mx-auto space-y-5 bg-slate-50 p-10 rounded-3xl border border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Article Not Found
            </h1>
            <p className="text-slate-500 text-sm">
              The article you are looking for does not exist or has been moved.
            </p>
            <Link href="/blog">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to All Articles</span>
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  const categoryName = post.category?.name ?? "General";

  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. Header Section */}
      <section className="py-10 sm:py-14 bg-slate-50 border-b border-slate-200/70">
        <Container>
          <BlogDetailHeader post={post} />
        </Container>
      </section>

      {/* 2. Hero Image Section */}
      <section className="py-8 sm:py-10 bg-white">
        <Container>
          <BlogDetailHeroImage post={post} />
        </Container>
      </section>

      {/* 3. Main Content & Right Sidebar Grid */}
      <section className="pb-16 sm:pb-20 bg-white">
        <Container>
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            {/* Left Content Column */}
            <main className="w-full lg:w-[68%] min-w-0">
              <BlogDetailContent post={post} />
            </main>

            {/* Right Sidebar Column */}
            <aside className="w-full lg:w-[32%] lg:sticky lg:top-24">
              <BlogDetailSidebar currentSlug={post.slug} />
            </aside>
          </div>
        </Container>
      </section>

      {/* 4. Related Articles Section */}
      <BlogDetailRelated posts={relatedPosts} category={categoryName} />
    </div>
  );
}
