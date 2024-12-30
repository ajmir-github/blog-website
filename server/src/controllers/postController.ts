import { ResponseStatus } from "@/constants";
import database from "@/database";
import { autheticateRequest } from "@/middlewares/authMiddleware";
import {
  cachePostByID,
  checkPostAuthorization,
} from "@/middlewares/postMiddleware";
import { validateBody } from "@/middlewares/shareMiddleware";
import postValidator from "@/validators/postValidator";
import express from "express";

const postControllers = express.Router();

// get posts
postControllers.get("/", async (requset, response) => {
  const posts = await database.post.findMany();
  response.json(posts);
});

// get single post
postControllers.get("/:postId", async (requset, response) => {
  const post = await database.post.findUnique({
    where: { id: requset.params.postId },
    include: {
      comments: true,
      user: true,
    },
  });
  if (!post) {
    response
      .status(ResponseStatus.NOT_FOUND)
      .json({ message: "Post not found!" });
    return;
  }
  response.json(post);
});

// create post
postControllers.post(
  "/",
  autheticateRequest(true),
  validateBody(postValidator.omit({ images: true })),
  async ({ body, auth }, response) => {
    const post = await database.post.create({
      data: {
        ...body,
        userId: auth.id,
      },
    });
    response.status(ResponseStatus.CREATED).json({ id: post.id });
  }
);

// update post
postControllers.patch(
  "/:postId",
  autheticateRequest(true),
  cachePostByID,
  checkPostAuthorization,
  validateBody(postValidator.omit({ images: true }).partial()),
  async ({ params, body }, response) => {
    const post = await database.post.update({
      where: { id: params.postId },

      data: {
        ...body,
      },
    });
    response.json(post);
  }
);

// delete post
postControllers.delete(
  "/:postId",
  autheticateRequest(true),
  cachePostByID,
  checkPostAuthorization,
  async ({ params }, response) => {
    await database.post.delete({ where: { id: params.postId } });
    response.json({ message: "Post deleted!" });
  }
);

export default postControllers;