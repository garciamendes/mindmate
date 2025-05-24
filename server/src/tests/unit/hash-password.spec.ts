import { describe, it, expect } from "vitest";
import { hashPassword } from "../../utils/hashPassword";

describe("hashPassword()", () => {
  it("should hash the password", async () => {
    const hashed = await hashPassword("123456");

    expect(hashed).toMatch(/^\$2[aby]\$.{56}$/);
  });
});
