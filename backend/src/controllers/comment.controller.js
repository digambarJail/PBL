import mongoose from "mongoose";
import { Blog } from "../models/blog.models.js";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const postComment = asyncHandler(async (req,res) => {

   try {
      const {blogId} = req.params 
      const {content} = req.body
      const commentBy = req.user._id 
      const ownerName = req.user.name
   
      //console.log(ownerName);
      //console.log({commentBy});
   
      if(!content)
      {
         throw new ApiError(401,"Cant post empty field")
      }
      const comment = await Comment.create({content,commentBy,blogId,ownerName})
   
      return res.status(200).
      json(new ApiResponse(200,{},
         "Comment posted successfully"))
   } catch (error) {
      throw new ApiError(501,"internal server error")
   }

})

const getComments = asyncHandler(async (req,res) => {

   const {blogId} = req.params
   const comment = await Blog.aggregate([
      {
            $match:{
               _id:new mongoose.Types.ObjectId(blogId)
            }
      },
      {
         $lookup:{
            from:"comments",
            localField:"_id",
            foreignField:"blogId",
            as:"blogComments" ,
            pipeline :[
               {
                  $lookup:{
                     from: "users" ,
                     localField:"commentBy" ,
                     foreignField:"_id" ,
                     as:"userDetails" ,
                     pipeline:[
                        {
                           $project:{
                              name:1,
                              profilePicture:1,
                              _id:1
                           }
                        }
                     ]

                  }
               }
            ]
         }
      }
   ])

   if(!comment?.length)
   {
      throw new ApiError(401,"NO COMMENTS")
   }

   //console.log(comment[0].blogComments);

   return res.status(200).
   json(new ApiResponse(200,
      comment,
      "Comments fetched successfully"))
})

export {postComment,getComments}