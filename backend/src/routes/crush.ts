import { Router } from "express";
import { toggleCrush,getCrush } from "../controllers/crush";
import { authMiddleware } from "../middlewares/auth";

const crushRouter = Router();

crushRouter.post('/toggle',authMiddleware,toggleCrush);
crushRouter.get('/get',authMiddleware,getCrush);

export default crushRouter