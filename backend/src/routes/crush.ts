import { Router } from "express";
import { createCrush } from "../controllers/crush";

const crushRouter = Router();

crushRouter.post('/',createCrush);

export default crushRouter