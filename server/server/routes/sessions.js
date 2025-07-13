const express = require('express');
const router = express.Router();
const PomodoroSession = require('../models/pomodoroSession');

// POST /sessions - Save a session
router.post('/', async (req, res) => {
  const { type, duration } = req.body;

  console.log("📩 Received session data:", req.body);

  // ✅ Validate inputs
  if (!type || !duration) {
    return res.status(400).json({ message: "Missing 'type' or 'duration' in request body" });
  }

  try {
    const session = new PomodoroSession({ type, duration });
    const saved = await session.save();
    console.log("✅ Session saved to DB:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving session:", err.message);
    res.status(500).json({ message: "Failed to save session" });
  }
});

// GET /sessions - Fetch all sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await PomodoroSession.find().sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    console.error("❌ Error fetching sessions:", err.message);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
});

module.exports = router;
