import type { Actor } from '@/utils/actors';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Outputs: /actors.json
export const GET: APIRoute = async ({ params, request }) => {
  const allReviews = await getCollection('review');
  const uniqueActors: Record<string, Actor> = {};
  allReviews.forEach((review) => {
    const actors = review.data.actor ?? [];
    actors.forEach((actor) => {
      if (!uniqueActors[actor]) {
        uniqueActors[actor] = {
          name: actor,
          movies: [],
        };
      }
      uniqueActors[actor].movies = [...uniqueActors[actor].movies, review.data];
    });
  });
  return new Response(
    JSON.stringify({
      counts: Object.keys(uniqueActors).length,
      reviews: Object.values(uniqueActors),
    })
  );
};
