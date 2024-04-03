
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.models.js";
import mongoose, { mongo } from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


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
        console.log("before upload");
        let blogPicturePath;
        if (req.files && Array.isArray(req.files.blogPicture) && req.files.blogPicture.length > 0) {
            blogPicturePath = req.files.blogPicture[0].path
        }
        const blogPicture = await uploadOnCloudinary(blogPicturePath)
        console.log("after upload");
        const blog = await Blog.create({title,content,owner,nameOfOwner,blogPicture: blogPicture?.url || ""})
           
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
    const total = await Blog.countDocuments({
        title: { $regex: search, $options: "i" },
    });
    const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        blog,
    };

    return res.status(200)
    .json(new ApiResponse(200,
        response,
        "Blogs fetched successfully"))

})

const getBlog = asyncHandler(async (req,res) => {

    // const {blogId} = req.params
    // const blog = await Blog.findById(req.params.blogId);
    // //console.log(blog);
    
    // const ownerDetails = User.findOne(blog.owner) ;
    // const profilePicture = ownerDetails.profilePicture ;
    // blog.profilePicture = profilePicture ;
    // console.log(blog);
    
    const {blogId} = req.params

    const blog = await Blog.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(blogId)
            }
        },
        {
            $lookup:{
                from :"users",
                localField:"owner",
                foreignField: "_id",
                as : "ownerDetails"
            }
        },
        {
            $project:{
                title:1,
                content:1,
                nameOfOwner:1,
                createdAt:1,
                profilePicture: { $arrayElemAt: ["$ownerDetails.profilePicture", 0] },
                blogPicture:1
            }
        }
    ])

    if(!blog?.length)
    {
        throw new ApiError(401,"Blog not found!!!")
    }
    return res.status(200)
    .json(new ApiResponse(200,
        blog[0],
        "Blog fetched successfully"))
})



export {postBlog,showBlogs,getBlog}