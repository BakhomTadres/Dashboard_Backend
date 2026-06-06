import express from "express";
import {
  getUsers,
  register,
  login,
  getCurrentUser,
  updateUser,
} from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/Auth.js";
export const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter
  .route("/me")
  .get(verifyToken, getCurrentUser)
  .patch(verifyToken, updateUser);
userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
