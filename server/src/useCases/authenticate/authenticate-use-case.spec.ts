import { beforeEach, describe, expect, it } from "vitest";
import { UserInMemoryRepository } from "../../repositories/in-memory/user-repository";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { CredentialsException } from "../../exceptions/credentials-error";

let userRepository: UserInMemoryRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    sut = new AuthenticateUseCase(userRepository);
  });

  it("Should be possible to authenticate in the system", async () => {
    await userRepository.create({
      name: "John Doe",
      email: "johnDoe@example.com",
      password: "dev123",
      confirmPassword: "dev123",
    });

    const { user } = await sut.execute({
      email: "johnDoe@example.com",
      password: "dev123",
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.email).toEqual("johnDoe@example.com");
  });

  it("Should not be possible to authenticate in the system with incorrect credentials(email)", async () => {
    expect(() =>
      sut.execute({
        email: "emailTest@gmail.com",
        password: "dev123",
      })
    ).rejects.toBeInstanceOf(CredentialsException);
  });

  it("Should not be possible to authenticate in the system with incorrect credentials(password)", async () => {
    await userRepository.create({
      name: "John Doe",
      email: "johnDoe@example.com",
      password: "dev123",
      confirmPassword: "dev123",
    });

    await expect(() =>
      sut.execute({
        email: "johnDoe@example.com",
        password: "dev",
      })
    ).rejects.toBeInstanceOf(CredentialsException);
  });
});
