import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


const generateAccessAndRefreshTokens = async(userId)=>{
    try{
        const user = await User.findById(userId)
       
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false})

        return {accessToken,refreshToken}

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
        const normalizedEmail = email.toLowerCase(); 
        const user = await User.findOne({ email: normalizedEmail });
        
        if (!user) {
            return res.status(404).json('User Does Not Exist!');
        }

        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            throw new ApiError(401,"Invalid credentials!")
        } 

        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
        
        const loggedInUser = await User.findById(user._id).
        select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in succeessfully"
            )
        )


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const logoutUser = asyncHandler(async(req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
        
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"))
    
})


export {
    registerUser,
    loginUser,
    logoutUser
}