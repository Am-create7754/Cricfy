// server/src/models/Stadium.js
import mongoose from "mongoose";

const standSchema = new mongoose.Schema({
  name: { type: String, required: true },       // e.g. North Stand
  category: { type: String, enum: ["VIP", "Premium", "General"], required: true },
  price: { type: Number, required: true },
  rows: { type: Number, required: true },       // kitne rows
  cols: { type: Number, required: true },       // har row me kitne seats
  blocked: { type: [String], default: [] }      // agar kuch seats permanently block ho
}, { _id: true });

const stadiumSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Wankhede Stadium
  city: { type: String, required: true },
  stands: { type: [standSchema], default: [] }
}, { timestamps: true });

export default mongoose.model("Stadium", stadiumSchema);
