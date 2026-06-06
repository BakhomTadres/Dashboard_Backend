import express from "express";
import cors from "cors";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { verifyToken } from "./middlewares/Auth.js";
import { userRouter } from "./routes/userRouter.js";
import { taskRouter } from "./routes/taskRouter.js";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "./controllers/taskControllers.js";

const url = process.env.MONGO_DB;
const PORT = process.env.PORT;

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const app = express();

app.use(express.json());
app.use(cors());

//Users
app.use("/api/users",userRouter);

//Tasks
app.use("/api/tasks", verifyToken, taskRouter);

app.use((req, res) => {
  res
    .status(404)
    .json({ status: "error", message: "Not found this resources" });
});
app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});
