import { getAuth, signIn, signUp } from "@/controllers/authController";
import {
  autheticateRequest,
  hashBodyPassword,
  validateUniqueEmail,
} from "@/middlewares/authMiddleware";
import { validateBody } from "@/middlewares/shareMiddleware";
import userValidator from "@/validators/userValidator";
import express from "express";

// parent: /api/auth
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

export default authRouter;
