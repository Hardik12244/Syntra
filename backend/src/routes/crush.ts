import { Router } from "express";
import { toggleCrush, getCrush } from "../controllers/crush";
import { authMiddleware } from "../middlewares/auth";
import Crush from "../models/crush";

const crushRouter = Router();

crushRouter.post('/toggle', authMiddleware, toggleCrush);
crushRouter.get('/get', authMiddleware, getCrush);
crushRouter.get("/status/:userId", authMiddleware, async (req, res) => {
    try {
        const sender = (req as any).user.id;
        const existingCrush = await Crush.findOne({
                sender: sender,
                receiver: req.params.userId,
            });

        res.json({
            crushed: !!existingCrush,
        });

    } catch (error) {
        console.log(error);
    }
}
);

export default crushRouter