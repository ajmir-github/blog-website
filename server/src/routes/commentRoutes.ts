import { createComment, updateComment } from "@/controllers/commentController";
import autheticate from "@/middlewares/autheticate";
import cachePostByID from "@/middlewares/cachePostByID";
import { validateBody } from "@/middlewares/validator";
import commentValidator from "@/validators/commentValidator";
import express from "express";

const commentRoutes = express.Router();

// make comment
commentRoutes.post(
  "/:postId/",
  autheticate,
  cachePostByID,
  validateBody(commentValidator),
  createComment
);

// update comment
commentRoutes.patch(
  "/:postId/:commentId",
  autheticate,
  cachePostByID,
  validateBody(commentValidator),
  updateComment
);

// delete comment

export default commentRoutes;
