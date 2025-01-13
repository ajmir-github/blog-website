import {
  createPost,
  deletePost,
  getSinglePost,
  listPosts,
  updatePost,
  uploadPostImages,
} from "@/controllers/postController";
import { imagesUploader } from "@/middlewares/uploaders";
import autheticate from "@/middlewares/autheticate";
import postValidator from "@/validators/postValidator";
import express from "express";
import { z } from "zod";
import cachePostByID from "@/middlewares/cachePostByID";
import checkPostAuthorization from "@/middlewares/checkPostAuthorization";
import { validateBody } from "@/middlewares/validator";

const postRouter = express.Router();

// get posts
postRouter.get("/", listPosts);

// get single post
postRouter.get("/:postId", getSinglePost);

// create post
postRouter.post(
  "/",
  autheticate,
  validateBody(postValidator.omit({ images: true })),
  createPost
);

// update post
postRouter.patch(
  "/:postId",
  autheticate,
  cachePostByID,
  checkPostAuthorization,
  validateBody(postValidator.omit({ images: true }).partial()),
  updatePost
);

// delete post
postRouter.delete(
  "/:postId",
  autheticate,
  cachePostByID,
  checkPostAuthorization,
  deletePost
);

// upload images
postRouter.put(
  "/:postId/images",
  autheticate,
  cachePostByID,
  checkPostAuthorization,
  validateBody(z.object({ deleteImage: z.string().optional() })),
  imagesUploader,
  uploadPostImages
);

export default postRouter;
