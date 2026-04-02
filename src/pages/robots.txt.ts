import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = site?.href.replace(/\/$/, '') ?? 'https://aarontthsieh.com';
  const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL;
  const sitemapUrl = new URL(`${base}/sitemap.xml`, origin).href;

  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    },
  );
};
