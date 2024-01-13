import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  site: 'https://snowbot22.github.io',
  base: '/The-Catering-Co-Page-Astro'
});