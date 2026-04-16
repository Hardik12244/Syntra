import express from "express";
import { googleAuth } from "../controllers/auth";
import { getMe } from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/me",authMiddleware, getMe);
router.post("/google", googleAuth);

export default router;