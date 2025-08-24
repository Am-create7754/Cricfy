// server/src/models/Booking.js
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  seatCode: { type: String, required: true },     // e.g. A-01
  standId: { type: mongoose.Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  qrDataUrl: { type: String }                     // ticket ke QR code ka image
});

const bookingSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tickets: { type: [ticketSchema], required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ["Confirmed", "Cancelled", "Refunded"], default: "Confirmed" },
  paymentRef: { type: String }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
