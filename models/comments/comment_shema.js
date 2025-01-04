import mongoose from "mongoose";

const comment_shema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"",
    },
    userType:{
        type:String,
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
},
{
    timestamps:true
})

mongoose.models={};


export default mongoose.model("Comment",comment_shema);