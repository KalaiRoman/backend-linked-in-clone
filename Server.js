import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDataBase from './lib/db.js';
import router from './routing/routing.js';
dotenv.config();
const app=express();
app.use(express.json());
connectDataBase();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:"*"
}))
app.use("/linked-in/",router)
app.get("/",(req,res)=>{
    res.send("backend is running")
})
app.listen(8009,()=>{
    console.log("server is running!! 8009")
})