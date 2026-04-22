import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
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
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return;
          }

          // Routing
          if (id.includes('@tanstack/react-router')) return 'router';

          // State management
          if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
            return 'redux';
          }

          // Animations
          if (id.includes('/motion/')) return 'motion';

          // Forms and validation
          if (
            id.includes('react-hook-form') ||
            id.includes('@hookform/resolvers') ||
            id.includes('/zod/')
          ) {
            return 'forms';
          }

          // Icons
          if (id.includes('react-icons')) return 'icons';

          // i18n
          if (
            id.includes('/i18next/') ||
            id.includes('react-i18next') ||
            id.includes('i18next-browser-languagedetector')
          ) {
            return 'i18n';
          }

          // Particles
          if (
            id.includes('@tsparticles/react') ||
            id.includes('@tsparticles/engine') ||
            id.includes('@tsparticles/slim')
          ) {
            return 'particles';
          }

          // EmailJS
          if (id.includes('@emailjs/browser')) return 'emailjs';

          return;
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
