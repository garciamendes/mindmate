import { z } from "zod";

export const CredentialsSchema = z.object({
  email: z
    .string({ message: "Required field" })
    .email({ message: "Invalid email format" }),
  password: z.string({ message: "Required field" }),
});

export type CredentialsDTO = z.infer<typeof CredentialsSchema>;
