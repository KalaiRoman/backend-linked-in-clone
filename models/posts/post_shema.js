import mongoose from "mongoose";

const post_shema=new mongoose.Schema({
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
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    comments:[
        {
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
               }
        }
    ]
},
{
    timestamps:true
})
mongoose.models={};
export default mongoose.model("Post",post_shema);