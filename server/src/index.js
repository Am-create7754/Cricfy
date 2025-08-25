const express = require("express");
const app = express();
const authRoutes = require("./routes/userRoutes");
const stadiumRoutes = require("./routes/stadiumRoutes");
const matchRoutes = require("./routes/matchroutes");
const bookingRoutes = require("./routes/bookingRoutes");

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/stadiums", stadiumRoutes);
app.use("/matches", matchRoutes);
app.use("/bookings", bookingRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
