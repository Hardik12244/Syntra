import { Server, Socket } from "socket.io";
import Message from "../models/message";

const onlineUsers: Record<string, string> = {};

export const initSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("User connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });

        socket.on("send_message", async (message) => {
            const { senderId, receiverId, text } = message;
            const receiverSocketId = onlineUsers[receiverId];

            const savedMessage = await Message.create({
                senderId,
                receiverId,
                text
            })

            if (receiverSocketId) {

                io.to(receiverSocketId).emit("receive_message", savedMessage);
                socket.emit("receive_message", savedMessage);
            } else {
                console.log("User not online");
            }
        });

        socket.on("join", (userId) => {
            onlineUsers[userId] = socket.id;
            console.log("Online users:", onlineUsers);
        });



    });



};