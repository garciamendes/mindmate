import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../server";

describe("User Register (E2E)", () => {
  it("should register user", async () => {
    const res = await request(app.server).post("/api/users/register").send({
      email: "a@example.com",
      password: "dev@123456@",
      confirmPassword: "dev@123456@",
      name: "Aron",
    });

    expect(res.statusCode).toBe(201);
  });
});
