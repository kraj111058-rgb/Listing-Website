export interface SitemapUrlEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";
  priority?: number;
}

export function getBaseUrl(request?: Request): string {
  if (request) {
    const host = request.headers.get("host");
    const proto =
      request.headers.get("x-forwarded-proto") ||
      (host?.includes("localhost") ? "http" : "https");
    if (host) return `${proto}://${host}`;
  }
  return (
    process.env.NEXT_PUBLIC_APP_URL!
  );
}

export function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildUrlsetXml(entries: SitemapUrlEntry[]): string {
  const urlsXml = entries
    .map((e) => {
      const loc = `    <loc>${escapeXml(e.url)}</loc>`;
      const lastmod = e.lastModified
        ? `\n    <lastmod>${new Date(e.lastModified).toISOString()}</lastmod>`
        : "";
      const changefreq = e.changeFrequency
        ? `\n    <changefreq>${e.changeFrequency}</changefreq>`
        : "";
      const priority =
        typeof e.priority === "number"
          ? `\n    <priority>${e.priority.toFixed(1)}</priority>`
          : "";

      return `  <url>\n${loc}${lastmod}${changefreq}${priority}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

export function buildSitemapIndexXml(
  sitemaps: { url: string; lastModified?: string | Date }[]
): string {
  const sitemapsXml = sitemaps
    .map((s) => {
      const loc = `    <loc>${escapeXml(s.url)}</loc>`;
      const lastmod = s.lastModified
        ? `\n    <lastmod>${new Date(s.lastModified).toISOString()}</lastmod>`
        : "";
      return `  <sitemap>\n${loc}${lastmod}\n  </sitemap>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapsXml}
</sitemapindex>`;
}

export function xmlResponse(xml: string): Response {
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=59",
    },
  });
}
