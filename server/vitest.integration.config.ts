import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./src/tests/integration/**/*.spec.ts"],
    setupFiles: ["./src/tests/setups/setup-integration.ts"],
  },
});
