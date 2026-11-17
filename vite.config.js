import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const seoFiles = ['robots.txt', 'sitemap.xml', 'llms.txt', 'llms-full.txt'];
const sitemapRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/work', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.9', changefreq: 'monthly' },
  { path: '/playground', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
];

function normalizeSiteUrl(value) {
  if (!value) return '';

  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('VITE_SITE_URL must be a valid absolute URL, such as https://example.com.');
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.search || url.hash) {
    throw new Error('VITE_SITE_URL must use http(s) and must not include a query or hash.');
  }

  return `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
}

function renderSeoFiles(siteUrl) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = siteUrl
    ? sitemapRoutes
        .map(
          (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
        )
        .join('\n')
    : '';

  return Object.fromEntries(
    seoFiles.map((name) => {
      let content = fs.readFileSync(path.join(rootDir, 'public', name), 'utf8');
      content = content.replaceAll('{{SITE_URL}}', siteUrl);
      if (name === 'sitemap.xml') content = content.replace('{{SITEMAP_URLS}}', urls);
      if (name === 'robots.txt' && !siteUrl) {
        content = content
          .split('\n')
          .filter((line) => !line.startsWith('Sitemap:') && !line.startsWith('# AI Context File:'))
          .join('\n');
      }
      return [name, content];
    })
  );
}

function staticSeoPlugin(siteUrl) {
  let outDir;

  return {
    name: 'static-seo-files',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = new URL(req.url, 'http://localhost').pathname.slice(1);
        if (!seoFiles.includes(pathname)) {
          next();
          return;
        }

        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const requestUrl = siteUrl || `${protocol}://${req.headers.host || 'localhost:5173'}`;
        const content = renderSeoFiles(normalizeSiteUrl(requestUrl))[pathname];
        res.setHeader(
          'Content-Type',
          pathname.endsWith('.xml') ? 'application/xml; charset=utf-8' : 'text/plain; charset=utf-8'
        );
        res.end(content);
      });
    },
    writeBundle() {
      const renderedFiles = renderSeoFiles(siteUrl);
      for (const [name, content] of Object.entries(renderedFiles)) {
        fs.writeFileSync(path.join(outDir, name), content, 'utf8');
      }
      if (!siteUrl) {
        console.warn(
          'VITE_SITE_URL is not set: sitemap.xml has no URL entries. Set it for production SEO links.'
        );
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, rootDir, 'VITE_');
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL || '');

  return {
    plugins: [react(), tailwindcss(), staticSeoPlugin(siteUrl)],
  };
});
