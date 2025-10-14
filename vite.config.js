import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => ({
  // ✅ MUST match your GitHub Pages repo name
  base: mode === 'production' ? '/devaptor/' : '/',

  plugins: [
    react(),
    tailwindcss(),

    // ✅ Only Gzip compression (Brotli often breaks GH Pages)
    mode === 'production' &&
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 10240,
        deleteOriginFile: false,
      }),
  ].filter(Boolean),

  build: {
    target: 'esnext',
    sourcemap: false,
    cssMinify: 'lightningcss',
    cssCodeSplit: true,
    emptyOutDir: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(css)$/.test(name ?? ''))
            return 'assets/css/[name]-[hash][extname]';
          if (/\.(woff2?|ttf|otf)$/.test(name ?? ''))
            return 'assets/fonts/[name]-[hash][extname]';
          if (/\.(png|jpe?g|gif|svg|webp|ico|mp4|webm)$/.test(name ?? ''))
            return 'assets/media/[name]-[hash][extname]';
          return 'assets/[name]-[hash][extname]';
        },
        // ✅ Simplified chunk splitting — avoids React corruption
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('gsap')) return 'gsap';
            return 'vendor';
          }
        },
      },
      // ❌ Removed aggressive treeshaking that broke React
      treeshake: true,
    },

    // ✅ Don’t inline — GH Pages likes real files
    assetsInlineLimit: 0,

    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      legalComments: 'none',
      minifyIdentifiers: true,
      minifyWhitespace: true,
      minifySyntax: true,
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom'],
  },

  server: {
    open: true,
    port: 5173,
    host: true,
  },

  preview: {
    port: 5174,
  },
}));
