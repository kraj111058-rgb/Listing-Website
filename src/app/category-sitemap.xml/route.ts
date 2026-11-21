import {
  buildUrlsetXml,
  getBaseUrl,
  SitemapUrlEntry,
  xmlResponse,
} from "@/lib/sitemap-helper";
import { categoriesList } from "@/data";
import { categoryService } from "@/services/category";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const baseUrl = getBaseUrl(request);
  const now = new Date();

  // Dynamic Categories from Supabase DB, fallback to categoriesList
  let entries: SitemapUrlEntry[] = [];
  try {
    const dbCategories = await categoryService.getActiveCategories();
    const categories =
      dbCategories && dbCategories.length > 0 ? dbCategories : categoriesList;

    entries = categories.map((cat: any) => ({
      url: `${baseUrl}/listings?category=${cat.slug}`,
      lastModified: cat.updated_at ? new Date(cat.updated_at) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    entries = categoriesList.map((cat) => ({
      url: `${baseUrl}/listings?category=${cat.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  }

  const xml = buildUrlsetXml(entries);
  return xmlResponse(xml);
}
