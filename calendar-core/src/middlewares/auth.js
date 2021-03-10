import jwt from "jsonwebtoken";
import Role from "../models/Role.js";
import User from "../models/User.js";

// Check if an authorization token exist in the request
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });

    if (!user) return res.status(404).json({ message: "User not found" });

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

//Check if a user has the admin role
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Role admin is required" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
