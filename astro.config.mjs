import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://avtuka.github.io',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
