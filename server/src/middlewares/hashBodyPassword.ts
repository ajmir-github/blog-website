import { hashPassword } from "@/utils/encryption";
import { NextFunction, Request, Response } from "express";

export function hashBodyPassword<T extends { password?: string }>(
  { body }: Request<any, any, T>,
  response: Response,
  next: NextFunction
) {
  if (body.password) body.password = hashPassword(body.password);
  next();
}
