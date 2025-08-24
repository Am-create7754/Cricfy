import express from "express";
import { createBooking, getUserBookings, getAllBookings, cancelBooking } from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create booking (user)
router.post("/", authMiddleware, createBooking);

// Get logged-in user's bookings
router.get("/my", authMiddleware, getUserBookings);

// Admin: Get all bookings
router.get("/", authMiddleware, getAllBookings);

// Cancel booking
router.put("/:id/cancel", authMiddleware, cancelBooking);

export default router;
