import type { MetadataRoute } from "next";
import { blogService } from "@/services/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const blogsResponse = await blogService.getBlogs({
      page: 1,
      pageLimit: 100,
    });

    const blogRoutes: MetadataRoute.Sitemap = (blogsResponse.data ?? []).map(
      (post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.created_at),
        changeFrequency: "weekly",
        priority: 0.8,
      })
    );

    return [...staticRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
