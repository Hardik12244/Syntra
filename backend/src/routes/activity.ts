import express from "express";
import {
  getActivitySummary,
  getLikesActivity,
  getCommentsActivity,
  getCrushActivity,
} from "../controllers/activity";

import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/", authMiddleware, getActivitySummary);

router.get(
  "/likes",
  authMiddleware,
  getLikesActivity
);

router.get(
  "/comments",
  authMiddleware,
  getCommentsActivity
);

router.get(
  "/crushes",
  authMiddleware,
  getCrushActivity
);

export default router;