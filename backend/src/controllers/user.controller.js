import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { Blog } from "../models/blog.models.js";


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
        //const normalizedEmail = email.toLowerCase(); 
        const user = await User.findOne({email});
        
        if (!user) {
            throw new ApiError(404,'User Does Not Exist!')
            // return res.status(404).json('User Does Not Exist!');
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
            secure: true,
            expires: new Date(Date.now() + 86400 * 1000)
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
        secure: true,
        expires: new Date(Date.now() + 86400 * 1000)
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"))
    
})


const refreshAccessToken = asyncHandler(async(req, res)=>{
    const incomingRefreshToken = req.cookies.refreshToken||req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }

   try {
     const decodedToken = jwt.verify(
         incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET
     )
     
 
     const user = await User.findById(decodedToken?._id)
 
     if(!user){
         throw new ApiError(401, "Invalid refresh token")
     }
 
     if(incomingRefreshToken!==user?.refreshToken){
         throw new ApiError(401,"Refresh token is expired or used")
     }
 
     const options = {
         httpOnly: true,
         secure: true
     }
 
     const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id)
 
     return res
     .status(200)
     .cookie("accessToken", accessToken, options)
     .cookie("refreshToken", newRefreshToken, options)
     .json(
         new ApiResponse(
             200,
             {accessToken, newRefreshToken},
             "Access token refreshed"
         )
     )
   } catch (error) {
        throw new ApiError(402, error.message)
   }

})
const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };

 const myBlogs = asyncHandler(async (req,res) => {
    
    console.log(req.user);
    const name = req.user.name;
    
    
    //const blog = await Blog.find({nameOfOwner:{$regex:name,$options:"i"}})

    const blog = await User.aggregate([
        {
            $match:{
                name : name
            }
        },
        {
            $lookup:{
                from : "blogs",
                localField:"name",
                foreignField:"nameOfOwner",
                as:"myBlogs"
            }
        }
    ])

    return res.status(200)
    .json(new ApiResponse(200,blog[0].myBlogs,"blogs fetched"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    google,
    myBlogs
}