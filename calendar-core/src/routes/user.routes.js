import { Router } from "express";
import { createUser } from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/auth.js";
import { checkRolesExist } from "../middlewares/verifySignUp.js";

const router = Router();

//Route to create a new user logged as admin
router.post("/", [verifyToken, isAdmin, checkRolesExist], createUser);

export default router;
