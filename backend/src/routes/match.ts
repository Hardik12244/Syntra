import { Router } from "express";
import getMatches from "../controllers/match";
import { authMiddleware } from "../middlewares/auth";

const matchRouter = Router();

matchRouter.get('/get',authMiddleware,getMatches);

export default matchRouter;