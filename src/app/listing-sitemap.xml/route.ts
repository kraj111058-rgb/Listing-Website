import {
  buildUrlsetXml,
  getBaseUrl,
  SitemapUrlEntry,
  xmlResponse,
} from "@/lib/sitemap-helper";
import { allListings } from "@/data";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const baseUrl = getBaseUrl(request);
  const now = new Date();

  // Dynamic Business Listings (DB if present, fallback to allListings)
  let entries: SitemapUrlEntry[] = [];
  try {
    const { data: dbListings } = await supabase
      .from("listings")
      .select("slug, updated_at, created_at");

    if (dbListings && dbListings.length > 0) {
      entries = dbListings.map((listing: any) => ({
        url: `${baseUrl}/listings/${listing.slug}`,
        lastModified: listing.updated_at
          ? new Date(listing.updated_at)
          : listing.created_at
          ? new Date(listing.created_at)
          : now,
        changeFrequency: "daily",
        priority: 0.9,
      }));
    } else {
      entries = allListings.map((listing) => ({
        url: `${baseUrl}/listings/${listing.slug}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.9,
      }));
    }
  } catch {
    entries = allListings.map((listing) => ({
      url: `${baseUrl}/listings/${listing.slug}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    }));
  }

  const xml = buildUrlsetXml(entries);
  return xmlResponse(xml);
}
