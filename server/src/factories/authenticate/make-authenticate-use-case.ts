import { UserRepositoryPrisma } from "../../repositories/prisma/user-repository-prisma";
import { AuthenticateUseCase } from "../../useCases/authenticate/authenticate-use-case";

export function makeAuthenticateUseCase() {
  const usersRepository = new UserRepositoryPrisma();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
