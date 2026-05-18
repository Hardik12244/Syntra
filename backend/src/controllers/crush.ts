import Crush from "../models/crush";
import Match from "../models/match";
import { Request, Response } from "express";

async function toggleCrush(req: Request, res: Response) {

    try {

        const sender = (req as any).user.id;
        const { receiver } = req.body;

        if (sender === receiver) {
            return res.status(400).json({
                msg: "Cannot crush yourself"
            });
        }

        const existing = await Crush.findOne({
            sender,
            receiver
        });

        if (existing) {

            await Crush.findByIdAndDelete(existing._id);

            return res.status(200).json({
                crushed: false,
                msg: "Crush removed"
            });
        }
        await Crush.create({
            sender,
            receiver
        });

        const reverse = await Crush.findOne({
            sender: receiver,
            receiver: sender
        });

        if (reverse) {

            const userA = sender.toString();
            const userB = receiver.toString();

            const [user1, user2] =
                userA < userB
                    ? [sender, receiver]
                    : [receiver, sender];

            const existingMatch =
                await Match.findOne({
                    user1,
                    user2
                });

            if (!existingMatch) {

                await Match.create({
                    user1,
                    user2
                });
            }

            return res.status(200).json({
                crushed: true,
                matched: true,
                msg: "It's a match!"
            });
        }

        return res.status(201).json({
            crushed: true,
            matched: false,
            msg: "Crush sent"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            msg: "Server error"
        });
    }
}

async function getCrush(req: Request, res: Response) {
    try {
        const sender = (req as any).user.id;

        const crushes = await Crush.find({
            sender
        }).populate(
            "receiver",
            "name avatar college"
        );
        const formatted =
      crushes.map((c) => c.receiver);

    return res.status(200).json(formatted);

    }catch (error) {

    console.log(error);

    return res.status(500).json({
      msg: "Server error"
    });
  }
}


export { toggleCrush, getCrush }