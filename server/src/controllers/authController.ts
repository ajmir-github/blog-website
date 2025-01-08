import { ResponseStatus } from "@/constants";
import database from "@/database";
import { deleteImage } from "@/middlewares/fileMiddleware.ts";

import { matchPassword, signToken } from "@/utils/encryption";
import { customValidationError } from "@/utils/simplifyZodError";
import { Handler, Response } from "express";

// sign in
export const signIn: Handler = async (
  { body: { email, password } },
  response: Response
) => {
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
};

// sign up
export const signUp: Handler = async ({ body }, response) => {
  await database.user.create({
    data: {
      ...body,
      isAdmin: false,
    },
  });
  response.status(ResponseStatus.CREATED).send("You are signed up!");
};

// get auth
export const getAuth: Handler = ({ auth }, response, next) => {
  if (!auth) return next(new Error("Auth is required!"));
  response.json(auth);
};

// update self (email, name, password)
export const updateUser: Handler = async ({ body, auth }, response, next) => {
  if (!auth) return next(new Error("Auth is required!"));
  const user = await database.user.update({
    where: { id: auth.id },
    data: {
      ...body,
    },
  });
  response.json(user);
};

// upload profile
export const uploadProfile: Handler = async (
  { auth, file },
  response,
  next
) => {
  if (!auth) return next(new Error("Auth is required!"));
  let profile = auth.profile;
  if (profile) await deleteImage(profile);
  profile = file ? file.filename : null;
  const user = await database.user.update({
    where: { id: auth.id },
    data: {
      profile,
    },
  });
  response.json(user);
};
