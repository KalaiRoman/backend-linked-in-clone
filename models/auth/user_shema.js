import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: { type: String },
    phoneNo: { type: Number },
    email: { type: String, unique: true, required: true },
    password: { type: String }, 
    role: { type: String, enum: ["admin", "user"], default: "user" },
    avatar: { type: String },
    backgroundImg:{type:String},
    connectUsers: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        }
    ],
    educationDetails:{type:Array,default:[]},
    skills:{type:Array,default:[]},
    aboutYourProfile:{type:String,default:""},
    status: { type: String, default: "active", enum: ["active", "inactive"] },
    jobTitle:{type:String},
    location:String,
    website:String,
    openToWork:{type:Boolean,default:false},
    userStatus:{type:Boolean,default:true}
    
},
{timestamps:true});
const User = mongoose.model("User", userSchema);
export default User;
