import mongoose, { Document } from "mongoose";

interface User extends Document{
    name : string,
    phoneNo:string,
    college:string,
    interests:string[],
    intent:string
}

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
    },
    phoneNo: {
        type: String,
        unique: true,
        required: true,
    },
    college: {
        type: String,
    },
    interests: {
        type: [String],
        required: true,
    },
    intent:{
        type:String,
        required:true,
    },
},{timestamps:true})

const User = mongoose.model<User>("User",userSchema);

export default User;