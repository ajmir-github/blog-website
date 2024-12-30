import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { env } from "@/constants";

export const signToken = (id: string) =>
  jwt.sign(id.toString(), env.SECRET_KEY);
export const verifyToken = (token: string) => {
  return jwt.verify(token, env.SECRET_KEY) as string;
};

export const hashPassword = (password: string) =>
  bcryptjs.hashSync(password, 10);
export const matchPassword = (password: string, hash: string) =>
  bcryptjs.compareSync(password, hash);
