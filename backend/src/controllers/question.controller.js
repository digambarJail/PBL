import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Question } from "../models/question.models.js";
import { User } from "../models/user.models.js";


const postQuestion = asyncHandler(async (req,res)=>
{
    try {
        const {question} =  req.body;
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

        const response = await Question.create({question,owner,nameOfOwner})
                   
        return res.status(200).
        json(new ApiResponse(200,{response},"Question Posted Successfully"))
    } catch (error) {
        throw new ApiError(401,error.message)
    }
    
})

const showQuestions = asyncHandler(async (req,res) => {
    
    const search = req.query.search || "";
    const page =  parseInt(req.query.page)-1 || 0 
    const limit = 5 
    const sort = { length: -1 };
    const response = await Question.find({question :{$regex:search,$options:"i"}})
    .sort({ createdAt: -1 })
    .skip(page*limit)
    .limit(limit)

    return res.status(200)
    .json(new ApiResponse(200,
        response,
        "Questions fetched successfully"))

})
export {postQuestion, showQuestions}