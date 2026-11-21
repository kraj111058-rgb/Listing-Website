import {
  buildUrlsetXml,
  getBaseUrl,
  SitemapUrlEntry,
  xmlResponse,
} from "@/lib/sitemap-helper";
import { citiesList } from "@/data";
import { locationService } from "@/services/location";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const baseUrl = getBaseUrl(request);
  const now = new Date();

  // Dynamic Cities from Supabase DB, fallback to citiesList
  let entries: SitemapUrlEntry[] = [];
  try {
    const dbCities = await locationService.getActiveCities();
    const cities = dbCities && dbCities.length > 0 ? dbCities : citiesList;

    entries = cities.map((city: any) => ({
      url: `${baseUrl}/listings?city=${city.slug}`,
      lastModified: city.updated_at ? new Date(city.updated_at) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    entries = citiesList.map((city) => ({
      url: `${baseUrl}/listings?city=${city.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  }

  const xml = buildUrlsetXml(entries);
  return xmlResponse(xml);
}
