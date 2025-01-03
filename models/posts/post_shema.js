import mongoose from "mongoose";

const post_shema=post_shema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    title:{type:String},
    description:{type:String},
    image:{
        type:String,
        default:""
    },
    createdDate:{
        type:Date(),
        default:Date.now(),
    }
},
{
    timestamps:true
})
mongoose.model={};
export default mongoose.model("Post",post_shema);