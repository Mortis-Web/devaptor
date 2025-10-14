// vite.config.js
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => ({
  // 👇 Base path must match your GitHub repo name
  base: mode === 'production' ? '/devaptor/' : '/',

  plugins: [
    react(),
    tailwindcss(),
    // 🧩 Gzip only in production (safe for GH Pages)
    mode === 'production' &&
      viteCompression({
        algorithm: 'gzip',
        threshold: 10240,
        deleteOriginFile: true,
      }),
  ].filter(Boolean),

  build: {
    target: 'esnext',
    sourcemap: false,
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    emptyOutDir: true,
    reportCompressedSize: false,
    assetsInlineLimit: 0,
    assetsDir: 'assets',

    // ✅ Keep file structure clean & consistent
    rollupOptions: {
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(css)$/.test(name ?? '')) return 'css/[name]-[hash][extname]';
          if (/\.(woff2?|ttf|otf)$/.test(name ?? ''))
            return 'fonts/[name]-[hash][extname]';
          if (/\.(png|jpe?g|gif|svg|webp|ico|mp4|webm)$/.test(name ?? ''))
            return 'media/[name]-[hash][extname]';
          return '[name]-[hash][extname]';
        },
      },
    },

    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
      minifyIdentifiers: true,
      minifyWhitespace: true,
      minifySyntax: true,
    },
  },

  server: {
    host: true,
    port: 5173,
    open: true,
  },

  preview: {
    port: 5174,
  },
}));
