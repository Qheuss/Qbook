import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    tailwindcss(),
    viteReact(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Routing
          router: ['@tanstack/react-router'],

          // State management
          redux: ['@reduxjs/toolkit', 'react-redux'],

          // Animations
          motion: ['motion'],

          // Forms and validation
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],

          // Icons
          icons: ['react-icons'],

          // i18n
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
          ],

          // Particles
          particles: [
            '@tsparticles/react',
            '@tsparticles/engine',
            '@tsparticles/slim',
          ],

          // EmailJS
          emailjs: ['@emailjs/browser'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
