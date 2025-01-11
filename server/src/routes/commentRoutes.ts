import { createComment, updateComment } from "@/controllers/commentController";
import isAuthenticated from "@/middlewares/isAuthenticated";
import { cachePostByID } from "@/middlewares/postMiddleware";
import { validateBody } from "@/middlewares/shareMiddleware";
import commentValidator from "@/validators/commentValidator";
import express from "express";

const commentRoutes = express.Router();

// make comment
commentRoutes.post(
  "/:postId/",
  isAuthenticated,
  cachePostByID,
  validateBody(commentValidator),
  createComment
);

// update comment
commentRoutes.patch(
  "/:postId/:commentId",
  isAuthenticated,
  cachePostByID,
  validateBody(commentValidator),
  updateComment
);

// delete comment

export default commentRoutes;
