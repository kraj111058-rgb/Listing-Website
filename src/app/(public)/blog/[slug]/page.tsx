import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogService } from "@/services/blog";
import { BlogDetailView } from "@/components/features/blog-details";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// React cache() deduplicates the request so Supabase query runs only once per render
const getBlog = cache(async (slug: string) => {
  return await blogService.getBlogBySlug(slug);
});

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlog(slug);

  if (!post) {
    return {
      title: "Article Not Found | OneListy",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: post.meta_title,
    description: post.meta_description,
    keywords: post.meta_keywords ?? undefined,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.meta_title,
      description: post.meta_description,
      images: [{ url: post.image }],
      type: "article",
      publishedTime: post.published_at ?? undefined,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta_title,
      description: post.meta_description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlog(slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts from the same category
  const relatedResponse = await blogService.getBlogs({
    page: 1,
    pageLimit: 4,
    categoryId: post.category_id,
  });

  const relatedPosts = (relatedResponse?.data ?? [])
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  // Google Rich Snippet Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description,
    image: post.image,
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.author_role ?? undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "OneListy",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/blog/${post.slug}`,
    },
    keywords: post.meta_keywords ?? undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailView post={post} relatedPosts={relatedPosts} />
    </>
  );
}
