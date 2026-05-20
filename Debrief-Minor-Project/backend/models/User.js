const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  photoURL: String,

  progress: {
    type: Object,
    default: {},
  },

  notes: {
    type: Object,
    default: {},
  },

  streak: {
    type: Number,
    default: 0,
  },

  lastActiveDate: {
    type: Date,
    default: null,
  },

  longestStreak: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);