import { getSingleUser, getUsers } from "@/controllers/userController";
import express from "express";

const userRoutes = express.Router();

// get list of users
userRoutes.get("/", getUsers);

// get a single user with its posts and comments
userRoutes.get("/:id", getSingleUser);

export default userRoutes;
