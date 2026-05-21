import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { writeSitemapFiles } from './seo/generateSitemapFiles';

function seoFilesPlugin(siteUrl: string): Plugin {
  return {
    name: 'generate-seo-files',
    configResolved() {
      writeSitemapFiles(siteUrl);
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const siteUrl = env.VITE_SITE_URL || 'https://themfcoachweb.com';
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), seoFilesPlugin(siteUrl)],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
