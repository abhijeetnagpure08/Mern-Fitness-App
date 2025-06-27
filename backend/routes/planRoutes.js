const express = require("express");
const router = express.Router();
// const { uploadPlan, getMemberPlans } = require("../controllers/planController");
const { uploadPlan, getMemberPlans, getAllPlans } = require("../controllers/planController");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Upload workout plan (Admin)
router.post("/", protect, adminOnly, upload.single("file"), uploadPlan);

// Get member's plans (Member)
router.get("/:memberId", protect, getMemberPlans);

// Get all plans (Admin)
router.get("/", protect, adminOnly, getAllPlans);


module.exports = router;
