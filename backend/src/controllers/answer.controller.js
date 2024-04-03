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

// const getAnswers = asyncHandler(async (req,res) => {

//    const {questionId} = req.params
//    const answer = await Question.aggregate([
//       {
//             $match:{
//                _id:new mongoose.Types.ObjectId(questionId)
//             }
//       },
//       {
//          $lookup:{
//             from:"answers",
//             localField:"_id",
//             foreignField:"questionId",
//             as:"questionAnswers"
//          }
//       }
//    ])


   

//    return res.status(200).
//    json(new ApiResponse(200,
//       answer,
//       "Answers fetched successfully"))
// })

const getAnswers = asyncHandler(async (req, res) => {
   const { questionId } = req.params;
   const answers = await Question.aggregate([
     {
       $match: {
         _id: new mongoose.Types.ObjectId(questionId),
       },
     },
     {
       $lookup: {
         from: "answers",
         localField: "_id",
         foreignField: "questionId",
         as: "questionAnswers",
       },
     },
     {
       $unwind: "$questionAnswers", // Unwind the questionAnswers array for further lookups
     },
     {
       $lookup: {
         from: "users", // Assuming the user collection is named "users"
         localField: "questionAnswers.answerBy", // Assuming the field answerBy in answers contains the user ID
         foreignField: "_id",
         as: "questionAnswers.userDetails",
       },
     },
     {
       $project: {
         _id: 0, // Exclude the question ID from the final output
         questionAnswers: {
           answer: 1,
           answeredBy: 1,
           profilePicture: { $arrayElemAt: ["$questionAnswers.userDetails.profilePicture", 0] }, // Get the profile picture from the joined userDetails
         },
       },
     },
     {
       $group: {
         _id: "$_id",
         answers: { $push: "$questionAnswers" }, // Group everything back by question ID if needed
       },
     },
   ]);
 
   if (!answers.length) {
     return res.status(404).json(new ApiResponse(404, {}, "No answers found for this question"));
   }
 
   return res.status(200).json(new ApiResponse(200, answers, "Answers fetched successfully"));
 });

export {postAnswer, getAnswers}