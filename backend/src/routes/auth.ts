import express from "express";
import { googleAuth, getMe, logout } from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/me", authMiddleware, getMe);
router.post("/google", googleAuth);
router.post("/logout", logout);

export default router;