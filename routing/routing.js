import express from 'express';
import authRouter from '../controls/authcontrollers/index.js';
import postRouter from '../controls/poscontrollers/index.js';
import commentRouter from '../controls/commentControllers/index.js';

const router=express.Router();
router.use("/auth",authRouter);
router.use("/post",postRouter);
router.use("/comment",commentRouter);



export default router; 