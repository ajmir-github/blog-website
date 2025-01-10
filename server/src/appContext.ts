import { ZodSchema } from "zod";
import database from "./database";
import createContext, { Response } from "./utils/createContext";
import { verifyToken } from "./utils/encryption";

const appContext = createContext((request) => ({
  getBody<Body>(validator: ZodSchema<Body>) {
    const validation = validator.safeParse(request.body);
    if (!validation.success) throw Response.badInput(validation.error);
    return validation.data;
  },
  getParams<Params>(validator: ZodSchema<Params>) {
    const validation = validator.safeParse(request.params);
    if (!validation.success)
      throw Response.serverError(validation.error.message);
    return validation.data;
  },
  getQuery<Query>(validator: ZodSchema<Query>) {
    const validation = validator.safeParse(request.query);
    if (!validation.success)
      throw Response.serverError(validation.error.message);
    return validation.data;
  },
  async getAuth() {
    const { authorization } = request.headers;
    if (!authorization) throw Response.autheticationRequired();
    const token = authorization.replace("Bearer ", "");
    const id = verifyToken(token);
    const user = await database.user.findUnique({ where: { id } });
    if (!user)
      throw Response.autheticationRequired("This user does not exist anymore!");
    return user;
  },
}));

export default appContext;
