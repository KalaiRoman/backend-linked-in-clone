import auth from "../../const/authTexts.js";
import mails from "../../const/fakeMails.js";
import codes from "../../const/statusCodes.js";
import {passwordGenerate} from "../../lib/bcryptPassword.js";
import { TokenGenerate } from "../../lib/TokenGenerate.js";
import User from "../../models/auth/user_shema.js";
import mongoose from "mongoose";

// create user
export const CreateUser = async (req, res, next) => {
    try {
        const { userName, phoneNo, email, password, role, avatar, connectUsers, status } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: auth?.emailExist });
        }
        if (!userName || !email || !password) {
            return res.status(400).json({ message: auth?.validateText });
        }
        const passwordHashed = passwordGenerate(password);
        let isValidDomain = false;
        mails?.forEach((item) => {
            const allowedDomain = item?.split("@")[1].split(".")[0];
            const currentEmailDomain = email?.split("@")[1].split(".")[0];
            if (allowedDomain === currentEmailDomain) {
                isValidDomain = true;
            }
        });

        if (isValidDomain) {
            return res.status(400).json({ message: auth?.mailnotFound });
        }

        const newUser = await User.create({
            userName,
            email,
            phoneNo,
            role: role || "user",
            avatar: avatar || "",
            connectUsers: connectUsers || [],
            status: status || "active",
            password: passwordHashed,
        });

       newUser.password=undefined;
        return res.status(201).json({ message: auth?.userCreated, user: newUser });
    } catch (error) {
        return res.status(500).json({ message: codes?.InternalServerError?.message });
    }
};

// login user
export const Login = async (req, res, next) => {
    try {
        const { userNameOrEmailId, password } = req.body;
        const checkCurrentUser=await User.findOne({
            $or: [
                { email: userNameOrEmailId },
                { userName: userNameOrEmailId }
            ]
    });
        if (!userNameOrEmailId || !password) {
            return res.status(400).json({ message: auth?.UserNameorEmailPasswordarerequired });
        }
        if(checkCurrentUser) {
            const responseToken=TokenGenerate(checkCurrentUser?._id);
            return res.status(200).json({message:auth?.LoginSuccessfull,token:responseToken});
        }
        else
        {
            return res.status(400).json({ message: auth?.UserNotFound });
        }
    } catch (error) {
        return res.status(500).json({ message: codes?.InternalServerError?.message });
    }
};  

// get user
export const getUser = async (req, res) => {
    try {
        const currentUserDetail=await User.findById({_id:req.user?._id}).populate("favoritePost","user title description image likes comments").populate("connectionRequest","userName email avatar openToWork userStatus location ").select("-password");
        if(currentUserDetail)
        {
 return res.status(200).json({message:"Success",user:currentUserDetail});
        }
        else{
            res.status(404).json({message:auth?.UserNotFound});
        }  
    } catch (error) {
        return res.status(500).json({ message: codes?.InternalServerError?.message });
    }
}; 

// update user
export const UpdateUser = async (req, res) => {
    try {
        
        const currentUserDetail=await User.findByIdAndUpdate({_id:req.user?._id},req.body,{new:true});

        if(currentUserDetail)
        {
            res.status(200).json({message:"User Updated"});
        }
        else{
            res.status(404).json({message:auth?.UserNotFound});
        }
      
    } catch (error) {
        return res.status(500).json({ message: codes?.InternalServerError?.message });
    }
}; 


// image upload
export const changeProfilePic=async(req,res)=>{
    try {
        const updateImage=await User.findByIdAndUpdate({_id:req.user?._id},{avatar:req.file.path},{new:true});
        updateImage.password=undefined;
        res.status(200).json({message:"Profile Image Updated",user:updateImage});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: codes?.InternalServerError?.message });
    }
}

// image upload
export const favoritePosts = async (req, res) => {
    try {
        const userId = req.user?._id; 
        const postId = req.params.id; 

        if (!userId || !postId) {
            return res.status(400).json({ message: "User ID or Post ID is missing." });
        }

      
        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isFavorite = user.favoritePost?.includes(postId); 
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                [isFavorite ? "$pull" : "$push"]: { favoritePost: postId }, 
            },
            { new: true }
        ).select("-password"); 

        res.status(200).json({
            message: isFavorite
                ? "Post removed from favorites successfully."
                : "Post added to favorites successfully.",
            favoritePost: updatedUser.favoritePost,
        });
    } catch (error) {
        console.error("Error toggling favorite post:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


// user follow and unfollow

export const followUser = async (req, res) => {
    try {
        const userId = req.user?._id;
        const followId = req.params.id;
        const objectId = new mongoose.Types.ObjectId(followId);
        if (userId.equals(objectId)) {
            return res.status(400).json({ message: "You can't follow yourself" });
        }

        const findUser = await User.findById(userId);
        if (!findUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (findUser.connectionRequest.includes(followId)) {
            findUser.connectionRequest.pull(followId);
            await findUser.save(); 
            return res.status(200).json({ message: "Unfollowed the user successfully" });
        } else {
            findUser.connectionRequest.push(followId);
            await findUser.save(); 
            return res.status(200).json({ message: "Followed the user successfully" });
        }
    } catch (error) {
        console.error("Error following user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
