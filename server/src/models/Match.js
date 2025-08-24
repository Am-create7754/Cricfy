// server/src/models/Match.js
import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  title: { type: String, required: true },       // IND vs AUS
  date: { type: Date, required: true },
  stadium: { type: mongoose.Schema.Types.ObjectId, ref: "Stadium", required: true },
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" }
}, { timestamps: true });

export default mongoose.model("Match", matchSchema);
