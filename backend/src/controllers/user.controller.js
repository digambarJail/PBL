import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { Blog } from "../models/blog.models.js";
import { uploadOnCloudinary , deleteFromCloudinary} from "../utils/cloudinary.js";
import nodemailer from "nodemailer"
import bycrypt from "bcrypt";
import {Like} from "../models/likes.models.js"
import {Comment} from "../models/comment.model.js"
import { Answer } from "../models/answer.model.js";
import { Question } from "../models/question.models.js";



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
        const {name, email, password, department,year} = req.body;
        const existedUser = await User.findOne({ email })

        if (existedUser) {
            console.log(existedUser);
            throw new ApiError(409, "User with email already exists")
            
        }

        //const profilePicturePath = req.files?.avatar[0]?.path

        let profilePicturePath;
        if (req.files && Array.isArray(req.files.profilePicture) && req.files.profilePicture.length > 0) {
            profilePicturePath = req.files.profilePicture[0].path
        }

        if(!profilePicturePath)
        {
            throw new ApiError(400,"Profile Picture required")
        }

        const profilePicture = await uploadOnCloudinary(profilePicturePath)
        if(!profilePicture)
        {
            throw new ApiError(400,"Profile Picture required")
        }

        const user = await User.create({name, email, password,year,department,profilePicture: profilePicture.url , profilePictureId:profilePicture.public_id})
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
           )
        res.status(201).json(createdUser);
    } catch (error) {
        console.log("Outside try block",error.message)
        res.status(500).json({ error: error.message });
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


const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body    

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const forgetPassword = asyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: "10m",});
  
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_APP_EMAIL,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Reset Password",
        html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="http://localhost:5173/resetPassword/${token}">http://localhost:5173/resetPassword/${token}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res.status(200).send({ message: "Email sent" });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    try {
        const {tokenId} = req.params
      const decodedToken = jwt.verify(
        tokenId,
        process.env.JWT_SECRET_KEY
      );
  
      if (!decodedToken) {
        return res.status(401).send({ message: "Invalid token" });
      }
  
      const user = await User.findOne({ _id: decodedToken.userId });
      console.log("user",user);
      if (!user) {
        return res.status(401).send({ message: "no user found" });
      }
      
  
      user.password = req.body.newPassword;
      await user.save();
  
      res.status(200).send({ message: "Password updated" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
})

const changeProfilePicture = asyncHandler(async (req , res) => {
    const publicId = req.user.profilePictureId ;
    console.log(publicId);
    const response = await deleteFromCloudinary(publicId) ;
    const user = await User.findById(req.user?._id)
    //console.log(user);
    let profilePicturePath;
        if (req.files && Array.isArray(req.files.profilePicture) && req.files.profilePicture.length > 0) {
            profilePicturePath = req.files.profilePicture[0].path
        }

        if(!profilePicturePath)
        {
            throw new ApiError(400,"Profile Picture required")
        }

        const profilePicture = await uploadOnCloudinary(profilePicturePath)
        if(!profilePicture)
        {
            throw new ApiError(400,"Profile Picture required")
        }
    
        user.profilePicture = profilePicture.url
        user.profilePictureId = profilePicture.public_id
        //console.log(profilePicture.url);
        user.save({validateBeforeSave: false})
        const updatedUser = await User.findById(req.user?._id).select(
            "-password -refreshToken"
        )
        //console.log(updatedUser.profilePicture);
        return res.status(200).json(
         new ApiResponse( 200 , updatedUser , "profile picture updated successfully")
        )
      

    
})

const likedBlogs = asyncHandler(async (req,res) => {
    
    const Blogs = await User.aggregate([
        {
            $match:{
                _id : new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup:{
                from : "likes" ,
                localField : "_id" ,
                foreignField : "likedBy" ,
                as : "likedBlogs"  ,
                pipeline : [
                    {
                        $lookup:{
                            from : "blogs" ,
                            localField : "blog" ,
                            foreignField : "_id" ,
                            as : "blogs" 
                        }
                    },
                    {
                        $unwind: "$blogs"
                    },
                    {
                        $lookup:{
                            from : "users" ,
                            localField:"blogs.owner" ,
                            foreignField : "_id" ,
                            as : "ownerDetails" 
                        }
                    },
                    {
                        $project:{
                            "_id": "$blogs._id",
                            "owner" : "$blogs.owner" ,
                            "title": "$blogs.title",
                            "content": "$blogs.content",
                            "createdAt": "$blogs.createdAt",
                            "blogPicture": { $ifNull: ["$blogs.blogPicture", ""] } ,
                            "ownerDetails": {
                                $arrayElemAt: [
                                    {
                                        $map: {
                                            input: "$ownerDetails",
                                            as: "ownerDetails",
                                            in: {
                                                _id: "$$ownerDetails._id",
                                                name: "$$ownerDetails.name",
                                                profilePicture: "$$ownerDetails.profilePicture"
                                            }
                                        }
                                    },
                                    0
                                ]
                            }
                        }
                    },
                    {
                        $sort : {createdAt : -1}
                    }
                ]
            }
        }
    ])

    return res.status(200)
    .json(new ApiResponse(200 , Blogs[0].likedBlogs , "likes blogs fetched successfully"))
 })



const getUser = asyncHandler(async (req,res)=> {

    const {userId} = req.params ;
    
    const user = await User.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from:"blogs",
                localField:"_id",
                foreignField:"owner",
                as:"userBlogs" ,
                pipeline:[{
                    $sort:{createdAt : -1}
                }]
            }
        },
        
        {
            $lookup:{
                from:"questions",
                localField:"_id",
                foreignField:"owner",
                as:"userQuestions" ,
                pipeline:[{
                    $sort:{createdAt : -1}
                }]
            }
        },
        {
            $lookup:{
                from:"answers",
                localField:"_id",
                foreignField:"answerBy",
                as:"userAnswers" ,
                pipeline:[{
                    $sort:{createdAt : -1}
                }]
            }
        },
        {
            $project:{
                name:1,
                profilePicture:1,
                email:1,
                "department":{ $ifNull: ["$department", ""] },
                "year":{ $ifNull: ["$year", ""] },
                userBlogs:1,
                userQuestions:1,
                userAnswers:1

            }
        }
    ])

    if(!user)
    {
        throw new ApiError(404, "user not found")   }

    return res.status(200)
    .json(new ApiResponse(200,user,"user fetched successfully"))



})

const deleteAccount = asyncHandler(async(req, res)=>{
    try {
        const userId = await User.findById(req.params.userId);
        await Like.deleteMany({likedBy:userId})
        await Comment.deleteMany({commentBy:userId})
        await Answer.deleteMany({answerBy:userId})
        await Question.deleteMany({owner:userId})
        await Blog.deleteMany({owner:userId})
        

        const options = {
            httpOnly: true,
            secure: true,
            expires: new Date(0) 
        };

        res.clearCookie("accessToken", options)
        res.clearCookie("refreshToken", options);

        await User.findByIdAndDelete(userId);

        return res
        .json(new ApiResponse(200, userId, "Account deleted successfully"))
    } catch (error) {
        console.log(error);
    }
})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    google,
    myBlogs,
    changeCurrentPassword,
    forgetPassword,
    resetPassword,
    changeProfilePicture,
    likedBlogs,
    getUser,
    deleteAccount
}