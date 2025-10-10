import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => ({
  base: '/devaptor/',

  plugins: [
    react(),
    tailwindcss(),

    // 🧩 Compress assets in production (Brotli + Gzip)
    mode === 'production' &&
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 10240,
        deleteOriginFile: false,
      }),
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
    sourcemap: mode !== 'production', // source maps only in dev
    minify: 'esbuild', // fast, efficient minification
    cssMinify: 'lightningcss',
    cssCodeSplit: true,
    emptyOutDir: true, // ✅ clears /dist before each build
    reportCompressedSize: false,
    chunkSizeWarningLimit: 600,

    // 🧱 Rollup output organization
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
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('gsap')) return 'gsap';
            if (id.includes('lenis')) return 'lenis';
            return 'vendor';
          }
        },
      },
      treeshake: {
        moduleSideEffects: false,
      },
    },

    // 🚀 Inline limit for small assets
    assetsInlineLimit: 0,

    // 🧠 Esbuild micro-optimizations
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
    esbuildOptions: {
      target: 'esnext',
      minify: true,
      treeShaking: true,
    },
  },

  server: {
    open: true,
    port: 5173,
    strictPort: true,
    host: true,
  },

  preview: {
    port: 5174,
  },

  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    legalComments: 'none',
  },

  experimental: {
    prefetchLinkedAssets: true,
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { runtime: `__publicAssetsBase__ + '${filename}'` };
      }
      return filename;
    },
  },
}));
