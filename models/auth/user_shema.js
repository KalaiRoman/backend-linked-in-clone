import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: { type: String,trim:true },
    phoneNo: { type: Number },
    email: { type: String, unique: true, required: true,trim:true },
    password: { type: String,trim:true }, 
    role: { type: String, enum: ["admin", "user"], default: "user" },
    avatar: { type: String },
    backgroundImg:{type:String},
    connectedUsers: [
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
    userStatus:{type:Boolean,default:true},
    createdDate:{type:Date,default:Date.now()},
    favoritePost:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Post"
        }
    ],
    connectionRequest:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }
    ],
    rejectRequest:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User"
        }
    ],
    
},
{timestamps:true});
const User = mongoose.model("User", userSchema);
export default User;
