import { Task } from "../models/taskSchema.js";

export const getTasks = async (req, res) => {
  console.log(req.user.id);
  const tasks = await Task.find({ userId: req.user.id }, { __v: false });
  if (!tasks) {
    return res.status(400).json({ status: "fail", data: { tasks } });
  }
  res.json({ status: "success", data: { tasks } });
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    res.json({ status: "success", data: { task } });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Invalid",
    });
  }
};

export const createTask = async (req, res) => {
  const task = new Task({
    ...req.body,
    userId: req.user.id, // بييجي من الـ verifyToken middleware
  });
  await task.save();
  res.json({ status: "success", data: { task } });
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body);
  if (!task) {
    return res.status(404).json({ status: "fail", message: "Task not found" });
  }
  res.json({ status: "success", data: { task } });
};

export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json({ status: "fail", message: "Task not found" });
  }
  res.json({ status: "success", message: "Task deleted" });
};
