import mongoose from "mongoose";
import envFile from "./EnvTexts.js";
const connectDataBase = async () => {
    try {
        await mongoose.connect(envFile.mongo_url)
            .then(() => {
                console.log("Database connected successfully");
            }).catch((error)=>{
                console.log(error);
                process.exit(1);
            })
    } catch (error) {
        console.log("Error in connecting to database", error);
    }
};
export default connectDataBase;
