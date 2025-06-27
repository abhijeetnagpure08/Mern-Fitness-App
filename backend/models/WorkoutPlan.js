const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("WorkoutPlan", planSchema);
