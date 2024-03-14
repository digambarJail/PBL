import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Blog } from "../models/blog.models.js";
import { Like } from "../models/likes.models.js";

const likeBlog = async(req, res)=>{
    try{
        const { blogId } = req.params; 
        if(!blogId){
          throw new ApiError(404, "No such blog")
        }
        const blog = await Blog.findById(blogId)
        
        const likedBy = await User.findById(req.user._id).select(
            "-password -refreshToken -profilePicture" 
        ) ;
        const name = likedBy.name;
        
        try {
          const likedObject = await Like.create({blog:blog,
             likedBy:likedBy})
          likedObject.save()
          res.status(200).json(new ApiResponse(200,{},
            "Liked successfully"))
        } catch (error) {
          console.log(error)
          res.status(400).json("")
        }       
        
    }
   catch (error) {
    res.status(401).json( "Failed to like blog")
    }
}

const getLikesCount = async(req, res)=>{

  try {
    const { blogId } = req.params;
    const blogName=await Blog.findById(blogId);
    const likesCount = await Like.countDocuments({ blog:blogId });
    res.json({ likesCount, blogName });
  } catch (error) {
    res.status(500)
  }
}

export { likeBlog, getLikesCount }
