import { createComment, updateComment } from "@/controllers/commentController";
import { autheticateRequest } from "@/middlewares/authMiddleware";
import { cachePostByID } from "@/middlewares/postMiddleware";
import { validateBody } from "@/middlewares/shareMiddleware";
import commentValidator from "@/validators/commentValidator";
import express from "express";

const commentRoutes = express.Router();

// make comment
commentRoutes.post(
  "/:postId/",
  autheticateRequest(true),
  cachePostByID,
  validateBody(commentValidator),
  createComment
);

// update comment
commentRoutes.patch(
  "/:postId/:commentId",
  autheticateRequest(true),
  cachePostByID,
  validateBody(commentValidator),
  updateComment
);

// delete comment

export default commentRoutes;
