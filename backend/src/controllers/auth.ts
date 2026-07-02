import dotenv from "dotenv";

dotenv.config();
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/user";


const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);

export async function googleAuth(req: Request, res: Response) {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,
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
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );
        const isProd = process.env.NODE_ENV === "production";
        res.cookie("token", jwtToken, {
            httpOnly: true,
            sameSite: isProd ? "none" : "lax",
            secure: isProd,
        });

        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Google auth failed" });
    }
}

export async function getMe(req: Request, res: Response) {
    try {
        const token = req.cookies.token; 

        if (!token) {
            return res.status(401).json({ msg: "No token" });
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(401).json({ msg: "Invalid token" });
    }
}

export async function logout(req: Request, res: Response) {
    const isProd = process.env.NODE_ENV === "production";
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: isProd ? "none" : "lax",
        secure: isProd,
    });
    res.status(200).json({ msg: "Logged out successfully" });
}