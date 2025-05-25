import bcrypt from "bcrypt";

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  if (!password || !hash) {
    throw new Error("Password and hash are required for comparison");
  }

  return bcrypt.compare(password, hash);
};
