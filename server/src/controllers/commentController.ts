import { ResponseStatus } from "@/constants";
import database from "@/database";
import { autheticateRequest } from "@/middlewares/authMiddleware";
import { cachePostByID } from "@/middlewares/postMiddleware";
import { validateBody } from "@/middlewares/shareMiddleware";
import commentValidator from "@/validators/commentValidator";
import express, { response } from "express";

// /posts/:postId/comments...
const commentController = express.Router({ mergeParams: true }); // merge to access parent :postId

// make comment
commentController.post(
  "/",
  autheticateRequest(true),
  cachePostByID,
  validateBody(commentValidator),
  async (requset, response) => {
    const comment = await database.comment.create({
      data: {
        ...requset.body,
        userId: requset.auth.id,
        postId: requset.post.id,
      },
    });
    response.status(ResponseStatus.CREATED).json({ id: comment.id });
  }
);

// update comment
commentController.patch(
  "/:commentId",
  autheticateRequest(true),
  cachePostByID,
  validateBody(commentValidator),
  async (requset, response) => {}
);

// delete comment

export default commentController;
