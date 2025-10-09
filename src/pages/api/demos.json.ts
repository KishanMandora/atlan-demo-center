import type { APIRoute } from 'astro';
import { contentfulClient } from '@/lib/contentful';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('q')?.toLowerCase().trim() ?? '';

  console.log('url', url.searchParams.get('q'));
  console.log('search', search);

  const entries = await contentfulClient.getEntries({ content_type: 'demo' });

  const items = entries.items
    .map((e: any) => ({
      id: e.sys.id,
      title: e.fields.title,
      description: e.fields.description,
      videoUrl: e.fields.videoUrl,
      thumbnail: e.fields.thumbnail,
      filterCategory: e.fields.filterCategory,
      targetPlatform: e.fields.targetPlatform,
      productCategory: e.fields.productCategory,
      productUrl: e.fields.productUrl
    }))
    .filter((d: any) => {
      const matchSearch =
        !search ||
        d.title?.toLowerCase().includes(search) ||
        d.description?.toLowerCase().includes(search);

      return matchSearch;
    });

  return new Response(JSON.stringify({ items }), {
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
};
