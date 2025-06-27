const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "member"], default: "member" },
  assignedWorkoutPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkoutPlan" }],
  selectedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }]
});

module.exports = mongoose.model("User", userSchema);
