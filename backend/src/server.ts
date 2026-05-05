import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import connectDB from "./connect";
import userRoutes from './routes/user'
import postRoutes from "./routes/post";
import crushRoutes from "./routes/crush";
import matchRoutes from "./routes/match";
import authRoutes from "./routes/auth"
import searchRoutes from "./routes/search"
import { initSocket } from "./socket/socket";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

initSocket(io);

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use("/crush", crushRoutes);
app.use("/match", matchRoutes);
app.use("/auth", authRoutes);
app.use("/search", searchRoutes);

const PORT = process.env.PORT || 3000;

async function connect() {
    try {
        await connectDB();
        console.log("db connected");
        // app.listen(PORT, () => {
        //     console.log("Backend running at", PORT);
        // });
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.log("error", err);
    }

}
connect();


