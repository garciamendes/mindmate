import { UserCreateDTO } from "../../dtos/user/create-dto";
import { prisma } from "../../lib/prisma";
import { UserRepository } from "../user-repository";

export class UserRepositoryPrisma implements UserRepository {
  async create({ confirmPassword, ...data }: UserCreateDTO) {
    await prisma.user.create({ data });
  }

  async findById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }
}
