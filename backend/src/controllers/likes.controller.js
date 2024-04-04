import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.models.js";
import { Like } from "../models/likes.models.js";

const likeBlog = async(req, res)=>{
    try{
        const { blogId } = req.params; 
        if(!blogId){
          throw new ApiError(404, "No such blog")
        }
        const blog = await Blog.findById(blogId)
        const {owner} = blog.owner
        
        const likedBy = await User.findById(req.user._id).select(
            "-password -refreshToken -profilePicture" 
        ) ;
        const name = likedBy.name;
        //console.log(blog.owner);
        try {
          const existingLike = await Like.findOne({ blog: blogId, likedBy: req.user._id });
          
        if (existingLike) {
          await Like.findByIdAndDelete(existingLike.id)
          res.status(200).json(new ApiResponse(200,{},
            "Unliked successfully"))
        }
        else{
            const likedObject = await Like.create({blog:blog,
              likedBy:likedBy,blogOwnerId:blog.owner})
            //likedObject.save()
            res.status(200).json(new ApiResponse(200,{},
              "Liked successfully"))
          }
        } catch (error) {
          console.log(error)
          res.status(400).json("Failed to like blog")
        }       
        
    }
   catch (error) {
    res.status(401).json( "Failed to like blog")
    }
}

const getLikesCount = async(req, res)=>{

  try {
    const { blogId } = req.params;
    const userId = req.user._id ; 
    const blogName=await Blog.findById(blogId);
    const likesCount = await Like.countDocuments({ blog:blogId });
    const existingLike = await Like.findOne({ blog: blogId, likedBy:userId });
    const isLiked = (existingLike) ? true : false ;
   // console.log(isLiked);
    res.status(200).json(new ApiResponse(200,{likesCount,blogName,isLiked},"likes fetched succesfully"));
  } catch (error) {
      res.status(500).json(error)
  }
}

const getTopVoices = asyncHandler(async (req,res) => {

  const likesTable = await User.aggregate([
    {
      $lookup:{
        from:"likes",
        localField:"_id",
        foreignField:"blogOwnerId",
        as : "myLikes",
        pipeline:[
          {
            $lookup:{
              from:"users",
              localField:"blogOwnerId",
              foreignField:"_id",
              as:"owners"
            }
          }
        ]
      }
    },
    {
        $addFields:{
          likesCount:{
            $size:"$myLikes"
          }
        }
    },
    {
      $project:{
        name:1,
        email:1,
        profilePicture:1,
        likesCount:1

      }
    }
  ]).sort({likesCount:-1})


  return res.status(200).json(new ApiResponse(200,likesTable,"Top Voice Table fetched successfully"))


})


export { likeBlog, getLikesCount,getTopVoices}
