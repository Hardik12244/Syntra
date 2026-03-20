import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import connectDB from "./connect";
const app = express();
const PORT = process.env.PORT || 3000;


async function server() {
    try {
        await connectDB();
        console.log("db connected");
        app.listen(PORT, () => {
            console.log("Backend running at", PORT);
        });
    } catch (err) {
        console.log("error",err);
    }

}

server();

app.get('/', (req:Request, res:Response) => {
    res.json("hi");
})