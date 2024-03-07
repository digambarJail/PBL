import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from 'bcrypt';
// import jwt from "jsonwebtoken"
// import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async(userId)=>{
    try{
        const user = await User.findById(userId)
        const accesstoken = user.generateAccessToken();
        const refreshtoken = user.generateRefreshToken();

        user.refreshtoken = refreshtoken;
        await user.save({validateBeforeSave: false})

        return {accesstoken,refreshtoken}

    }catch(error){
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async(req, res)=>{

    try {
        const {name, email, password} = req.body;
        const existedUser = await User.findOne({ email })

        if (existedUser) {
            console.log(existedUser);
            throw new ApiError(409, "User with email already exists")
            
        }

        const user = await User.create({name, email, password})

        res.status(201).json(user);
    } catch (error) {
        console.log("Outside try block",error)
    }

    
});

const loginUser = asyncHandler( async (req, res) => {
    try {
        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase(); // Normalize email to lowercase
        const user = await User.findOne({ email: normalizedEmail });
        
        if (!user) {
            return res.status(404).json('User Does Not Exist!');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.json('Login Successful!');
        } else {
            res.status(401).json('The password is incorrect');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


export {
    registerUser,
    loginUser
}