import { UserCreateDTO } from "../../dtos/user/create-dto";
import { env } from "../../env";
import { AlreadyExistsException } from "../../exceptions/already-exists";
import { UserRepository } from "../../repositories/user-repository";
import { hash } from "bcrypt";

export class UserCreateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: UserCreateDTO): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AlreadyExistsException("User already exists");
    }

    const { email, password, name, confirmPassword } = data

    const passwordhash = await hash(password, env.SALT_HASH)
    const newDate = { email, password: passwordhash, name, confirmPassword}

    await this.userRepository.create(newDate);
  }
}
