import { ResponseStatus } from "@/constants";
import database from "@/database";
import { Handler } from "express";

export const cachePostByID: Handler = async function (requset, response, next) {
  // not nessesory check
  const post = await database.post.findUnique({
    where: { id: requset.params.postId },
  });
  if (post) {
    requset.post = post;
    return next();
  }

  response
    .status(ResponseStatus.NOT_FOUND)
    .json({ message: "There is not post with the given ID!" });
};

export const checkPostAuthorization: Handler = async function (
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
