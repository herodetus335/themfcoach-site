/**
 * Canonical list of public routes. Keep in sync with `routes.tsx`.
 * Used to generate sitemap.xml and robots.txt at build/dev time.
 */
export const SITEMAP_ROUTES = [
  { path: '/', changefreq: 'weekly' as const, priority: 1.0 },
  { path: '/pricing', changefreq: 'monthly' as const, priority: 0.9 },
  { path: '/form', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/calculator', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/privacy', changefreq: 'yearly' as const, priority: 0.3 },
] as const;
