import { ResponseStatus } from "@/constants";
import database from "@/database";
import { deleteImage } from "@/middlewares/uploaders";
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
export const updateUser: Handler = async ({ body, auth }, response) => {
  if (!auth) return;
  const user = await database.user.update({
    where: { id: auth.id },
    data: {
      ...body,
    },
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
