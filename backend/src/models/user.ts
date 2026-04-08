import mongoose, { Document } from "mongoose";

interface User extends Document {
  name: string,
  email: string,
  phoneNo: string,
  avatar: string,
  college: string,
  dateOfBirth: string,
  gender: string,
  interests: string[],
  isProfileComplete: boolean,

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
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ["male", "female", "other", "prefer_not_to_say"],
    default: "prefer_not_to_say"
  },
  interests: {
    type: [String],
    default: []
  },
  isProfileComplete: {
    type: Boolean,
    default: false
  },

}, { timestamps: true })

const User = mongoose.model<User>("User", userSchema);

export default User;