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
        // Any HTML files or scripts not automatically picked up by CRXJS can be listed here,
        // but CRXJS typically handles everything in the manifest.
        injection_script: 'src/js/injection_script.ts',
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
