import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Question } from "../models/question.models.js";
import { User } from "../models/user.models.js";
import mongoose, { mongo } from "mongoose";
import checkForProfanity from "../utils/profanityChecker.js";

const postQuestion = asyncHandler(async (req,res)=>
{
    try {
        const {question, isAnonymous} =  req.body;
        const isContentProfane = await checkForProfanity(question   )

      if ( isContentProfane) {
         throw new ApiError(400,"Contains explicit content and cannot be submitted")
     }

        const owner = await User.findById(req.user._id).select(
            "-password -refreshToken" 
        ) ; 
        const nameOfOwner = owner.name 
        // if(
        //     [question].some((field)=>{
        //        field?.trim()===""
        //     })
        //    )
        //    {
        //        throw new ApiError(400,"The Above Field are Compulsory")
        //    }
        
        if ([question].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "The Above Field are Compulsory");
        }

        const response = await Question.create({question,owner,isAnonymous,nameOfOwner})
                   
        return res.status(200).
        json(new ApiResponse(200,{response},"Question Posted Successfully"))
    } catch (error) {
        const statusCode = error.statusCode || 500; 
        const message = error.message || "Something went wrong";
        return res.status(statusCode).json({ success: false, message })
    }
    
})

// const showQuestions = asyncHandler(async (req,res) => {
    
//     const search = req.query.search || "";
//     const page =  parseInt(req.query.page)-1 || 0 
//     const limit = 5 
//     const sort = { length: -1 };
//     const response = await Question.find({question :{$regex:search,$options:"i"}})
//     .sort({ createdAt: -1 })
//     .skip(page*limit)
//     .limit(limit)

//     return res.status(200)
//     .json(new ApiResponse(200,
//         response,
//         "Questions fetched successfully"))

// })

const showQuestions = asyncHandler(async (req, res,next) => {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = 5;
    let sort ;
    
    switch (req.query.sort) {
        case 'oldest':
            sort = { createdAt: 1 }; 
            break;
        default:
            sort = { createdAt: -1 }; 
            break;
    }

    const questions = await Question.aggregate([
        {
            $match: { question: { $regex: search, $options: "i" } }
        },
        {
            $sort:  sort
        },
        {
            $skip: page * limit
        },
        {
            $limit: limit
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails"
            }
        },
        {
            $project: {
                question: 1,
                isAnonymous:1,
                nameOfOwner: { $arrayElemAt: ["$ownerDetails.name", 0] },
                createdAt: 1,
                profilePicture: { $arrayElemAt: ["$ownerDetails.profilePicture", 0] },
                ownerId:{ $arrayElemAt: ["$ownerDetails._id", 0] }
            }
        }
    ]);

    const total = await Question.countDocuments({
        question: { $regex: search, $options: "i" },
    });
    const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        questions,
    };
    return res.status(200).json(new ApiResponse(200, response, "Questions fetched successfully"));
});

const getQuestion = asyncHandler(async (req,res) => {
    
    const {questionId} = req.params

    const question = await Question.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(questionId)
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
                // title:1,
                question:1,
                isAnonymous:1,
                nameOfOwner: { $arrayElemAt: ["$ownerDetails.name", 0] },
                createdAt:1,
                profilePicture: { $arrayElemAt: ["$ownerDetails.profilePicture", 0] },
                ownerId: { $arrayElemAt: ["$ownerDetails._id", 0] }
            }
        }
    ])

    if(!question?.length)
    {
        throw new ApiError(401,"Question not found!!!")
    }
    return res.status(200)
    .json(new ApiResponse(200,
        question[0],
        "Question fetched successfully"))
})



export {postQuestion, showQuestions, getQuestion}