import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/int/**/*.int.spec.ts'],
    // getPayload() pulls the Drizzle schema from Neon on first connect, which
    // exceeds vitest's default 10s hook timeout on a cold pooled connection.
    hookTimeout: 60000,
  },
})
