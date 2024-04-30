import type { Actor } from '@/utils/actors';
import type { SearchIndex } from '@/utils/search-index';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Outputs: /search-index.json
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

  const searchIndex = [
    ...Object.values(uniqueActors).map((actor) => ({
      type: 'actor',
      name: actor.name,
      id: actor.name,
      director: '',
      year: '',
      content: '',
      data: actor,
      actors: '',
    })),
    ...Object.values(allReviews).map((review) => ({
      type: 'film',
      name: review.data.title,
      year: review.data.releaseYear.toString(),
      id: review.data.fileName,
      director: review.data.director,
      content: review.body,
      data: review.data,
      actors: review.data.actor.join(','),
    })),
  ] as SearchIndex[];

  return new Response(
    JSON.stringify({
      counts: Object.keys(searchIndex).length,
      list: searchIndex,
    })
  );
};
