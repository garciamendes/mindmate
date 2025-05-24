import { UserRepository } from "../../repositories/user-repository";
import { UserCreateUseCase } from "../../useCases/user/create-use-case";
import { fakeUser, fakeUserDTO } from "../__mocks__/user";
import { describe, it, expect, vi } from "vitest";

describe("UserService", () => {
  it("should register user", async () => {
    const mockUser = fakeUserDTO({ password: "123", confirmPassword: "123" });

    const repo = {
      create: vi.fn().mockResolvedValue(fakeUser({ email: mockUser.email })),
    } as unknown as UserRepository;

    const service = new UserCreateUseCase(repo);
    const pass = mockUser.password[0];

    await service.execute({
      email: mockUser.email,
      password: pass,
      confirmPassword: pass,
      name: mockUser.name,
    });

    expect(repo.create).toHaveBeenCalled();
  });
});
