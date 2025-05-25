import { UserCreateDTO } from "../../dtos/user/create-dto";
import { User } from "../../generated/prisma";
import { hashPassword } from "../../utils/hashPassword";
import { randomUUID } from "node:crypto";
import { UserRepository } from "../user-repository";

export class UserInMemoryRepository implements UserRepository {
  public users: Map<User["id"], User> = new Map();

  async create(data: UserCreateDTO): Promise<void> {
    const user: User = {
      id: randomUUID(),
      name: data.name || "",
      avatar: "",
      email: data.email,
      password: await hashPassword(data.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.set(user.id, user);
  }

  async findById(user: User["id"]): Promise<User | null> {
    return this.users.get(user) || null;
  }

  async findByEmail(email: User["email"]): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }

    return null;
  }
}
