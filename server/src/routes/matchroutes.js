import express from "express";
import {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch
} from "../controllers/matchController.js";

const router = express.Router();

// Routes
router.post("/", createMatch);          // Create Match
router.get("/", getAllMatches);         // Get All Matches
router.get("/:id", getMatchById);       // Get Match by ID
router.put("/:id", updateMatch);        // Update Match
router.delete("/:id", deleteMatch);     // Delete Match

export default router;
