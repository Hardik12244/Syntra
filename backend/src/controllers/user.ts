import User from "../models/user";
import { Request, Response } from "express";

async function createUser(req: Request, res: Response) {
    try {
        const data = req.body
        if (!data.phoneNo || !Array.isArray(data.interests)) {
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
            email: data.email,
            college: data.college,
            interests: data.interests,
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ msg: "Server error" })
    }
}

async function getUser(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ msg: "User does not exist" });
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ msg: "Server error" });
    }
}

async function getUserByPhone(req: Request, res: Response) {
    try {
        const { phoneNo } = req.params;

        if (!phoneNo) {
            return res.status(400).json({ msg: "Phone required" });
        }

        const user = await User.findOne({ phoneNo }).select("-__v");

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

        const {
            name,
            college,
            interests,
            gender,
            dateOfBirth,
            phoneNo
        } = req.body;

        const updateData: any = {};

        if (req.file) {
            updateData.avatar = `uploads/${req.file.filename}`;
        }

        if (name !== undefined) updateData.name = name;
        if (college !== undefined) updateData.college = college;
        if (gender !== undefined) updateData.gender = gender;
        if (phoneNo !== undefined) updateData.phoneNo = phoneNo;
        if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;

        if (interests !== undefined) {
            updateData.interests = Array.isArray(interests)
                ? interests
                : [interests];
        }

        const existingUser = await User.findById(userId);

        if (!existingUser) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        const finalName = updateData.name ?? existingUser.name;
        const finalCollege = updateData.college ?? existingUser.college;
        const finalGender = updateData.gender ?? existingUser.gender;
        const finalPhoneNo = updateData.phoneNo ?? existingUser.phoneNo;
        const finalDateOfBirth =
            updateData.dateOfBirth ?? existingUser.dateOfBirth;

        const finalInterests =
            updateData.interests ?? existingUser.interests;

        const isComplete = !!(
            finalName &&
            finalCollege &&
            finalGender &&
            finalPhoneNo &&
            finalDateOfBirth &&
            Array.isArray(finalInterests) &&
            finalInterests.length > 0
        );

        updateData.isProfileComplete = isComplete;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true }
        );

        return res.status(200).json(updatedUser);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            msg: "Server error"
        });
    }
}

export { getUser, createUser, getUserByPhone, updateProfile }