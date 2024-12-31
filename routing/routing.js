import express from 'express';
import authRouter from '../controls/authcontrollers/index.js';

const router=express.Router();

router.use("/auth",authRouter);

export default router;