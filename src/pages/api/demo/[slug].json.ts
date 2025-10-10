export const prerender = false;
import type { APIRoute } from 'astro';
import { contentfulClient } from '@/lib/contentful';

// Shape kept similar to demos.json.ts — we still return { items }
export const GET: APIRoute = async ({ params }) => {
  const slug = params.demo?.toLowerCase().trim();

  console.log('params', params);
  console.log('slug', slug);
  if (!slug) {
    return new Response(JSON.stringify({ items: [] }), {
      status: 400,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  }

  // Prefer a real "slug" field in Contentful. If you don't have one,
  // you can keep the fallback-to-title matching below.
  const entries = await contentfulClient.getEntries({
    content_type: 'demo'
    // If you definitely have fields.slug, uncomment this line for a direct lookup:
    // 'fields.slug': slug,
    // limit: 1
  });

  const items = (entries.items as any[])
    .map((e: any) => ({
      id: e.sys.id,
      slug: e.fields.slug, // will be undefined if you haven't added it yet
      title: e.fields.title,
      description: e.fields.description,
      videoUrl: e.fields.videoUrl,
      thumbnail: e.fields.thumbnail,
      filterCategory: e.fields.filterCategory,
      targetPlatform: e.fields.targetPlatform,
      productCategory: e.fields.productCategory,
      productUrl: e.fields.productUrl
    }))
    // Match by slug first (if present), otherwise fall back to title includes
    .filter((d: any) => {
      const hasSlug = typeof d.slug === 'string' && d.slug.trim().length > 0;
      const slugMatch = hasSlug && d.slug.toLowerCase() === slug;
      const titleMatch =
        d.title?.toLowerCase().replace(/\s+/g, '-') === slug ||
        d.title?.toLowerCase().includes(slug);
      return slugMatch || titleMatch;
    });

  // Optional: return 404 if nothing matched
  if (!items.length) {
    return new Response(JSON.stringify({ items: [] }), {
      status: 404,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  }

  return new Response(JSON.stringify({ item: items[0] }), {
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
};
