import mongoose, {Schema} from "mongoose";

const likeSchema = new Schema({
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
    },
    answer:{
        type: Schema.Types.ObjectId,
        ref: "Answer",
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",        
    },
    blogOwnerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    answerOwnerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
    
    
    
}, {timestamps: true})

export const Like = mongoose.model("Like", likeSchema)