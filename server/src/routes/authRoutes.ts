import { getAuth, signIn, signUp } from "@/controllers/authController";
import autheticate from "@/middlewares/autheticate";
import { hashBodyPassword } from "@/middlewares/hashBodyPassword";
import uniqueEmailOnly from "@/middlewares/uniqueEmailOnly";
import { validateBody } from "@/middlewares/validator";
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
  uniqueEmailOnly,
  hashBodyPassword,
  signUp
);

// get auth
authRouter.get("/get-auth", autheticate, getAuth);

export default authRouter;
