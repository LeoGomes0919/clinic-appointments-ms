import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    testTimeout: 10000,
    globals: true,
    include: ['test/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,ts}'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        'src/domain/entities/**',
        'src/domain/value-objects/**',
        'src/domain/repositories/**',
        'src/index.ts',
        'src/interfaces/http/server.ts',
        'src/shared/container/index.ts',
        'src/shared/utils/types.ts',
        'src/shared/utils/httpConstants.ts',
        'src/**/dtos/**',
        'src/infra/persistence/**/models/**',
        'src/interfaces/http/dtos/**',
      ],
      report: ['text', 'html', 'json'],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
})
