const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all members
exports.getMembers = async (req, res) => {
  try {
    const members = await User.find({ role: "member" }).select("-password");
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single member
exports.getMemberById = async (req, res) => {
  try {
    const member = await User.findById(req.params.id).select("-password");
    if (!member || member.role !== "member") {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a member
exports.createMember = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);
    const member = await User.create({
      name,
      email,
      password: hashed,
      role: "member",
    });
    res.status(201).json({
      _id: member._id,
      name: member.name,
      email: member.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a member
exports.updateMember = async (req, res) => {
  const { name, email } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    ).select("-password");

    if (!updated || updated.role !== "member") {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a member
exports.deleteMember = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted || deleted.role !== "member") {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json({ message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
