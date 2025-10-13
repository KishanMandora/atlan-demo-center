export const prerender = false;

import type { APIRoute } from 'astro';
import { YoutubeLoader } from '@langchain/community/document_loaders/web/youtube';

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY
});

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const videoUrl = url.searchParams.get('url');
    if (!videoUrl) {
      return new Response(JSON.stringify({ error: 'Missing ?url=' }), {
        status: 400
      });
    }

    const loader = YoutubeLoader.createFromUrl(videoUrl, {
      language: 'en',
      addVideoInfo: true
    });

    const docs = await loader.load();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that answers multiple questions at once in JSON.'
        },
        {
          role: 'user',
          content: ` Text: ${docs[0].pageContent}
          Questions:
          1. Summarize the text in 5 sentences.
          2. List 3 Visual tags showing key topics discussed (key topics should be in 2-3 words).
    
          Respond strictly in JSON with keys: summary, visual_tags and the result as array for both.
    `
        }
      ]
    });

    const raw = response.choices[0].message.content ?? '';
    const content = raw.replace(/```json|```/g, '').trim();
    const { summary, visual_tags } = JSON.parse(content);

    return new Response(JSON.stringify({ summary, visual_tags }), {
      headers: { 'content-type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e?.message ?? 'Failed to load transcript' }),
      { status: 500 }
    );
  }
};
