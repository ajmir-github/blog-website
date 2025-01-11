import {
  createPost,
  deletePost,
  getSinglePost,
  listPosts,
  updatePost,
  uploadPostImages,
} from "@/controllers/postController";
import { imagesUploader } from "@/middlewares/fileMiddleware.ts";
import isAuthenticated from "@/middlewares/isAuthenticated";
import {
  cachePostByID,
  checkPostAuthorization,
} from "@/middlewares/postMiddleware";

import express from "express";
import { z } from "zod";

const postRouter = express.Router();

// get posts
postRouter.get("/", listPosts);

// get single post
postRouter.get("/:postId", getSinglePost);

// create post
postRouter.post("/", isAuthenticated, createPost);

// update post
postRouter.patch(
  "/:postId",
  isAuthenticated,
  cachePostByID,
  checkPostAuthorization,
  updatePost
);

// delete post
postRouter.delete(
  "/:postId",
  isAuthenticated,
  cachePostByID,
  checkPostAuthorization,
  deletePost
);

// upload images
postRouter.put(
  "/:postId/images",
  isAuthenticated,
  cachePostByID,
  checkPostAuthorization,
  imagesUploader,
  uploadPostImages
);

export default postRouter;
