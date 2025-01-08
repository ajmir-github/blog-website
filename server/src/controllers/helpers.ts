import database from "@/database";
import { verifyToken } from "@/utils/encryption";
import {
  simplifyValidationError,
  ValidationErrors,
} from "@/utils/simplifyZodError";
import { Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export class ServerError extends Error {
  status: number;
  details: ValidationErrors;
  constructor(message: string, status: number = 500, details?: ZodError) {
    super(message);
    this.status = status;
    this.details = details ? simplifyValidationError(details) : [];
  }
}
export type Handler = (requset: Request) => any | Promise<any>;
// express callback adapter
export function handle(handler: Handler) {
  return async (requset: Request, response: Response) => {
    try {
      const result = await handler(requset);
      if (result instanceof Error) throw result;
      response.json(result);
    } catch (error: any) {
      response.status(error.status || 500).json({
        message: error.message ?? "Server failed!",
        details: error.details ?? [],
      });
    }
  };
}
export function validate<Body, Params, Query>(
  request: Request,
  validators: {
    body?: ZodSchema<Body>;
    params?: ZodSchema<Params>;
    query?: ZodSchema<Query>;
  }
) {
  const validInputs = {} as {
    body: Body;
    params: Params;
    query: Query;
  };

  // validate params
  if (validators.params) {
    const paramsValidation = validators.params.safeParse(request.params);
    if (!paramsValidation.success)
      throw new ServerError(
        paramsValidation.error.message,
        500,
        paramsValidation.error
      );

    validInputs.params = paramsValidation.data;
  }

  // Validate body
  if (validators.body) {
    const bodyValidation = validators.body.safeParse(request.body);
    if (!bodyValidation.success) {
      throw new ServerError(
        bodyValidation.error.message,
        400,
        bodyValidation.error
      );
    }
    validInputs.body = bodyValidation.data;
  }

  // Validate Query
  if (validators.query) {
    const queryValidation = validators.query.safeParse(request.query);
    if (!queryValidation.success) {
      throw new ServerError(
        queryValidation.error.message,
        500,
        queryValidation.error
      );
    }
    validInputs.query = queryValidation.data;
  }

  // Done
  return validInputs;
}
export async function authenticate(request: Request) {
  const { authorization } = request.headers;
  if (!authorization) throw new ServerError("You need to sign in first!", 401);
  const token = authorization.replace("Bearer ", "");
  const id = verifyToken(token);
  const user = await database.user.findUnique({ where: { id } });
  if (!user) throw new ServerError("This user does not exist anymore!", 401);
  return user;
}
