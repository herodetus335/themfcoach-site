/**
 * Standalone generator (optional). Normally runs automatically via vite.config.ts.
 * Usage: VITE_SITE_URL=https://themfcoachweb.com node scripts/generate-sitemap.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');

const SITEMAP_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/pricing', changefreq: 'monthly', priority: 0.9 },
  { path: '/form', changefreq: 'monthly', priority: 0.8 },
];

const siteUrl = (process.env.VITE_SITE_URL || 'https://themfcoachweb.com').replace(/\/+$/, '');
const lastmod = new Date().toISOString().slice(0, 10);

const urls = SITEMAP_ROUTES.map(
  (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`,
).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');
console.log(`Wrote public/sitemap.xml and public/robots.txt for ${siteUrl}`);
