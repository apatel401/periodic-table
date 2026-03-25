import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import pkg from './package.json';

export default defineConfig(({mode}) => {
  const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} STEM Dev
 * Released under the MIT License.
 */`;

  return {
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
    },
    plugins: [
      react({ jsxRuntime: 'classic' }), 
      tailwindcss(),
      cssInjectedByJsPlugin(),
      dts({
        insertTypesEntry: true,
        include: ['src'],
        rollupTypes: true,
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
      dedupe: ['react', 'react-dom'],
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.tsx'),
        name: 'PeriodicTable',
        formats: mode === 'umd' ? ['umd'] : ['es', 'cjs'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        output: {
          banner,
        },
      },
      minify: true,
      sourcemap: false,
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
