import {
  buildUrlsetXml,
  getBaseUrl,
  SitemapUrlEntry,
  xmlResponse,
} from "@/lib/sitemap-helper";
import { BlogStatus } from "@/enums";
import { supabase, SUPABASE_CONSTANTS } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const baseUrl = getBaseUrl(request);
  const now = new Date();

  // Dynamic ALL Published Blogs from Supabase DB (NO pageLimit)
  let entries: SitemapUrlEntry[] = [];
  try {
    const { data: blogs } = await supabase
      .from(SUPABASE_CONSTANTS.DB_TABLES.BLOGS)
      .select("slug, updated_at, created_at, published_at")
      .eq("status", BlogStatus.PUBLISHED)
      .order("published_at", { ascending: false });

    entries = (blogs ?? []).map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(
        post.updated_at || post.created_at || post.published_at || now
      ),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    entries = [];
  }

  const xml = buildUrlsetXml(entries);
  return xmlResponse(xml);
}
