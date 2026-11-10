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
    sourcemap: false,
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // Entry file
      name: 'rmathjs', // Library name
      fileName: 'rmath', 
      formats: ['umd', 'cjs', 'es'], 
    },
    outDir: 'lib',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.js'], // File extensions to resolve
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  test: {
    globals: true, // Allows you to use describe/it/expect without importing them
  }
});
