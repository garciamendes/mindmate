import { beforeAll, afterAll } from "vitest";
import { prisma } from "../../lib/prisma";

beforeAll(async () => {
  // roda migrações (para SQLite in-memory, prisma cria fresh)
  await prisma.$executeRaw`PRAGMA foreign_keys = ON;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});
