export const prerender = false;
import type { APIRoute } from 'astro';
import { contentfulClient } from '@/lib/contentful';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('query')?.toLowerCase().trim() ?? '';
  const sort = url.searchParams.get('sort')?.trim() ?? '';

  console.log('search', search);

  const entries = await contentfulClient.getEntries({
    content_type: 'demo',
    order: [`-fields.${sort}`],
    // 'fields.duration[gt]': 15,
    // 'fields.duration[lt]': 30,
    // 'fields.filters[in]': 'AI',
    // 'fields.targetPersona[in]': 'General',
    query: search
    // limit: 10,
    // skip: 0
  });

  console.log(
    'entries',
    entries.items.map((e: any) => e.fields.views)
  );

  const items = entries.items
    .map((e: any) => ({
      id: e.sys.id,
      title: e.fields.title,
      description: e.fields.description,
      ...e.fields
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
