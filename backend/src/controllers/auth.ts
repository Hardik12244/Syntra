import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/user";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleAuth(req: Request, res: Response) {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ msg: "Invalid token" });
        }
        const { email, name, picture } = payload;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                avatar: picture,
                isProfileComplete: false,
            });
        }

        const jwtToken = jwt.sign(
            { id: user._id },
            "secret123",
            { expiresIn: "7d" }
        );
        res.cookie("token", jwtToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Google auth failed" });
    }
}
;

export async function getMe(req: Request, res: Response) {
    try {
        const token = req.cookies.token; // ✅ from cookie

        if (!token) {
            return res.status(401).json({ msg: "No token" });
        }

        const decoded: any = jwt.verify(token, "secret123");

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(user);

    } catch (error) {
        res.status(401).json({ msg: "Invalid token" });
    }
}