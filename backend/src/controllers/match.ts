import Match from "../models/match";
import { Request, Response } from "express";

async function getMatches(req: Request, res: Response) {
    try {
       const currentUser =
   (req as any).user.id;
        const matches = await Match.find({
            $or: [
                { user1: currentUser },
                { user2: currentUser }
            ]
        })
            .populate("user1")
            .populate("user2");

        const result = matches.map((match) => {
            const u1 = match.user1;
            const u2 = match.user2;

            if (u1._id.toString() === currentUser) {
                return u2;
            } else {
                return u1;
            }
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });

    }
}
export default getMatches;