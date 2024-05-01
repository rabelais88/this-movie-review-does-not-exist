import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
// import sitemap from '@astrojs/sitemap';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import path from 'path';
import vercel from '@astrojs/vercel/serverless';
const SITE_URL = 'https://www.thismoviereviewdoesnotexist.com';
const reviewFiles = fs.readdirSync(path.resolve('./src/content/review'));
const reviewNames = reviewFiles
  .map((file) => file.split('.md')?.[0])
  .filter((f) => f !== '.DS_Store');
const urls = [
  ...reviewNames.map((reviewName) => `${SITE_URL}/review/${reviewName}`),
  // duplicated results negatively effect SEO.
  // removed RT style
  // ...reviewNames.map((reviewName) => `${SITE_URL}/review/rt/${reviewName}`),
];

const reDuplicate =
  /^https:\/\/www\.thismoviereviewdoesnotexist\.com\/rt\/(|.+)/i;
// https://astro.build/config
export default defineConfig({
  // for vercel analytics
  output: 'hybrid',
  // site name for astrojs/sitemap
  site: SITE_URL,
  integrations: [
    sitemap({
      customPages: urls,
      filter: (page) => !reDuplicate.test(page),
    }),
    tailwind(),
    react(),
  ],
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
