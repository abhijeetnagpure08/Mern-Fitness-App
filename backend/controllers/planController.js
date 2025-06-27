const WorkoutPlan = require("../models/WorkoutPlan");
const User = require("../models/User");

// Upload and assign a workout plan
exports.uploadPlan = async (req, res) => {
  const { title, assignedTo } = req.body;
  const fileUrl = `/uploads/${req.file.filename}`;

  try {
    // Verify assigned user exists
    const member = await User.findById(assignedTo);
    if (!member || member.role !== "member") {
      return res.status(404).json({ message: "Assigned member not found" });
    }

    // Save workout plan
    const plan = await WorkoutPlan.create({
      title,
      fileUrl,
      assignedTo,
      uploadedBy: req.user._id,
    });

    // Add reference to user
    member.assignedWorkoutPlans.push(plan._id);
    await member.save();

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all plans for a member
exports.getMemberPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find({ assignedTo: req.params.memberId });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find().populate("assignedTo", "name email");
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};