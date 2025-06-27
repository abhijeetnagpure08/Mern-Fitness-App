const express = require("express");
const router = express.Router();
const {
  getMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// All routes are protected and admin-only
router.use(protect, adminOnly);

router.get("/", getMembers);
router.get("/:id", getMemberById);
router.post("/", createMember);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

module.exports = router;
