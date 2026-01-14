export const prerender = false;
import type { APIRoute } from 'astro';
import { contentfulClient } from '@/lib/contentful';

export const GET: APIRoute = async () => {
  const entries = await contentfulClient.getEntries({
    content_type: 'demo',
    limit: 1000,
    skip: 0
  });

  const items = entries.items.map((e: any) => ({
    filters: e.fields.filters
  }));

  return new Response(JSON.stringify({ items }), {
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
};
