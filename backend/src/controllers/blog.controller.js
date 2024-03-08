
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.models.js";


const postBlog = asyncHandler(async (req,res)=>
{
    try {
        const {title,content} =  req.body;
        //console.log(title,content);
        const owner = await User.findById(req.user._id).select(
            "-password -refreshToken" 
        ) ;
        //console.log(owner);
        if(
            [title,content].some((field)=>{
               field?.trim()===""
            })
           )
           {
               throw new ApiError(400,"The Above Field are Compulsory")
           }
        //console.log("before creatre");
        const blog = await Blog.create({title,content,owner})
        //console.log(blog);
           
        return res.status(200).
        json(new ApiResponse(200,{blog},"Blog Posted Successfully"))
    } catch (error) {
        throw new ApiError(401,error.messsage)
    }

    
})

export {postBlog}