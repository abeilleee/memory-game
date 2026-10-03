import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
