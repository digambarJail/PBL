import mongoose from "mongoose";
import { Question } from "../models/question.models.js";
import { Answer } from "../models/answer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const postAnswer = asyncHandler(async (req,res) => {

   try {
      const {questionId} = req.params 
      const {answer} = req.body
      const answerBy = req.user._id 
      const ownerName = req.user.name
   
      
   
      if(!answer)
      {
         throw new ApiError(401,"Cant post empty field")
      }
      const answerVar = await Answer.create({answer,answerBy,questionId,ownerName})
      
      return res.status(200).
      json(new ApiResponse(200,{},
         "Answer posted successfully"))}
      
          catch (error) {
      throw new ApiError(501,"internal server error")
   }

})

const getAnswers = asyncHandler(async (req,res) => {

   const {questionId} = req.params
   const answer = await Question.aggregate([
      {
            $match:{
               _id:new mongoose.Types.ObjectId(questionId)
            }
      },
      {
         $lookup:{
            from:"answers",
            localField:"_id",
            foreignField:"questionId",
            as:"questionAnswers"
         }
      }
   ])


   

   return res.status(200).
   json(new ApiResponse(200,
      answer,
      "Answers fetched successfully"))
})

export {postAnswer, getAnswers}