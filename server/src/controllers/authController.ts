import { ResponseStatus } from "@/constants";
import database from "@/database";
import { hashPassword, matchPassword, signToken } from "@/utils/encryption";
import userValidator from "@/validators/userValidator";
import { Handler } from "express";

// sign in
export const signIn: Handler = async (request, response) => {
  const inputs = userValidator
    .pick({ email: true, password: true })
    .parse(request.body);
  // check email
  const user = await database.user.findUnique({
    where: { email: inputs.email },
  });
  if (!user) {
    response
      .status(ResponseStatus.BAD_INPUT)
      .json({ message: "Email not found!" });
    return;
  }
  // check password
  const passwordMatched = matchPassword(inputs.password, user.password);
  if (!passwordMatched) {
    response
      .status(ResponseStatus.BAD_INPUT)
      .json({ message: "Password not matched!" });

    return;
  }
  // create token
  const token = signToken(user.id);
  response.json({ token, user });
};

// sign up
export const signUp: Handler = async (request, response) => {
  const inputs = userValidator.parse(request.body);
  const emailAlreadyUsed = await database.user.findFirst({
    where: { email: inputs.email },
  });
  if (emailAlreadyUsed) {
    response.status(400).json({ message: "This email is already used!" });
    return;
  }

  const password = hashPassword(inputs.password);
  await database.user.create({
    data: {
      ...inputs,
      password,
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
