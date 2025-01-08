import {
  getAuth,
  signIn,
  signUp,
  updateUser,
  uploadProfile,
} from "@/controllers/authController";
import {
  autheticateRequest,
  hashBodyPassword,
  validateUniqueEmail,
} from "@/middlewares/authMiddleware";
import { profileUploader } from "@/middlewares/fileMiddleware.ts";
import { validateBody } from "@/middlewares/shareMiddleware";

import userValidator from "@/validators/userValidator";
import express from "express";

const authRouter = express.Router();

// sign in
authRouter.post(
  "/sign-in",
  validateBody(userValidator.pick({ email: true, password: true })),
  signIn
);

// sign up
authRouter.post(
  "/sign-up",
  validateBody(userValidator),
  validateUniqueEmail,
  hashBodyPassword,
  signUp
);

// get auth
authRouter.get("/get-auth", autheticateRequest(true), getAuth);

// update self (email, name, password)
authRouter.post(
  "/update",
  autheticateRequest(true),
  validateBody(
    userValidator
      .pick({ email: true, name: true, password: true, profile: true })
      .partial()
  ),
  validateUniqueEmail,
  hashBodyPassword,
  updateUser
);

// upload profile
authRouter.put(
  "/upload-profile",
  autheticateRequest(true),
  profileUploader,
  uploadProfile
);

// delete user

export default authRouter;
