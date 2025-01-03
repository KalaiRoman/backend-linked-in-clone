import jwt from 'jsonwebtoken';
import User from '../models/auth/user_shema.js';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization.split(" ")[1];
    if (!authHeader) {
      return res.status(401).json({ message: "Authentication token is required" });
    }
    const token = authHeader;
    if (!token) {
      return res.status(401).json({ message: "Token is missing or invalid" });
    }

    jwt.verify(token, process.env.jwtSecret, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      const findUser = await User.findById(decoded?.user);
      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }
      req.user = findUser; 
      next(); 
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyToken;
