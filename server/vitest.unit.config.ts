import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./src/tests/unit/**/*.spec.ts"],
    setupFiles: ["./src/tests/setups/setup-unit.ts"],
  },
});
