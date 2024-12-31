import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: { type: String },
    phoneNo: { type: Number },
    email: { type: String, unique: true, required: true },
    password: { type: String }, 
    role: { type: String, enum: ["admin", "user"], default: "user" },
    avatar: { type: String },
    connectUsers: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        }
    ],
    status: { type: String, default: "active", enum: ["active", "inactive"] }
},
{timestamps:true});
const User = mongoose.model("User", userSchema);
export default User;
