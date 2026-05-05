import { Server, Socket } from "socket.io";

const onlineUsers: Record<string, string> = {};

export const initSocket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("User connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });

        socket.on("send_message", (message) => {
            const { senderId, receiverId, text } = message;
            const receiverSocketId = onlineUsers[receiverId];
            const senderSocketId = onlineUsers[senderId];
            
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receive_message", message);
                socket.emit("receive_message", message);
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