import { CredentialsDTO } from "../../dtos/authenticate/credentials-dto";
import { CredentialsException } from "../../exceptions/credentials-error";
import { UserRepository } from "../../repositories/user-repository";
import { comparePassword } from "../../utils/comparePassword";

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CredentialsDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) throw new CredentialsException("Credentials are invalid");

    const passwordIsMatch = await comparePassword(data.password, user.password);

    if (!passwordIsMatch)
      throw new CredentialsException("Credentials are invalid");

    return { user };
  }
}
