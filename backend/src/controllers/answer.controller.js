import mongoose from "mongoose";
import { Question } from "../models/question.models.js";
import { Answer } from "../models/answer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import checkForProfanity from "../utils/profanityChecker.js";

const postAnswer = asyncHandler(async (req,res) => {

   try {
      const {questionId} = req.params 
      const {answer} = req.body
      const answerBy = req.user._id 
      const ownerName = req.user.name
   
      const isContentProfane = await checkForProfanity(answer)

      if ( isContentProfane) {
         throw new ApiError(400,"Contains explicit content and cannot be submitted")
      }

      if(!answer)
      {
         throw new ApiError(401,"Cant post empty field")
      }
      const answerVar = await Answer.create({answer,answerBy,questionId,ownerName})
      
      return res.status(200).
      json(new ApiResponse(200,{},
         "Answer posted successfully"))}
      
      catch (error) {         
        const statusCode = error.statusCode || 500; 
        const message = error.message || "Something went wrong";
        return res.status(statusCode).json({ success: false, message })
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

// const getAnswers = asyncHandler(async (req, res) => {
//    const { questionId } = req.params;
//    const answers = await Question.aggregate([
//      {
//        $match: {
//          _id: new mongoose.Types.ObjectId(questionId),
//        },
//      },
//      {
//        $lookup: {
//          from: "answers",
//          localField: "_id",
//          foreignField: "questionId",
//          as: "questionAnswers",
//        },
//      },
//      {
//        $unwind: "$questionAnswers", // Unwind the questionAnswers array for further lookups
//      },
//      {
//        $lookup: {
//          from: "users", // Assuming the user collection is named "users"
//          localField: "questionAnswers.answerBy", // Assuming the field answerBy in answers contains the user ID
//          foreignField: "_id",
//          as: "questionAnswers.userDetails",
//        },
//      },
//      {
//        $project: {
//          _id: 0, // Exclude the question ID from the final output
//          questionAnswers: {
//            answer: 1,
//            answeredBy: 1,
//            profilePicture: { $arrayElemAt: ["$questionAnswers.userDetails.profilePicture", 0] }, // Get the profile picture from the joined userDetails
//          },
//        },
//      },
//      {
//        $group: {
//          _id: "$_id",
//          answers: { $push: "$questionAnswers" }, // Group everything back by question ID if needed
//        },
//      },
//    ]);
 
//    if (!answers.length) {
//      return res.status(404).json(new ApiResponse(404, {}, "No answers found for this question"));
//    }
//    console.log(answers[0]);
//    return res.status(200).json(new ApiResponse(200, answers, "Answers fetched successfully"));
//  });

 const getAnswers = asyncHandler(async (req,res) => {

  const {questionId} = req.params
  //console.log(blogId);
  //console.log('here');
  const answers = await Question.aggregate([
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
           as:"Qanswers" ,
           pipeline :[
              {
                 $lookup:{
                    from: "users" ,
                    localField:"answerBy" ,
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
              },
              {
                  $lookup:{
                     from :"likes" ,
                     localField : "_id" ,
                     foreignField : "answer",
                     as : "likesOnAnswer"
                  }
              },
              {
                  $addFields:{
                     answerLikes:{
                        $size:"$likesOnAnswer"
                     } 
                  }
              },
              {
                  $project:{
                     _id : 1,
                     answer:1,
                     questionId:1,
                     createdAt:1,
                     userDetails:1,
                     answerLikes:1
                  }
              },
              {
                  $sort:{
                     answerLikes : -1
                  }
              }
           ]
        }
     }
  ])
  

   if(!answers?.length)
   {
      throw new ApiError(401,"ANSWERS")
   }

  //console.log(comment[0].blogComments);
//   console.log(JSON.stringify(answers, null, 2));
   return res.status(200).
   json(new ApiResponse(200,
     answers,
     "answers fetched successfully"))
})

export {postAnswer, getAnswers}