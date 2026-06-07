import express from "express";
import {
  getUsers,
  register,
  login,
  getCurrentUser,
  updateUser,
  logout,
} from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/Auth.js";
import { LoginProtected } from "../middlewares/LoginProtected.js";
export const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter
  .route("/me")
  .get(verifyToken, getCurrentUser)
  .patch(verifyToken, updateUser);
userRouter.route("/register").post(LoginProtected, register);
userRouter.route("/login").post(LoginProtected, login);
userRouter.route("/logout").post(verifyToken, logout);
