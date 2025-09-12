// Dynamic robots.txt and sitemap.xml generation utility
import { BRANDS, detectBrandFromHost } from '../brand/brands';

export function generateRobotsTxt(host: string): string {
  const brand = detectBrandFromHost(host);
  const config = BRANDS[brand];
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const sitemap = `${protocol}://${host}/sitemap.xml`;

  return `User-agent: *
Allow: /

Sitemap: ${sitemap}
# Brand: ${config.name} (${brand})
# Generated: ${new Date().toISOString()}`;
}

export function generateSitemap(host: string): string {
  const brand = detectBrandFromHost(host);
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  
  const urls = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: '/pricing', priority: '0.9', changefreq: 'weekly' },
    { path: '/dashboard', priority: '0.8', changefreq: 'weekly' },
    { path: '/migration', priority: '0.7', changefreq: 'monthly' },
  ];

  const urlEntries = urls.map(({ path, priority, changefreq }) => 
    `  <url>
    <loc>${baseUrl}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}