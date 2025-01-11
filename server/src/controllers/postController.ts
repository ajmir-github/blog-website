import { ResponseStatus } from "@/constants";
import database from "@/database";
import { deleteImage } from "@/middlewares/fileMiddleware.ts";
import { Handler } from "express";

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
export const createPost: Handler = async ({ body, auth }, response) => {
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
export const uploadPostImages: Handler = async (requset, response) => {
  if (requset.body.deleteImage) await deleteImage(requset.body.deleteImage);
  const images = requset.post.images.filter(
    (image) => requset.body.deleteImage !== image
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
