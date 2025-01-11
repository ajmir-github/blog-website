import { ResponseStatus } from "@/constants";
import database from "@/database";
import { deleteImage } from "@/middlewares/fileMiddleware.ts";
import postValidator from "@/validators/postValidator";
import { Handler } from "express";
import { z } from "zod";

// get posts
export const listPosts: Handler = async (requset, response) => {
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
export const createPost: Handler = async (request, response) => {
  const inputs = postValidator.omit({ images: true }).parse(request.body);
  const post = await database.post.create({
    data: {
      ...inputs,
      userId: request.auth.id,
    },
  });
  response.status(ResponseStatus.CREATED).json({ id: post.id });
};

// update post
export const updatePost: Handler = async (requset, response) => {
  const inputs = postValidator
    .omit({ images: true })
    .partial()
    .parse(requset.body);
  const post = await database.post.update({
    where: { id: requset.params.postId },

    data: inputs,
  });
  response.json(post);
};

// delete post
export const deletePost: Handler = async ({ params }, response) => {
  await database.post.delete({ where: { id: params.postId } });
  response.json({ message: "Post deleted!" });
};

// upload images
export const uploadPostImages: Handler = async (requset, response) => {
  const inputs = z
    .object({ deleteImage: z.string().optional() })
    .parse(requset.body);
  if (inputs.deleteImage) await deleteImage(inputs.deleteImage);
  const images = requset.post.images.filter(
    (image) => inputs.deleteImage !== image
  );
  if (requset.files) {
    const files = requset.files as Express.Multer.File[];
    for (const file of files) images.push(file.filename);
  }

  const post = await database.post.update({
    where: { id: requset.post.id },
    data: {
      images,
    },
  });

  response.json(post);
};
