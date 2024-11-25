/**
 * Note : Vite not configured yet, currently using webpack only.
 * TODO: configure vite
 */
import { defineConfig } from 'vite';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Entry file
      name: 'rmathjs', // Library name
      fileName: 'rmath', // Output file name without extension
      formats: ['umd'], // Output format
    },
    outDir: 'lib', // Output directory
    sourcemap: true, // Inline source map (equivalent to 'inline-source-map')
  },
  resolve: {
    extensions: ['.ts', '.js'], // File extensions to resolve
  },
  plugins: [tsconfigPaths()],
});
