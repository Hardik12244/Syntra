import express from "express";
import { googleAuth } from "../controllers/auth";
import { getMe } from "../controllers/auth";

const router = express.Router();

router.get("/me", getMe);
router.post("/google", googleAuth);

export default router;