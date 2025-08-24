import Match from "../models/Match.js";

// Create new Match
export const createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all matches
export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().populate("stadium"); // stadium details ke sath
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single match by ID
export const getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id).populate("stadium");
    if (!match) return res.status(404).json({ error: "Match not found" });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update match
export const updateMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!match) return res.status(404).json({ error: "Match not found" });
    res.json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete match
export const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ error: "Match not found" });
    res.json({ message: "Match deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
