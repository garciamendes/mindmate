import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
    include: ["src/**/*.spec.ts", "src/**/*.test.ts"],
  },
});
