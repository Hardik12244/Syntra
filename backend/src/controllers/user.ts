import User from "../models/user";
import { Request, Response } from "express";

async function createUser(req: Request, res: Response) {
    console.log("BODY:", req.body);
    try {
        const data = req.body
        if (!data.phoneNo || !data.interests || !data.intent) {
            return res.status(400).json({ msg: "Missing fields" });
        }
        const existingUser = await User.findOne({
            phoneNo: data.phoneNo
        })
        if (existingUser) {
            return res.status(409).json({ msg: "User already exist" })
        }
        const user = await User.create({
            name: data.name,
            phoneNo: data.phoneNo,
            college: data.college,
            interests: data.interests,
        })
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "error aagya jiiii" })
    }
}

async function getUser(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const user = await User.findOne({
            _id: id,
        })
        if (!user) {
            return res.status(404).json({ msg: "User does not exist" })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}
async function getUserByPhone(req: Request, res: Response) {
    try {
        const phoneNo = req.params.phoneNo;

        const user = await User.findOne({ phoneNo });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

async function updateProfile(req: Request, res: Response) {

    try {
        const userId = (req as any).user.id;
        const { college, interests, gender, dateOfBirth } = req.body;

        const isComplete =
            college &&
            interests &&
            Array.isArray(interests) &&
            interests.length > 0;

        const updateData: any = {
            college,
            interests,
            gender,
            dateOfBirth,
            isProfileComplete: isComplete
        }

        const user = await user.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, }
        )
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
            return res.status(200).json(user);

    } catch (error) {
            return res.status(500).json({ msg: "Server error" });

    }
}

export { getUser, createUser, getUserByPhone, updateProfile }