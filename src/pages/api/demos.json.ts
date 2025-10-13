export const prerender = false;
import type { APIRoute } from 'astro';
import { contentfulClient } from '@/lib/contentful';
import { durationMap } from '@/constants/filtersAndSorts';

export const GET: APIRoute = async ({ request }) => {
  console.log('request', request);

  const url = new URL(request.url);
  const search = url.searchParams.get('query')?.toLowerCase().trim() ?? '';
  const sort = url.searchParams.get('sort')?.trim() ?? '';
  const duration = url.searchParams.get('duration')?.trim() ?? '';
  const filters = url.searchParams.get('filters')?.trim() ?? '';
  const page = url.searchParams.get('page')?.trim() ?? '';

  const durationRange = durationMap[duration as keyof typeof durationMap];

  const entries = await contentfulClient.getEntries({
    content_type: 'demo',
    ...(sort ? { order: [`-fields.${sort}`] } : {}),
    ...(duration
      ? {
          'fields.duration[gt]': durationRange.min,
          'fields.duration[lt]': durationRange.max
        }
      : {}),
    ...(filters ? { 'fields.filters[in]': filters } : {}),
    // 'fields.filters[in]': filters,
    // 'fields.targetPersona[in]': 'General',
    query: search,
    limit: 10,
    skip: page ? parseInt(page) * 10 : 0
  });

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

  return new Response(JSON.stringify({ items, total: entries.total }), {
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
};
