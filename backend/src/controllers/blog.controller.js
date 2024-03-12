
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
        const nameOfOwner = owner.name 
        console.log(owner);
        if(
            [title,content].some((field)=>{
               field?.trim()===""
            })
           )
           {
               throw new ApiError(400,"The Above Field are Compulsory")
           }
        //console.log("before creatre");
        const blog = await Blog.create({title,content,owner,nameOfOwner})
        //console.log(blog);
           
        return res.status(200).
        json(new ApiResponse(200,{blog},"Blog Posted Successfully"))
    } catch (error) {
        throw new ApiError(401,error.messsage)
    }

    
})

const showBlogs = asyncHandler(async (req,res) => {
    
    const search = req.query.search || "";
    const page =  parseInt(req.query.page)-1 || 0 
    const limit = 5 
    const sort = { length: -1 };
    const blog = await Blog.find({title :{$regex:search,$options:"i"}})
    .sort({ createdAt: -1 })
    .skip(page*limit)
    .limit(limit)

    return res.status(200)
    .json(new ApiResponse(200,
        blog,
        "Blogs fetched successfully"))

})

const getBlog = asyncHandler(async (req,res) => {

    const {blogId} = req.params
    const blog = await Blog.findById(blogId);
    //console.log(blog);
    if(!blog)
    {
        throw new ApiError(401,"Blog not found!!!")
    }
    return res.status(200)
    .json(new ApiResponse(200,
        blog,
        "Blog fetched successfully"))
})

export {postBlog,showBlogs,getBlog}