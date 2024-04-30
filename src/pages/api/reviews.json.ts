import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Outputs: /reviews.json
export const GET: APIRoute = async ({ params, request }) => {
  const allReviews = await getCollection('review');
  return new Response(
    JSON.stringify({
      counts: allReviews.length,
      reviews: allReviews,
    })
  );
};
