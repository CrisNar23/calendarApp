import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { userDuplicate } from "../middlewares/verifySignUp.js";

const router = Router();

// Route to create a new account into the application verifying if a user already exist
router.post("/signup", userDuplicate, signUp);

//Route to sign in into application
router.post("/signin", signIn);

export default router;
