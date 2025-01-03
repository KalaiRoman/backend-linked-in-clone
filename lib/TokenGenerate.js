import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const TokenGenerate = (userId) => {
    try {
        if (!userId) {
            throw new Error("User ID is required to generate a token");
        }
        const token = jwt.sign(
            { user: userId }, 
            process.env.jwtSecret, 
            { expiresIn: "2d" } 
        );

        return token;

    } catch (error) {
        throw error; 
    }
};
