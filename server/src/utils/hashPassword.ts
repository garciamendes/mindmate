import { env } from "../env/";

export const hashPassword = async (password: string): Promise<string> => {
  if (!password) {
    throw new Error("Password is required for hashing");
  }

  const bcrypt = await import("bcrypt");
  return bcrypt.hash(password, env.SALT_HASH);
};
