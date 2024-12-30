import { simplifyValidationError } from "@/utils/simplifyZodError";
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export function validateBody<T>(validator: ZodSchema<T>) {
  return (
    request: Request<any, any, T>,
    response: Response,
    next: NextFunction
  ) => {
    const validation = validator.safeParse(request.body);
    if (validation.success) {
      request.body = validation.data;
      return next();
    }
    response.status(400).json(simplifyValidationError(validation.error));
  };
}
