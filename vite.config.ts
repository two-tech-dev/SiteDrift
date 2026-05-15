import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import manifest from './manifest.config';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest }),
    viteStaticCopy({
      targets: [{ src: 'src/_locales', dest: '.' }],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // CRXJS handles content_scripts (including injection_script) from the manifest.
        // Only additional HTML pages that CRXJS doesn't auto-detect need to be listed here.
        'before-navigate': 'src/html/before-navigate.html',
        'blocked': 'src/html/blocked.html',
        'crowd-bypassed': 'src/html/crowd-bypassed.html',
        'tracker-bypass': 'src/html/tracker-bypass.html',
      },
    },
  },
});
