import { beforeEach, describe, expect, it } from "vitest";
import { UserInMemoryRepository } from "../../repositories/in-memory/user-repository";
import { UserCreateUseCase } from "./create-use-case";
import { AlreadyExistsException } from "../../exceptions/already-exists";

let userRepository: UserInMemoryRepository;
let sut: UserCreateUseCase;

describe("Register Use Case", () => {
  beforeEach(async () => {
    userRepository = new UserInMemoryRepository();
    sut = new UserCreateUseCase(userRepository);
  });

  it("Should be possible to create a new user", async () => {
    await sut.execute({
      name: "John Doe",
      email: "johnDoe@example.com",
      password: "dev123",
      confirmPassword: "dev123",
    });

    expect(userRepository.users.size).toEqual(1);
  });

  it("Should not be possible to create two users with the same email address", async () => {
    await userRepository.create({
      name: "John Doe",
      email: "johnDoe@example.com",
      password: "dev123",
      confirmPassword: "dev123",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email: "johnDoe@example.com",
        password: "dev123",
        confirmPassword: "dev123",
      })
    ).rejects.toBeInstanceOf(AlreadyExistsException);
  });
});
