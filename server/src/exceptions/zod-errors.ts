import { ZodError } from "zod";

export function formatZodError(error: ZodError) {
  const formatted: Record<string, string> = {};

  for (const issue of error.errors) {
    const path = issue.path.join(".");

    if (!formatted[path]) {
      formatted[path] = issue.message;
    }
  }

  return formatted;
}
