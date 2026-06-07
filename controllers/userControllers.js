import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";
export const getUsers = async (req, res) => {
  const users = await User.find({}, { __v: false, password: false });
  if (!users) {
    return res.status(400).json({ status: "fail", data: { users } });
  }
  res.json({ status: "success", data: { users } });
};
export const getCurrentUser = async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id, {
      __v: false,
      password: false,
      token: false,
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    res.json({ status: "success", data: { user } });
  } catch (error) {
    res.status(401).json({ status: "fail", message: "Invalid token" });
  }
};
export const updateUser = async (req, res) => {
  try {
    
    const user = await User.findByIdAndUpdate(req.user.id, req.body);

    res.json({status: "success", message: "Update Successfully!"})
  } catch (error) {
    res.status(401).json({ status: "fail", message: "Invalid token" });
  }
};
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email: email });
  const hashingPassword = await bcryptjs.hash(password, 10);
  if (oldUser) {
    return res.status(400).json({ status: "fail", data: "Email is exists" });
  }
  const user = new User({
    name,
    email,
    password: hashingPassword,
  });

  const token = JWT.sign(
    { email: user.email, id: user._id },
    process.env.TOKEN_SECRET_KEY,
  );
  user.token = token;

  await user.save();
  res.json({ status: "success", data: { user } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ status: "fail", message: "Email not found" });
  }
  const matchedPassword = await bcryptjs.compare(password, user.password);
  if (user && matchedPassword) {
    const token = JWT.sign(
      { email: user.email, id: user._id },
      process.env.TOKEN_SECRET_KEY,
    );
    user.token = token;
    await user.save();
    res.json({ status: "success", data: { token } });
  }
  if (!matchedPassword) {
    return res
      .status(400)
      .json({ status: "fail", message: "Incorrect password" });
  }
};

export const logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        
        user.token = null;
        await user.save();
        
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
