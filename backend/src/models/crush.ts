import mongoose from "mongoose";

interface Crush extends Document {
    sender: mongoose.Types.ObjectId,
    receiver:mongoose.Types.ObjectId,
}

const crushSchema = new mongoose.Schema<Crush>({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    }
},{timestamps:true})

const Crush = mongoose.model<Crush>("Crush", crushSchema);

export default Crush;