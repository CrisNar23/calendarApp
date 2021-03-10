import Role from "../models/Role.js";
import User from "../models/User.js";

// Check if a role exist in the database
export const checkRolesExist = async (req, res, next) => {
  const userRoles = req.body.roles;

  try {
    const foundRoles = await Role.find();
    const roles = [];

    foundRoles.forEach((role) => {
      roles.push(role.name);
    });

    if (userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        if (!roles.includes(userRoles[i])) {
          return res.status(400).json({
            message: `Role ${userRoles[i]} doesn't exist`,
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  next();
};

// Check if a user already exists in the database
export const userDuplicate = async (req, res, next) => {
  const { username, email } = req.body;

  try {
    const userFound = await User.findOne({ username });
    if (userFound)
      return res.status(400).json({ message: "User already exist" });

    const emailFound = await User.findOne({ email });
    if (emailFound)
      return res.status(400).json({ message: "Email already exist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

  next();
};
