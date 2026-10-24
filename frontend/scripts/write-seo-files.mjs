import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const source = fs.readFileSync(path.join(root, 'src/app/config/site.ts'), 'utf8');
const siteUrl = (source.match(/siteUrl:\s*'([^']*)'/) || [])[1] || process.env.SITE_URL || '';
const base = siteUrl.replace(/\/$/, '');
const paths = [
  ...new Set(
    [...source.matchAll(/path:\s*'(\/[^']*)'/g)]
      .map((match) => match[1])
      .filter((item) => item !== '/404')
  ),
];

const dist = path.join(root, 'dist/frontend/browser');
const targets = [dist, path.join(root, 'public')].filter((dir) => fs.existsSync(dir));

const body = paths
  .map(
    (item) => `  <url>
    <loc>${base}${item === '/' ? '/' : item}</loc>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join('\n');

const sitemap = base
  ? `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
  : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n`;

const robots = base
  ? `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
  : `User-agent: *\nAllow: /\n`;

if (!base) {
  console.warn('siteUrl is empty. Set it in src/app/config/site.ts before you publish. Sitemap has no URLs yet.');
}

for (const dir of targets) {
  fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(dir, 'robots.txt'), robots);
}

const titles = [...source.matchAll(/title:\s*'([^']*)'/g)].map((match) => match[1]);
const descriptions = [...source.matchAll(/description:\s*\n?\s*'([^']*)'/g)].map((match) => match[1]);
const longTitle = titles.filter((title) => title.length > 60);
const longDescription = descriptions.filter((description) => description.length > 155);
if (longTitle.length || longDescription.length) {
  console.error('SEO length check failed', { longTitle, longDescription });
  process.exit(1);
}
console.log(`SEO files written. Titles ${titles.length}, descriptions ${descriptions.length}.`);
