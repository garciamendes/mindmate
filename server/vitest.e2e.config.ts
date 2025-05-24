import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["./src/tests/e2e/**/*.spec.ts"],
    setupFiles: ["./src/tests/setups/setup-e2e.ts"],
    testTimeout: 30_000,
  },
});
