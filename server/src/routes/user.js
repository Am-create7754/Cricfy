import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const newUser = new User({ name, email, passwordHash });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // match password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },  // role bhi add kar diya
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // password na bhejna response me
    const { passwordHash, ...userWithoutPassword } = user._doc;

    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
