import User from "../models/userModel.js";
import Jwt from "jsonwebtoken";

const authentiacteToken = async (req, res, next) => {
    
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        
        if(!token) {
            return res.status(401).json({
                success: false,
                error: "Access denied"
            });
        }

        req.user = await User.findById(
            Jwt.verify(token, process.env.JWT_SECRET).userId
        );

        console.log(req.user);
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        });
        console.log(`authMiddleware.authentiacteToken: error = ${error}`);
        next(error);
    }
}

export { authentiacteToken };