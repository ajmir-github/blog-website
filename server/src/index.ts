import express, { Response } from "express";
import { env, ResponseStatus } from "./constants";
import { Post, User } from "@prisma/client";
import path from "path";
import router from "./routes";

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

// API Registeration
app.use("/static", express.static(path.join(__dirname, "/public")));
// Log requests in DEV mode
app.use((req, res, next) => {
  if (env.DEV) console.log({ method: req.method, url: req.url });
  next();
});

app.use("/api", router);

// If URL not found
router.use("*", (request, response) => {
  response.status(ResponseStatus.NOT_FOUND).json({ message: "URL not found!" });
});

// Catch all unexpected errors
app.use((err: Error, req: any, res: Response, next: any) => {
  if (env.DEV) console.error(err);
  res.status(ResponseStatus.ERROR).send({ message: err.message });
});

// Server Activation
app.listen(env.PORT, () =>
  console.log(`Server is running on port: ${env.PORT}`)
);
