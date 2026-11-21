import {
  buildSitemapIndexXml,
  getBaseUrl,
  xmlResponse,
} from "@/lib/sitemap-helper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const baseUrl = getBaseUrl(request);
  const now = new Date();

  // Pure standard XML Sitemap Index
  const sitemaps = [
    {
      url: `${baseUrl}/page-sitemap.xml`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/category-sitemap.xml`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/city-sitemap.xml`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/blog-sitemap.xml`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/listing-sitemap.xml`,
      lastModified: now,
    },
  ];

  const xml = buildSitemapIndexXml(sitemaps);
  return xmlResponse(xml);
}
