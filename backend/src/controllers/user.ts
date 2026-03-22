import User from "../models/user";
import { Request,Response } from "express";

async function createUser(req:Request,res:Response){
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
                intent: data.intent
            })
            res.status(201).json(user)
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: "error aagya jiiii" })
        }
}

async function getUser(req:Request,res:Response){
    try {
        const id = req.params.id;
        const user = await User.findOne({
            _id: id,
        })
        if (!user) {
            return res.status(404).json({ msg: "User does not exist" })
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

async function updateUser(req:Request,res:Response){
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await User.findByIdAndUpdate(
            id,
            data,
            { new: true },
        );
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
}

export {getUser,createUser,updateUser}