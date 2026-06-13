import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // Allows you to use describe/it/expect without importing them
  },
})