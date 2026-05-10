import { Router } from "express"
import { authMiddleware } from "../middlewares/auth";
import Message from "../models/message";
import User from "../models/user";

const messageRouter = Router();

messageRouter.get('/conversation', authMiddleware, async (req, res) => {
    const currentUserId = (req as any).user.id;

    const conversations = await Message.find({
        $or: [
            { senderId: currentUserId },
            { receiverId: currentUserId }
        ]
    });


    const otherUsers = conversations.map((message) => {
        if (message.senderId.toString() === currentUserId) {
            return message.receiverId;
        } else {
            return message.senderId;
        }
    })

    const uniqueUsers = [
        ...new Set(otherUsers.map((id) => id.toString()))
    ];

    const users = await User.find({
        _id: { $in: uniqueUsers }
    })

    res.json(users);

})

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