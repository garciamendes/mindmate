import { UserRepositoryPrisma } from "../../repositories/prisma/user-repository-prisma";
import { UserCreateUseCase } from "../../useCases/user/create-use-case";

export const makeCreateUseCase = () => {
  const userRepository = new UserRepositoryPrisma();
  const userCreateUseCase = new UserCreateUseCase(userRepository);

  return userCreateUseCase;
};
