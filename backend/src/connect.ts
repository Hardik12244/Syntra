import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export default async function connectDB() {
    const MONGO_URL = process.env.MONGO_URL;
    if (!MONGO_URL) {
        throw new Error("Mongo not available")
    }

    await mongoose.connect(MONGO_URL);
}

