import mongoose from "mongoose";

interface Match extends Document {
    user1: mongoose.Types.ObjectId,
    user2:mongoose.Types.ObjectId,
}

const matchSchema = new mongoose.Schema<Match>({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    }
},{timestamps:true})

const Match = mongoose.model<Match>("Match", matchSchema);

export default Match;