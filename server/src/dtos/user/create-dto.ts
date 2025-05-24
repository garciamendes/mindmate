import { z } from "zod";

export const userCreateSchema = z
  .object({
    name: z.string().optional(),
    email: z
      .string({ message: "Required field" })
      .email({ message: "Invalid email format" }),
    password: z
      .string({ message: "Required field" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .refine((val) => /[a-zA-Z]/.test(val), {
        message: "Password must contain at least one letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number",
      })
      .refine((val) => /[!@#$%^&*]/.test(val), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string({ message: "Required field" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });

export type UserCreateDTO = z.infer<typeof userCreateSchema>;
