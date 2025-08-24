import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);   // ✅ yaha path define hai
app.use("/auth", require("./src/routes/authRoutes"));
app.use("/stadiums", require("./src/routes/stadiumRoutes"));
app.use("/matches", require("./src/routes/matchRoutes"));
app.use("/bookings", require("./src/routes/bookingRoutes"));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error", err));

app.get("/", (req, res) => {
  res.send("Cricket Stands Booking Backend Running 🚀");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
