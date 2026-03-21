import Crush from "../models/crush";
import Match from "../models/match";
import { Request, Response } from "express";

async function createCrush(req: Request, res: Response) {
    try {
        const { sender, receiver } = req.body;

        if (sender === receiver) return res.status(400).json({ msg: "cannot crush yourself" })
        const existing = await Crush.findOne({
            sender,
            receiver
        })

        if (existing) return res.status(409).json({ msg: "cannot crush again" })

        const reverse = await Crush.findOne({
            sender: receiver,
            receiver: sender,
        });

        if (reverse) {
            const userA = sender.toString();
            const userB = receiver.toString();
            
            const [user1, user2] =
                userA < userB ? [sender, receiver] : [receiver, sender];

            const existingMatch = await Match.findOne({ user1, user2 });

            if (!existingMatch) {
                await Match.create({ user1, user2 });
            }
            return res.status(200).json({ msg: "It's a match!" });
        }

        await Crush.create({
            sender,
            receiver
        })
        res.status(201).json({ msg: "Crush sent" });

    } catch (error) {
        res.status(500).json({ msg: "server error" })
    }
}

export { createCrush }