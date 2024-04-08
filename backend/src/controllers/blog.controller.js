
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.models.js";
import mongoose, { mongo } from "mongoose";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import checkForProfanity from "../utils/profanityChecker.js";



const postBlog = asyncHandler(async (req,res)=>
{
    try {
        const {title,content} =  req.body;

        let blogPicturePath;
        if (req.files && Array.isArray(req.files.blogPicture) && req.files.blogPicture.length > 0) {
            blogPicturePath = req.files.blogPicture[0].path
        }
        const blogPicture = await uploadOnCloudinary(blogPicturePath)

        const isTitleProfane = await checkForProfanity(title);
        const isContentProfane = await checkForProfanity(content);

        if (isTitleProfane || isContentProfane) {
            await deleteFromCloudinary(blogPicture.public_id)
            throw new ApiError(400, "Contains explicit content and cannot be submitted");
        }

        // Check if title and content are empty
        if ([title, content].some(field => field?.trim() === "")) {
            throw new ApiError(400, "Title and content are compulsory fields");
        }

        const owner = await User.findById(req.user._id).select(
            "-password -refreshToken" 
        ) ;
        const nameOfOwner = owner.name 
        if(
            [title,content].some((field)=>{
               field?.trim()===""
            })
           )
           {
               throw new ApiError(400,"The Above Field are Compulsory")
           }
        
        const blog = await Blog.create({title,content,owner,nameOfOwner,blogPicture: blogPicture?.url || ""})
           
        return res.status(200).
        json(new ApiResponse(200,{blog},"Blog Posted Successfully"))
    } catch (error) {
        console.error('Error in postBlog:', error);
        const statusCode = error.statusCode || 500; 
        const message = error.message || "Something went wrong";
        return res.status(statusCode).json({ success: false, message })
    }

    
})

const showBlogs = asyncHandler(async (req,res) => {
    
    const search = req.query.search || "";
    const page =  parseInt(req.query.page)-1 || 0 
    const limit = 5 
    let sort ;
    
    switch (req.query.sort) {
        case 'oldest':
            sort = { createdAt: 1 }; 
            break;
        case 'most_liked':
            sort = { likesCount: -1 }; 
            break;
        default:
            sort = { createdAt: -1 }; 
            break;
    }

    const blog = await Blog.aggregate([
        {
            $match :{
                title :{
                    $regex : search ,
                    $options : "i" ,
                }
            }
        },
        {
            $lookup:{
                from : "users" ,
                localField : "owner" ,
                foreignField : "_id" ,
                as: "ownerDetails"
            }
        },
        {
            $lookup:{
                from : "likes" , 
                localField: "_id" ,
                foreignField : "blog" ,
                as : "likesOnBlog"
            }
        },
        {
            $addFields : {
                likesCount : {
                    $size:"$likesOnBlog"
                }
            }
        },
        {
            $project:{
                content:1,
                title:1,
                createdAt:1,
                blogPicture:1,
                ownerName:  { $arrayElemAt: ["$ownerDetails.name", 0] },
                profilePicture: { $arrayElemAt: ["$ownerDetails.profilePicture", 0] },
                ownerId: { $arrayElemAt: ["$ownerDetails._id", 0] },
                likesCount:1 
            }
        }
    ])
    .sort(sort)
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
                createdAt:1,
                profilePicture: { $arrayElemAt: ["$ownerDetails.profilePicture", 0] },
                nameOfOwner: { $arrayElemAt: ["$ownerDetails.name", 0] },
                ownerId: { $arrayElemAt: ["$ownerDetails._id", 0] },
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

const deleteBlog = asyncHandler(async (req,res) => {

    const {blogId} = req.params 
    await Comment.deleteMany({blogId:blogId})
    const blog = await Blog.findByIdAndDelete(blogId)

    if(!blog)
    {
        throw new ApiError(401,"Blog not found")
    }

    return res.status(200)
    .json(new ApiResponse(200,
        blog,"blog deleted successfully"))
})



export {postBlog,showBlogs,getBlog, deleteBlog}