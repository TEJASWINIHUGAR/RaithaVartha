import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './',
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'Raitha Varta - Farmer News',
          short_name: 'RaithaVarta',
          description: 'Personalized farming assistant and news app for Karnataka farmers.',
          theme_color: '#1a5d1a',
          background_color: '#f0fdf4',
          display: 'standalone',
          icons: [
            {
              src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=192&auto=format&fit=crop',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=512&auto=format&fit=crop',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
