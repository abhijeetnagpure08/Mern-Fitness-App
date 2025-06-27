const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  schedule: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Class", classSchema);
