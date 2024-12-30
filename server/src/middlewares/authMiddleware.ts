import { ResponseStatus } from "@/constants";
import database from "@/database";
import { verifyToken, hashPassword } from "@/utils/encryption";
import { NextFunction, Request, Response } from "express";
import { customValidationError } from "@/utils/simplifyZodError";

export function autheticateRequest(required: Boolean = false) {
  return async function autheticateRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { authorization } = request.headers;
    if (!authorization) {
      if (!required) return next();
      response
        .status(ResponseStatus.AUTHETICATION_REQUIRED)
        .json({ message: "Authetication requried!" });
      return;
    }
    const token = authorization.replace("Bearer ", "");
    const id = verifyToken(token);
    const user = await database.user.findUnique({ where: { id } });
    if (user) {
      request.auth = user;
      return next();
    }
    response
      .status(ResponseStatus.AUTHETICATION_REQUIRED)
      .json({ message: "This user does not exist anymore!" });
  };
}

export async function validateUniqueEmail<T extends { email?: string }>(
  { body }: Request<any, any, T>,
  response: Response,
  next: NextFunction
) {
  if (!body.email) return next();
  const emailAlreadyUsed = await database.user.findFirst({
    where: { email: body.email },
  });
  if (!emailAlreadyUsed) return next();
  response
    .status(400)
    .json(customValidationError("email", "This email is already used!"));
}

export function hashBodyPassword<T extends { password?: string }>(
  { body }: Request<any, any, T>,
  response: Response,
  next: NextFunction
) {
  if (body.password) body.password = hashPassword(body.password);
  next();
}
