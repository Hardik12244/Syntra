import { Server, Socket } from "socket.io";
import Message from "../models/message";

const onlineUsers: Record<string, string> = {};

export const initSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        socket.on("disconnect", () => {
            // cleanup if needed
            for (const [userId, sId] of Object.entries(onlineUsers)) {
                if (sId === socket.id) {
                    delete onlineUsers[userId];
                    break;
                }
            }
        });

        socket.on("send_message", async (message) => {
            try {
                const { senderId, receiverId, text } = message;
                const receiverSocketId = onlineUsers[receiverId];

                const savedMessage = await Message.create({
                    senderId,
                    receiverId,
                    text
                });

                // Always emit back to sender so UI updates cleanly
                socket.emit("receive_message", savedMessage);

                // If receiver is online and not same socket, send to them
                if (receiverSocketId && receiverSocketId !== socket.id) {
                    io.to(receiverSocketId).emit("receive_message", savedMessage);
                }
            } catch (err) {
                socket.emit("error", { msg: "Failed to send message" });
            }
        });

        socket.on("join", (userId) => {
            if (userId) {
                onlineUsers[userId] = socket.id;
            }
        });
    });
};