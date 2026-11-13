import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      port: 5173,
      // Keep 5173: the backend's CLIENT_ORIGIN is pinned to it for CORS.
      strictPort: true,
      host: 'localhost',
      open: false,
      proxy: {
        // Same-origin API calls in development, so the browser never needs CORS.
        // In production, VITE_API_BASE_URL points at the deployed API instead.
        '/api': {
          target: env.VITE_API_PROXY_TARGET ?? 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },

    preview: {
      port: 4173,
    },

    build: {
      // Production build output: dist/
      outDir: 'dist',
      sourcemap: false,
      target: 'es2022',
      chunkSizeWarningLimit: 900,
    },
  };
});
