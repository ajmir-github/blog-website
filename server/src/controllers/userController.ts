import { ResponseStatus } from "@/constants";
import database from "@/database";
import { Handler } from "express";

// get list of users
export const getUsers: Handler = async (request, response) => {
  const users = await database.user.findMany({
    select: { id: true, name: true, profile: true },
  });
  response.json(users);
};

// get a single user with its posts and comments
export const getSingleUser: Handler = async ({ params: { id } }, response) => {
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
