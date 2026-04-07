import dotenv from "dotenv";
import express from "express";
import connectDB from "./connect";
import userRoutes from './routes/user'
import postRoutes from "./routes/post";
import crushRoutes from "./routes/crush";
import matchRoutes from "./routes/match";
import authRoutes from "./routes/auth"
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use('/user',userRoutes);
app.use('/post',postRoutes);
app.use("/crush", crushRoutes);
app.use("/match", matchRoutes);
app.use("/auth", authRoutes);


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


