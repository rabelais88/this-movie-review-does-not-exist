import type { CollectionEntry } from 'astro:content';

export interface Actor {
  name: string;
  movies: CollectionEntry<'review'>['data'][];
}
