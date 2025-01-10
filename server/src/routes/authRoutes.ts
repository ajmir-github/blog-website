import appContext from "@/appContext";
import { ResponseStatus } from "@/constants";
import {
  getAuth,
  signIn,
  signUp,
  updateUser,
  uploadProfile,
} from "@/controllers/authController";
import database from "@/database";
import {
  autheticateRequest,
  hashBodyPassword,
  validateUniqueEmail,
} from "@/middlewares/authMiddleware";
import { profileUploader } from "@/middlewares/fileMiddleware.ts";
import validate from "@/middlewares/validate";
import { Response } from "@/utils/createContext";
import { matchPassword, signToken } from "@/utils/encryption";
import { customValidationError } from "@/utils/simplifyZodError";

import userValidator from "@/validators/userValidator";
import express from "express";

const authRouter = express.Router();

// sign in
authRouter.post("/sign-in", signIn);

// sign up
authRouter.post(
  "/sign-up",
  validate({ body: userValidator }),
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
  validate({
    body: userValidator
      .pick({ email: true, name: true, password: true, profile: true })
      .partial(),
  }),
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
