const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  notes: { type: Object, default: {} },
  revision: { type: Object, default: {} },
});

module.exports = mongoose.model("UserData", userDataSchema);