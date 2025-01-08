import { ResponseStatus } from "@/constants";
import database from "@/database";
import { Handler } from "express";

// /comments/:postId...

// make comment
export const createCommment: Handler = async (
  { body, auth, post },
  response,
  next
) => {
  if (!auth || !post) return next(new Error("auth and post are required!"));
  const comment = await database.comment.create({
    data: {
      ...body,
      userId: auth.id,
      postId: post.id,
    },
  });
  response.status(ResponseStatus.CREATED).json({ id: comment.id });
};

// update comment
export const updateComment: Handler = async (requset, response) => {};

// delete comment
export const deleteComment: Handler = async () => {};
