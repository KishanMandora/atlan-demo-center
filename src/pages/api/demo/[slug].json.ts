export const prerender = false;
import type { APIRoute } from 'astro';
import { contentfulClient } from '@/lib/contentful';

export const GET: APIRoute = async ({ params }) => {
  const slug = params.demo?.toLowerCase().trim();

  console.log('slug', slug);

  const entries = await contentfulClient.getEntries({
    content_type: 'demo',
    'fields.link': slug
  });

  console.log('entries', entries);

  const item = entries.items.length > 0 ? entries.items[0] : {};

  return new Response(JSON.stringify({ item }), {
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
};
