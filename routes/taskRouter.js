import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";

export const taskRouter = express.Router();
taskRouter.route("/").get(getTasks).post(createTask);
taskRouter.route("/:id").get(getTaskById).patch(updateTask).delete(deleteTask);
