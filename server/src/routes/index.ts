import express from "express";
import commentController from "../controllers/commentController";
import authRouter from "./authRoutes";
import userRouter from "./userRoutes";
import postRouter from "./postRoutes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentController);

export default router;
