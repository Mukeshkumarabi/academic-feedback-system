import express from "express";
import {
  createFeedback,
  getMyFeedback,
  getAllFeedback,
  updateFeedback,
  deleteFeedback
} from "../controllers/feedbackController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, createFeedback);
router.get("/my", protect, getMyFeedback);

// Admin only: view all feedback submissions
router.get("/", protect, adminOnly, getAllFeedback);

router.put("/:id", protect, updateFeedback);
router.delete("/:id", protect, deleteFeedback);

export default router;