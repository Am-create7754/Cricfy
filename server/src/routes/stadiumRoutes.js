import express from "express";
import {
  addStadium,
  getStadiums,
  updateStadium,
  deleteStadium,
  bookSeat
} from "../controllers/stadiumController.js";

const router = express.Router();

router.post("/", addStadium);        // Add stadium
router.get("/", getStadiums);        // Get all stadiums
router.put("/:id", updateStadium);   // Update stadium
router.delete("/:id", deleteStadium);// Delete stadium

// Seat booking (with standId + row + col)
router.post("/book", bookSeat);

export default router;
