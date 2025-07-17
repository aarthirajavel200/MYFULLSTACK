// server/models/pomodoroSession.js

const mongoose = require('mongoose');

const pomodoroSessionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Focus', 'Break'],
    required: true,
  },
  duration: {
    type: Number, // duration in minutes
    required: true,
  },
}, { timestamps: true }); // adds createdAt & updatedAt

module.exports = mongoose.model('PomodoroSession', pomodoroSessionSchema);
