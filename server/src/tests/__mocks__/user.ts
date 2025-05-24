import { randEmail, randPassword, randFullName, randUuid } from "@ngneat/falso";
import { UserCreateDTO } from "../../dtos/user/create-dto";

export function fakeUser(overrides: Partial<UserCreateDTO> = {}) {
  return {
    id: randUuid(),
    email: randEmail(),
    name: randFullName(),
    password: randPassword(),
    ...overrides,
  };
}

export function fakeUserDTO(overrides: Partial<UserCreateDTO> = {}) {
  return {
    email: randEmail(),
    password: randPassword(),
    confirmPassword: overrides.password || randPassword(),
    name: randFullName(),
    ...overrides,
  };
}
