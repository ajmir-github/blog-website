import dotenv from "dotenv";
import z from "zod";

dotenv.config();

export const env = z
  .object({
    PORT: z.string().length(4).default("3000"),
    SECRET_KEY: z.string().min(6).default("SECRET_KEY"),
    ENV_MODE: z.enum(["Development", "Production"]).default("Development"),
  })
  .parse(process.env);

export enum ResponseStatus {
  OK = 200,
  CREATED = 201,
  BAD_INPUT = 400,
  NOT_FOUND = 404,
  AUTHETICATION_REQUIRED = 401,
  AUTHORIZARION_REQUIRED = 403,
  ERROR = 500,
}
