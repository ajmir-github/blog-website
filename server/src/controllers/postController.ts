import { ResponseStatus } from "@/constants";
import database from "@/database";
import { deleteImage } from "@/middlewares/fileMiddleware.ts";
import express, { Handler } from "express";

const postControllers = express.Router();

// get posts
export const getPost: Handler = async (requset, response) => {
  const posts = await database.post.findMany();
  response.json(posts);
};

// get single post
export const getSinglePost: Handler = async (requset, response) => {
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
};

// create post
export const createPost: Handler = async ({ body, auth }, response, next) => {
  if (!auth) return next(new Error("Auth is required!"));
  const post = await database.post.create({
    data: {
      ...body,
      userId: auth.id,
    },
  });
  response.status(ResponseStatus.CREATED).json({ id: post.id });
};

// update post
export const updatePost: Handler = async ({ params, body }, response) => {
  const post = await database.post.update({
    where: { id: params.postId },

    data: {
      ...body,
    },
  });
  response.json(post);
};

// delete post
export const deletePost: Handler = async ({ params }, response) => {
  await database.post.delete({ where: { id: params.postId } });
  response.json({ message: "Post deleted!" });
};

// upload images
export const uploadPostImages: Handler = async (
  { post, body, files },
  response,
  next
) => {
  if (!post) return next(new Error("Post is required!"));

  if (body.deleteImage) await deleteImage(body.deleteImage);
  const images = post.images.filter((image) => body.deleteImage !== image);
  if (files) {
    for (const file of files as Express.Multer.File[])
      images.push(file.filename);
  }

  const updatedPost = await database.post.update({
    where: { id: post.id },
    data: {
      images,
    },
  });

  response.json(updatedPost);
};

export default postControllers;
