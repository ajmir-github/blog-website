import { ResponseStatus } from "@/constants";
import { Handler } from "express";

const checkPostAuthorization: Handler = async function (
  requset,
  response,
  next
) {
  // if admin
  if (requset.auth.isAdmin) return next();
  // if owner
  if (requset.auth.id === requset.post.userId) return next();
  response
    .status(ResponseStatus.AUTHORIZARION_REQUIRED)
    .json({ message: "You are not authorized!" });
};

export default checkPostAuthorization;
