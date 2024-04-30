import type { CollectionEntry } from 'astro:content';
import type { Actor } from './actors';

export type SearchIndex =
  | {
      type: 'actor';
      year: '';
      name: string;
      id: string;
      content: '';
      actors: '';
      director: '';
      data: Actor;
    }
  | {
      type: 'film';
      year: string;
      name: string;
      id: string;
      content: string;
      director: string;
      actors: string;
      data: CollectionEntry<'review'>['data'];
    };
