import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import pkg from './package.json';

/**
 * UMD Standalone Configuration
 * 
 * This configuration bundles ALL dependencies (React, Three.js, etc.)
 * into a single file. This is ideal for non-React projects or 
 * simple script-tag integrations where you want a "plug-and-play" 
 * experience without worrying about external dependencies.
 */
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [
    react({ jsxRuntime: 'classic' }),
    tailwindcss(),
    cssInjectedByJsPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    outDir: 'dist/build',
    emptyOutDir: false, // Don't clear dist, so we don't delete ES/CJS builds
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'PeriodicTable',
      formats: ['umd'],
      fileName: () => 'index.umd.js',
    },
    rollupOptions: {
      // Bundling everything for UMD
      external: [], 
      output: {
        banner: `/*!
 * ${pkg.name} v${pkg.version} (Standalone UMD)
 * (c) ${new Date().getFullYear()} STEM Dev
 * Released under the MIT License.
 */`,
      },
    },
    minify: true,
    sourcemap: false,
  },
});
