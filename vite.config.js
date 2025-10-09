import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/devaptor/',

  plugins: [react(), tailwindcss()],

  build: {
    target: 'esnext', // modern JS output
    sourcemap: mode !== 'production' ? true : true, // ✅ keep source maps for debugging
    minify: 'esbuild', // fastest + efficient
    cssCodeSplit: true, // separate CSS for better caching
    reportCompressedSize: false, // skip gzip size calc for faster builds
    chunkSizeWarningLimit: 600, // relax warnings for big libs
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['react-router-dom', 'framer-motion'],
        },
      },
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom'],
    esbuildOptions: {
      target: 'esnext',
    },
  },

  server: {
    open: true,
    port: 5173,
    strictPort: true,
  },

  preview: {
    port: 5174,
  },

  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
