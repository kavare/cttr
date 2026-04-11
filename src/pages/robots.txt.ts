import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.href.replace(/\/$/, '') ?? 'https://aarontthsieh.com';
  const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;
  const sitemapIndex = new URL(`${base}/sitemap-index.xml`, origin).href;

  const body = [
    'User-agent: *',
    'Allow: /',
    `Disallow: ${base}/_astro/`,
    '',
    `Sitemap: ${sitemapIndex}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
