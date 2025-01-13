import { ResponseStatus } from "@/constants";
import database from "@/database";
import { Handler } from "express";

const cachePostByID: Handler = async function (requset, response, next) {
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

export default cachePostByID;
