import { Router } from "express"
import { authMiddleware } from "../middlewares/auth";
import Message from "../models/message";

const messageRouter = Router();

messageRouter.get('/:chatUserId', authMiddleware, async (req, res) => {
    const senderId = (req as any).user.id;
    const receiverId = req.params.chatUserId;

    try {
        const messages = await Message.find({
            $or: [
                {
                    senderId: senderId,
                    receiverId: receiverId
                },
                {
                    senderId: receiverId,
                    receiverId: senderId,
                }
            ]
        }).sort({ createdAt: 1 })
        res.json(messages)
    } catch (error) {
        console.log(error);
    }

})

export default messageRouter;