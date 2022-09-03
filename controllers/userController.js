import User from '../models/userModel.js';
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// @desc    create user
// @route   POST /users/register
// @access  
const createUser = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    try {
        console.log(`User: ${req.body.username} is trying to register`);
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        });
        console.log(`photoController.createPhoto: error = ${error}`);
        next(error);
    }
});

// @desc    login user
// @route   POST /users/login
// @access
const loginUser = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    try {
        console.log(`User: ${req.body.username} is trying to login`);
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        let same = false;
        if(user) {
            same = await bcrypt.compare(password, user.password);
        } else {
            return res.status(401).json({
                success: false,
                error: "User not found"
            });
        } 

        if(same) {
            res.status(200).json({
                success: true,
                user: user
            });
        }
        else {
            res.status(401).json({
                success: false,
                error: "Invalid password"
            });
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error
        });
        console.log(`userController.loginUser: error = ${error}`);
        next(error);
    }
});


export { createUser, loginUser };