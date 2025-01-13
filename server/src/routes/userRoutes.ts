import {
  getUser,
  listUsers,
  updateUser,
  updateUserProfile,
} from "@/controllers/userController";
import autheticate from "@/middlewares/autheticate";
import { hashBodyPassword } from "@/middlewares/hashBodyPassword";
import uniqueEmailOnly from "@/middlewares/uniqueEmailOnly";
import { profileUploader } from "@/middlewares/uploaders";
import { validateBody } from "@/middlewares/validator";

import userValidator from "@/validators/userValidator";
import express from "express";

const userRouter = express.Router();

// get list of users
userRouter.get("/", listUsers);

// get a single user with its posts and comments
userRouter.get("/:id", getUser);

// update self (email, name, password)
userRouter.patch(
  "/",
  autheticate,
  validateBody(
    userValidator
      .pick({ email: true, name: true, password: true, profile: true })
      .partial()
  ),
  uniqueEmailOnly,
  hashBodyPassword,
  updateUser
);

// upload profile
userRouter.put("/profile", autheticate, profileUploader, updateUserProfile);

// delete user

export default userRouter;
