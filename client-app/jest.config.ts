import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './jest.setup.ts',
  },
});

// (si pas VITE)
// export default {
//   preset: 'ts-jest',
//   testEnvironment: 'jsdom',
//   moduleNameMapper: {
//     '\\.(css|scss|less)$': 'identity-obj-proxy',
//   },
//   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// };
