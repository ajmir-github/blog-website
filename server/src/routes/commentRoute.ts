import {
  createCommment,
  deleteComment,
  updateComment,
} from "@/controllers/commentController";
import { autheticateRequest } from "@/middlewares/authMiddleware";
import { cachePostByID } from "@/middlewares/postMiddleware";
import validate from "@/middlewares/validate";
import commentValidator from "@/validators/commentValidator";
import express from "express";

// /comments/:postId...
const commentController = express.Router();

// make comment
commentController.post(
  "/:postId/",
  autheticateRequest(true),
  cachePostByID,
  validate({ body: commentValidator }),
  createCommment
);

// update comment
commentController.patch(
  "/:postId/:commentId",
  autheticateRequest(true),
  cachePostByID,
  validate({ body: commentValidator }),
  updateComment
);

// delete comment
commentController.patch(
  "/:postId/:commentId",
  autheticateRequest(true),
  cachePostByID,
  validate({ body: commentValidator }),
  deleteComment
);

export default commentController;
