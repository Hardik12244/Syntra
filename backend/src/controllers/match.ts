import Match from "../models/match";
import { Request, Response } from "express";

async function getMatches(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const matches = await Match.find({
            $or: [
                { user1: id },
                { user2: id }
            ]
        })
            .populate("user1")
            .populate("user2");

        const result = matches.map((match) => {
            const u1 = match.user1;
            const u2 = match.user2;

            if (u1._id.toString() === id) {
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