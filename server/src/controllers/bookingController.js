import Booking from "../models/Booking.js";
import Match from "../models/Match.js";
import Stadium from "../models/stadium.js";

// Create booking
export const createBooking = async (req, res) => {
  try {
    const { matchId, tickets, paymentRef } = req.body;

    // check if match exists
    const match = await Match.findById(matchId).populate("stadium");
    if (!match) return res.status(404).json({ msg: "Match not found" });

    if (!tickets || tickets.length === 0) {
      return res.status(400).json({ msg: "No tickets selected" });
    }

    // total price
    const total = tickets.reduce((sum, t) => sum + t.price, 0);

    const booking = new Booking({
      match: matchId,
      user: req.user.id, // from authMiddleware
      tickets,
      total,
      paymentRef,
    });

    await booking.save();

    res.status(201).json({ msg: "Booking confirmed", booking });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get all bookings of logged-in user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("match")
      .populate("user", "name email");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Admin: Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("match")
      .populate("user", "name email");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to cancel this booking" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ msg: "Booking cancelled", booking });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
