import mongoose ,{Schema,mongo} from "mongoose";

const questionSchema = new Schema({

    question: {
        type: String,
        required:true
    },
    nameOfOwner:{
        type: String 
    },
    owner :{
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    isAnonymous: {
        type: Boolean,
    }
    
},{timestamps:true})

export const Question = mongoose.model("Question",questionSchema)