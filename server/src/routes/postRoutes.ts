import {
  createPost,
  deletePost,
  getPost,
  getSinglePost,
  updatePost,
  uploadPostImages,
} from "@/controllers/postController";
import { autheticateRequest } from "@/middlewares/authMiddleware";
import { imagesUploader } from "@/middlewares/fileMiddleware.ts";
import {
  cachePostByID,
  checkPostAuthorization,
} from "@/middlewares/postMiddleware";
import { validateBody } from "@/middlewares/shareMiddleware";
import postValidator from "@/validators/postValidator";
import express from "express";
import { z } from "zod";

const postRouter = express.Router();

// get posts
postRouter.get("/", getPost);

// get single post
postRouter.get("/:postId", getSinglePost);

// create post
postRouter.post(
  "/",
  autheticateRequest(true),
  validateBody(postValidator.omit({ images: true })),
  createPost
);

// update post
postRouter.patch(
  "/:postId",
  autheticateRequest(true),
  cachePostByID,
  checkPostAuthorization,
  validateBody(postValidator.omit({ images: true }).partial()),
  updatePost
);

// delete post
postRouter.delete(
  "/:postId",
  autheticateRequest(true),
  cachePostByID,
  checkPostAuthorization,
  deletePost
);

// upload images
postRouter.put(
  "/:postId",
  autheticateRequest(true),
  cachePostByID,
  checkPostAuthorization,
  validateBody(z.object({ deleteImage: z.string().optional() })),
  imagesUploader,
  uploadPostImages
);

export default postRouter;
