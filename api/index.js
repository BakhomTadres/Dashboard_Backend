import app from "../app.js";
import { connectDB } from "../db.js";

let isConnected = false;

export default async function handler(req, res) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    return app(req, res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server crashed",
      error: err.message,
    });
  }
}