import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import connectDB from "./connect";
import userRoutes from './routes/user'
import postRoutes from "./routes/post";
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api',userRoutes);
app.use('/post',postRoutes);

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


