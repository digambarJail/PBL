import mongoose , { Schema, mongo } from "mongoose"

const commentSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    commentBy :{
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"Blog"
    },
    ownerName:{
        type:String,
        required:true
    }
},{timestamps:true})


export const Comment = new mongoose.model("Comment",commentSchema)