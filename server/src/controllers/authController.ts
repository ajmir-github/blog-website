import { ResponseStatus } from "@/constants";
import database from "@/database";
import {
  autheticateRequest,
  hashBodyPassword,
  validateUniqueEmail,
} from "@/middlewares/authMiddleware";
import { deleteImage, profileUploader } from "@/middlewares/fileMiddleware.ts";
import { validateBody } from "@/middlewares/shareMiddleware";

import { matchPassword, signToken } from "@/utils/encryption";
import { customValidationError } from "@/utils/simplifyZodError";
import userValidator from "@/validators/userValidator";
import express from "express";

const authController = express.Router();

// sign in
authController.post(
  "/sign-in",
  validateBody(userValidator.pick({ email: true, password: true })),
  async ({ body: { email, password } }, response) => {
    // check email
    const user = await database.user.findUnique({ where: { email } });
    if (!user) {
      response
        .status(ResponseStatus.BAD_INPUT)
        .json(customValidationError("email", "Email not found!"));
      return;
    }
    // check password
    const passwordMatched = matchPassword(password, user.password);
    if (!passwordMatched) {
      response
        .status(ResponseStatus.BAD_INPUT)
        .json(customValidationError("Password", "Password not matched!"));

      return;
    }
    // create token
    const token = signToken(user.id);
    response.json({ token, user });
  }
);

// sign up
authController.post(
  "/sign-up",
  validateBody(userValidator),
  validateUniqueEmail,
  hashBodyPassword,
  async ({ body }, response) => {
    await database.user.create({
      data: {
        ...body,
        isAdmin: false,
      },
    });
    response
      .status(ResponseStatus.CREATED)
      .json({ message: "You are signed up!" });
  }
);

// get auth
authController.get(
  "/get-auth",
  autheticateRequest(true),
  (requset, response) => {
    response.json(requset.auth);
  }
);

// update self (email, name, password)
authController.post(
  "/update",
  autheticateRequest(true),
  validateBody(
    userValidator
      .pick({ email: true, name: true, password: true, profile: true })
      .partial()
  ),
  validateUniqueEmail,
  hashBodyPassword,
  async ({ body, auth }, response) => {
    if (!auth) return;
    const user = await database.user.update({
      where: { id: auth.id },
      data: {
        ...body,
      },
    });
    response.status(ResponseStatus.OK).json(user);
  }
);

// upload profile
authController.put(
  "/upload-profile",
  autheticateRequest(true),
  profileUploader,
  async (request, response) => {
    let profile = request.auth.profile;
    if (profile) await deleteImage(profile);
    profile = request.file ? request.file.filename : null;
    const user = await database.user.update({
      where: { id: request.auth.id },
      data: {
        profile,
      },
    });
    response.status(ResponseStatus.OK).json(user);
  }
);

// delete user

export default authController;
