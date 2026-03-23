import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} STEM Dev
 * Released under the MIT License.
 */`;

  return {
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    plugins: [
      react(), 
      tailwindcss(),
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
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'PeriodicTable',
        formats: mode === 'umd' ? ['umd'] : ['es', 'cjs'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: [
          'react', 
          'react-dom', 
          'three', 
          '@react-three/fiber', 
          '@react-three/drei', 
          'lucide-react', 
          'motion',
          'motion/react'
        ],
        output: {
          banner,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            three: 'THREE',
            '@react-three/fiber': 'ReactThreeFiber',
            '@react-three/drei': 'Drei',
            'lucide-react': 'Lucide',
            motion: 'Motion',
            'motion/react': 'MotionReact'
          },
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
