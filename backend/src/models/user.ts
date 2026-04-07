import mongoose, { Document } from "mongoose";

interface User extends Document{
    name : string,
    email: string,
    phoneNo:string,
    avatar: string,
    college:string,
    interests:string[],
}

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
    },
    email: {
    type: String,
    unique: true,
    sparse: true,
  },
    phoneNo: {
    type: String,
    unique: true,
    sparse: true,
  },
    avatar: String,
    college: String,
    interests: [String],
    
},{timestamps:true})

const User = mongoose.model<User>("User",userSchema);

export default User;