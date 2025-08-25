import express from "express";
import { registerUser, loginUser, getUser } from "../controllers/authController.js";
import * as pkg from "../middleware/auth.js";
const { authMiddleware } = pkg;

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get user info (protected route)
router.get("/me", authMiddleware, getUser);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to profile", user: req.user });
});

export default router;
