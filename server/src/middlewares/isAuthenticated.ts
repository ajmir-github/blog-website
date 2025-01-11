import { ResponseStatus } from "@/constants";
import database from "@/database";
import { verifyToken } from "@/utils/encryption";
import { Handler } from "express";

const isAuthenticated: Handler = async (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
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

export default isAuthenticated;
