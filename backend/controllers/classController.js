const Class = require("../models/Class");

// Create a new class
exports.createClass = async (req, res) => {
  const { title, description, schedule } = req.body;
  try {
    const newClass = await Class.create({
      title,
      description,
      schedule,
      createdBy: req.user._id,
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single class by ID
exports.getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) return res.status(404).json({ message: "Class not found" });
    res.json(classItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a class
exports.updateClass = async (req, res) => {
  const { title, description, schedule } = req.body;
  try {
    const updated = await Class.findByIdAndUpdate(
      req.params.id,
      { title, description, schedule },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Class not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    const deleted = await Class.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
