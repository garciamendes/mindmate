import { execSync } from "node:child_process";
import { beforeAll, afterAll } from "vitest";
import { app } from "../../server";
import * as dotenv from "dotenv";
import * as fs from "fs";

beforeAll(async () => {
  // Carrega as variáveis do arquivo .env
  const envConfig = dotenv.parse(
    fs.readFileSync("src/tests/e2e/setup/.env.test")
  );
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }

  execSync(
    "docker compose -f src/tests/e2e/setup/docker-compose.test.yml up -d",
    {
      stdio: "inherit",
    }
  );

  execSync("npx prisma migrate deploy", {
    stdio: "inherit",
  });

  await app.ready();
});

afterAll(async () => {
  await app.close();

  execSync(
    "docker compose -f src/tests/e2e/setup/docker-compose.test.yml down",
    {
      stdio: "inherit",
    }
  );
});
