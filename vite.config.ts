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
        // injection_script is dynamically registered via chrome.scripting API
        injection_script: 'src/js/injection_script.ts',
        'before-navigate': 'src/html/before-navigate.html',
        'blocked': 'src/html/blocked.html',
        'crowd-bypassed': 'src/html/crowd-bypassed.html',
        'tracker-bypass': 'src/html/tracker-bypass.html',
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'injection_script') {
            return 'injection_script.js';
          }
          return 'assets/[name]-[hash].js';
        },
      },
    },
  },
});
