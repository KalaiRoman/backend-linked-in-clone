import express from 'express';
import { CreateUser } from './authControl.js';

const authRouter=express.Router();

authRouter.post("/register",CreateUser)

export default authRouter;