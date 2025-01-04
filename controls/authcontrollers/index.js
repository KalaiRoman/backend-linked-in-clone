import express from 'express';
import { changeProfilePic, CreateUser, favoritePosts, getUser, Login, UpdateUser } from './authControl.js';
import verifyToken from './../../middleware/Token.js';
import upload from './../../middleware/Multer.js';
const authRouter=express.Router();
authRouter.post("/register",CreateUser);
authRouter.post("/login",Login);
authRouter.get("/getUser",verifyToken,getUser);
authRouter.put("/updateUser",verifyToken,UpdateUser);
authRouter.put("/update-profile-Image",upload.single("image"),verifyToken,changeProfilePic);
authRouter.put("/update-profile/:id",verifyToken,favoritePosts);

export default authRouter;