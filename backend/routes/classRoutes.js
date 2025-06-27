
const express = require("express");
const router = express.Router();
const {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
} = require("../controllers/classController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public GET all classes 
router.get("/", getClasses);

// Admin-only routes
router.use(protect, adminOnly);

router.post("/", createClass);
router.get("/:id", getClassById);
router.put("/:id", updateClass);
router.delete("/:id", deleteClass);

module.exports = router;

