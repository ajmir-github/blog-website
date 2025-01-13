import { ZodError } from "zod";

export function simplifyValidationError(error: ZodError) {
  return {
    message: "Invalid entries provided",
    errors: error.errors.map((e) => ({
      path: e.path,
      message: e.message,
    })) as ValidationErrors,
  };
}

export const customValidationError = (path: string, message: string) => ({
  message,
  errors: [
    {
      path: [path],
      message,
    },
  ] as ValidationErrors,
});

export type ValidationError = { path: (string | number)[]; message: string };
export type ValidationErrors = ValidationError[];
