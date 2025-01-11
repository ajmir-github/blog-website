import { ResponseStatus } from "@/constants";
import database from "@/database";
import { Handler } from "express";

export const createComment: Handler = async (requset, response) => {
  const comment = await database.comment.create({
    data: {
      ...requset.body,
      userId: requset.auth.id,
      postId: requset.post.id,
    },
  });
  response.status(ResponseStatus.CREATED).json({ id: comment.id });
};
export const updateComment: Handler = async (requset, response) => {};

export const deleteComment: Handler = async (requset, response) => {};
