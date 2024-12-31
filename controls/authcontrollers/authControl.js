import auth from "../../const/authTexts.js";
import passwordGenerate from "../../lib/bcryptPassword.js";
import User from "../../models/auth/user_shema.js";

export const CreateUser = async (req, res, next) => {
    try {
        const { userName, phoneNo, email, password, role, avatar, connectUsers, status } = req.body;
        const existUser=await User.findOne({email:email});
        if(existUser) { return res.status(404).json({message:auth?.emailExist})}
        if (!userName || !email || !password) {
            return res.status(400).json({ message: auth?.validateText });
        }
        const passwordHashed=await passwordGenerate(password);
        const response = await User.create({
            userName,
            email,
            phoneNo,
            role: role || "user",
            avatar: avatar || "",
            connectUsers: connectUsers || [],   
            status: status || "active",
            password:passwordHashed,
        });
        return res.status(201).json({ message: auth?.userCreated, user: response });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};  

export const Login = async (req, res, next) => {
    try {
        const { userName,email, password } = req.body;
        const existUser=await User.findOne({email:email});
        if(existUser) { return res.status(404).json({message:"User Not Found Please Enter Valid UserName and EmailId"})}
        if (!email || !password) {
            return res.status(400).json({ message: "UserName or Email, and Password are required!" });
        }
      
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};  