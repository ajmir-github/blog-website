import express, { Response } from "express";
import { env, ResponseStatus } from "./constants";
import userController from "./controllers/userController";
import authController from "./controllers/authController";
import { Post, User } from "@prisma/client";
import postControllers from "./controllers/postController";
import commentController from "./controllers/commentController";

// Server Configuration
const app = express();
app.use(express.json());

// Extends Request Type
declare global {
  namespace Express {
    interface Request {
      auth: User;
      post: Post;
      comment: Comment;
    }
  }
}

app.use((req, res, next) => {
  if (env.ENV_MODE === "development")
    console.log({ method: req.method, url: req.url });
  next();
});

// API Registeration
app.use("/users", userController);
app.use("/auth", authController);
app.use("/posts", postControllers);
app.use("/posts/:postId/comments", commentController);

// If URL not found
app.use("*", (request, response) => {
  response.status(ResponseStatus.NOT_FOUND).json({ message: "URL not found!" });
});

// Catch all unexpected errors
app.use((err: Error, req: any, res: Response, next: any) => {
  res.status(ResponseStatus.ERROR).send({ message: err.message });
});

// Server Activation
app.listen(env.PORT, () =>
  console.log(`Server is running on port: ${env.PORT}`)
);
