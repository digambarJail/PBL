import mongoose , { Schema, mongo } from "mongoose"

const answerSchema = new Schema({
    answer:{
        type:String,
        required:true
    },
    answerBy :{
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    questionId:{
        type:Schema.Types.ObjectId,
        ref:"Question"
    },
    ownerName:{
        type:String,
        required:true
    }
},{timestamps:true})


export const Answer = new mongoose.model("Answer",answerSchema)