import mongoose ,{Schema,mongo} from "mongoose";

const questionSchema = new Schema({

    content: {
        type: String,
        required:true
    },
    nameOfOwner:{
        type: String 
    },
    owner :{
        type : Schema.Types.ObjectId,
        ref : "User"
    }
    
},{timestamps:true})

export const Question = mongoose.model("Question",questionSchema)