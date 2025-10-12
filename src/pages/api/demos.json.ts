export const prerender = false;
import type { APIRoute } from 'astro';
import { contentfulClient } from '@/lib/contentful';

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('query')?.toLowerCase().trim() ?? '';
  const sort = url.searchParams.get('sort')?.trim() ?? '';
  const duration = url.searchParams.get('duration')?.trim() ?? '';
  const filters = url.searchParams.get('filters')?.trim() ?? '';

  console.log('filters', filters);

  const durationMap = {
    quick: {
      min: 0,
      max: 15
    },
    short: {
      min: 15,
      max: 30
    },
    medium: {
      min: 30,
      max: 45
    },
    long: {
      min: 45,
      max: 60
    },
    depth: {
      min: 60,
      max: Number.MAX_SAFE_INTEGER
    },
    all: {
      min: 0,
      max: Number.MAX_SAFE_INTEGER
    }
  };

  const durationRange = durationMap[duration as keyof typeof durationMap];

  console.log('durationRange', durationRange);

  // console.log('search', search);

  const entries = await contentfulClient.getEntries({
    content_type: 'demo',
    order: [`-fields.${sort}`],
    'fields.duration[gt]': durationRange.min,
    'fields.duration[lt]': durationRange.max,
    ...(filters ? { 'fields.filters[in]': filters } : {}),
    // 'fields.filters[in]': filters,
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
