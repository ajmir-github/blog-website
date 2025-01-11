import {
  getUser,
  listUsers,
  updateUser,
  updateUserProfile,
} from "@/controllers/userController";
import authenticate from "@/middlewares/isAuthenticated";
import { profileUploader } from "@/middlewares/fileMiddleware.ts";
import { validateBody } from "@/middlewares/shareMiddleware";
import userValidator from "@/validators/userValidator";
import express from "express";

const userRouter = express.Router();

// get list of users
userRouter.get("/", listUsers);

// get a single user with its posts and comments
userRouter.get("/:id", getUser);

// update self (email, name, password)
userRouter.patch("/", authenticate, updateUser);

// upload profile
userRouter.put("/profile", authenticate, profileUploader, updateUserProfile);

// delete user

export default userRouter;
