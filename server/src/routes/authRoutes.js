import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get user info (protected route)
router.get("/me", authMiddleware, getUser);

export default router;
