import { UserCreateDTO } from "../dtos/user/create-dto";
import { User } from "../generated/prisma";

export interface UserRepository {
  create: (data: UserCreateDTO) => Promise<void>;
  findById: (id: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
}
