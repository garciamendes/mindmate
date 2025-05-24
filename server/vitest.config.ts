import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["./src/tests/**/*.{spec,test}.{ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
    },
    setupFiles: [
      "./src/tests/setups/setup-unit.ts",
      "./src/tests/setups/setup-integration.ts",
    ],
  },
});
