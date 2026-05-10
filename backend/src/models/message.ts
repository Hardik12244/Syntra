import mongoose from "mongoose";

type MessageType = {
    senderId: mongoose.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId,
    text: string,
}

const messageSchema = new mongoose.Schema<MessageType>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    text: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

const Message = mongoose.model<MessageType>("Message", messageSchema);

export default Message;