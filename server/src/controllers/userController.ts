import { ResponseStatus } from "@/constants";
import database from "@/database";
import { deleteImage } from "@/middlewares/fileMiddleware.ts";
import { hashPassword } from "@/utils/encryption";
import userValidator from "@/validators/userValidator";
import { Handler } from "express";

// get list of users
export const listUsers: Handler = async (request, response) => {
  const users = await database.user.findMany({
    select: { id: true, name: true, profile: true },
  });
  response.json(users);
};

// get a single user with its posts and comments
export const getUser: Handler = async ({ params: { id } }, response) => {
  const user = await database.user.findUnique({
    where: { id },
    include: {
      comments: true,
      posts: true,
    },
  });

  if (!user) {
    response.status(ResponseStatus.NOT_FOUND).json({
      message: "User not found!",
    });
    return;
  }
  response.json(user);
};

// update self (email, name, password)
export const updateUser: Handler = async (request, response) => {
  const inputs = userValidator
    .pick({ email: true, name: true, password: true, profile: true })
    .partial()
    .parse(request.body);
  if (inputs.password) inputs.password = hashPassword(inputs.password);
  const user = await database.user.update({
    where: { id: request.auth.id },
    data: inputs,
  });
  response.status(ResponseStatus.OK).json(user);
};

// upload profile
export const updateUserProfile: Handler = async (request, response) => {
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
};

// delete user
