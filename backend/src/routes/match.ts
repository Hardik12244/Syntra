import { Router } from "express";
import getMatches from "../controllers/match";

const matchRouter = Router();

matchRouter.get('/:id',getMatches);

export default matchRouter;