import Stadium from "../models/stadium.js";

// ➤ Stadium create
export const addStadium = async (req, res) => {
  try {
    const stadium = new Stadium(req.body);
    await stadium.save();
    res.status(201).json({ message: "✅ Stadium created", stadium });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Get all stadiums
export const getStadiums = async (req, res) => {
  try {
    const stadiums = await Stadium.find();
    res.json(stadiums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Update stadium details
export const updateStadium = async (req, res) => {
  try {
    const updated = await Stadium.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "❌ Stadium not found" });
    res.json({ message: "✅ Stadium updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Delete stadium
export const deleteStadium = async (req, res) => {
  try {
    const deleted = await Stadium.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "❌ Stadium not found" });
    res.json({ message: "✅ Stadium deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Book a seat (stand wise)
export const bookSeat = async (req, res) => {
  try {
    const { stadiumId, standId, row, col, userName } = req.body;

    const stadium = await Stadium.findById(stadiumId);
    if (!stadium) return res.status(404).json({ error: "❌ Stadium not found" });

    const stand = stadium.stands.id(standId);
    if (!stand) return res.status(404).json({ error: "❌ Stand not found" });

    const seatCode = `${row}-${col}`;  // Example seat label: "2-5"

    if (stand.blocked.includes(seatCode)) {
      return res.status(400).json({ error: "❌ Seat permanently blocked" });
    }

    // booked seats track karne ke liye hum ek `bookedSeats` add karenge stand me
    if (!stand.bookedSeats) stand.bookedSeats = [];

    if (stand.bookedSeats.includes(seatCode)) {
      return res.status(400).json({ error: "❌ Seat already booked" });
    }

    stand.bookedSeats.push(seatCode);
    await stadium.save();

    res.json({
      message: "✅ Seat booked successfully",
      seat: seatCode,
      stadium
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
