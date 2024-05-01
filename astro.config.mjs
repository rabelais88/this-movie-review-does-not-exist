import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  // site name for astrojs/sitemap
  site: import.meta.env.HOST_URL,
  integrations: [tailwind(), react(), sitemap()],
  adaptor: vercel({
    webAnalytics: { enabled: true },
  }),
});
