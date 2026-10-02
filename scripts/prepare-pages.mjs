import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const outputRoot = resolve(projectRoot, 'dist');

copyFileSync(resolve(outputRoot, 'index.html'), resolve(outputRoot, '404.html'));

// Serve known client routes as actual Pages files, including direct visits.
const sitemapPath = resolve(outputRoot, 'sitemap.xml');
const sitemap = readFileSync(sitemapPath, 'utf8');
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const route = new URL(match[1]).pathname.replace(/^\/+|\/+$/g, '');
  if (!route) continue;
  const routeDirectory = resolve(outputRoot, route);
  mkdirSync(routeDirectory, { recursive: true });
  copyFileSync(resolve(outputRoot, 'index.html'), resolve(routeDirectory, 'index.html'));
}

if (process.argv.includes('--github-pages')) {
  const githubSite = 'https://yohannesmulugeta.github.io/KKGTIMPORTEXPORT';
  writeFileSync(sitemapPath, sitemap.replaceAll('https://kkgtimportexport.com', githubSite));
  writeFileSync(
    resolve(outputRoot, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${githubSite}/sitemap.xml\n`,
  );
}
