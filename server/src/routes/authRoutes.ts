import { getAuth, signIn, signUp } from "@/controllers/authController";
import autheticate from "@/middlewares/isAuthenticated";
import express from "express";

// parent: /api/auth
const authRouter = express.Router();

// sign in
authRouter.post("/sign-in", signIn);

// sign up
authRouter.post("/sign-up", signUp);

// get auth
authRouter.get("/get-auth", autheticate, getAuth);

export default authRouter;
