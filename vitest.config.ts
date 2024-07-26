// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        './src/types',
        '.eslintrc.cjs',
        'vite.config.ts',
        'vitest.config.ts',
        './src/vite-env.d.ts',
      ],
    },
  },
});
