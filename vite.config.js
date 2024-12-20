/**
 * Note : Vite not configured yet, currently using webpack only.
 * TODO: configure vite
 */
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import path from "node:path";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Entry file
      name: 'rmathjs', // Library name
      fileName: 'rmath', // Output file name without extension
      formats: ['umd', 'cjs', 'es'], // Output format
    },
    outDir: 'lib', // Output directory
    sourcemap: true, // Inline source map (equivalent to 'inline-source-map')
  },
  resolve: {
    extensions: ['.ts', '.js'], // File extensions to resolve
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ]
});
