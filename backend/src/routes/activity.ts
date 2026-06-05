import express from "express";
import { getActivitySummary } from "../controllers/activity";
import {authMiddleware} from "../middlewares/auth";

const activityRouter = express.Router();

activityRouter.get(
  "/",
  authMiddleware,
  getActivitySummary
);

export default activityRouter;