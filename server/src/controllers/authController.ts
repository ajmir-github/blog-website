import appContext from "@/appContext";
import { ResponseStatus } from "@/constants";
import database from "@/database";
import { deleteImage } from "@/middlewares/fileMiddleware.ts";
import { Response } from "@/utils/createContext";
import { matchPassword, signToken } from "@/utils/encryption";
import userValidator from "@/validators/userValidator";
import { Handler } from "express";

// sign in
export const signIn = appContext(async (context) => {
  // get inputs
  const { email, password } = context.getBody(
    userValidator.pick({ email: true, password: true })
  );
  // check email
  const user = await database.user.findUnique({ where: { email } });
  if (!user) return Response.customBadInput("email", "Email not found!");

  // check password
  const passwordMatched = matchPassword(password, user.password);
  if (!passwordMatched)
    return Response.customBadInput("Password", "Password not matched!");
  // create token
  const token = signToken(user.id);
  return Response.success({
    token,
    user,
  });
});

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
