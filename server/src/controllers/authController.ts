import { ResponseStatus } from "@/constants";
import database from "@/database";
import { matchPassword, signToken } from "@/utils/encryption";
import { customValidationError } from "@/utils/simplifyZodError";
import { Handler } from "express";

// sign in
export const signIn: Handler = async (
  { body: { email, password } },
  response
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
  response
    .status(ResponseStatus.CREATED)
    .json({ message: "You are signed up!" });
};

// get auth
export const getAuth: Handler = (requset, response) => {
  response.json(requset.auth);
};
