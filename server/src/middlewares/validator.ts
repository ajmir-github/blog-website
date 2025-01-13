import { ResponseStatus } from "@/constants";
import { simplifyValidationError } from "@/utils/simplifyZodError";
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export function validateBody<
  Body extends object,
  Query extends Record<string, string>
>(validator: ZodSchema<Body>) {
  return (
    request: Request<any, any, Body, Query>,
    response: Response,
    next: NextFunction
  ) => {
    // for mutation
    const validation = validator.safeParse(request.body);
    if (!validation.success) {
      response.status(ResponseStatus.BAD_INPUT).json({
        message: "Invalid entries provided!",
        errors: simplifyValidationError(validation.error),
      });
      return;
    }
    request.body = validation.data;
    next();
  };
}

export function validateQuery<
  Body extends object,
  Query extends Record<string, string>
>(validator: ZodSchema<Query>) {
  return (
    request: Request<any, any, Body, Query>,
    response: Response,
    next: NextFunction
  ) => {
    // for query
    const validation = validator.safeParse(request.query);
    if (!validation.success) {
      response.status(ResponseStatus.BAD_INPUT).json({
        message: "Invalid search params provided!",
        errors: simplifyValidationError(validation.error),
      });
      return;
    }
    request.query = validation.data;
    next();
  };
}
