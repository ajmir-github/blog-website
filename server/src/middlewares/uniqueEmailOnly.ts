import database from "@/database";
import { NextFunction, Request, Response } from "express";
import { customValidationError } from "@/utils/simplifyZodError";
import { ResponseStatus } from "@/constants";

export default async function uniqueEmailOnly<T extends { email?: string }>(
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
    .status(ResponseStatus.BAD_INPUT)
    .json(customValidationError("email", "This email is already used!"));
}
