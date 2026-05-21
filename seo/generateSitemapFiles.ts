import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITEMAP_ROUTES } from './sitemapRoutes';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(projectRoot, 'public');

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

export function buildSitemapXml(siteUrl: string, lastmod = new Date().toISOString().slice(0, 10)): string {
  const base = normalizeSiteUrl(siteUrl);
  const urls = SITEMAP_ROUTES.map(
    (route) => `  <url>
    <loc>${base}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`,
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function buildRobotsTxt(siteUrl: string): string {
  const base = normalizeSiteUrl(siteUrl);
  return `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
}

export function writeSitemapFiles(siteUrl: string): void {
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), buildSitemapXml(siteUrl), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), buildRobotsTxt(siteUrl), 'utf8');
}
