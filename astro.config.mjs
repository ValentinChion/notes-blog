// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://valentinchion.github.io',
	base: '/notes-blog',
	integrations: [mdx(), sitemap()],
	outDir: './docs'
});
