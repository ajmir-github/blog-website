import { ResponseStatus } from "@/constants";
import database from "@/database";
import express from "express";

const userController = express.Router();

// get list of users
userController.get("/", async (request, response) => {
  const books = await database.user.findMany({
    select: { id: true, name: true, profile: true },
  });
  response.json(books);
});

// get a single user with its posts and comments
userController.get("/:id", async ({ params: { id } }, response) => {
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
});

export default userController;
