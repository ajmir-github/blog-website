import express from "express";
import authRouter from "./authRoutes";
import userRouter from "./userRoutes";
import postRouter from "./postRoutes";
import commentRoutes from "./commentRoutes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/comments", commentRoutes);

export default router;
