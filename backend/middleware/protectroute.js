import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Not authorized, token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // ✅ THIS FIXES EVERYTHING
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Not authorized, token invalid" });
  }
};

export default protectRoute;
