import mongoose ,{Schema,mongo} from "mongoose";

const blogSchema = new Schema({

    title:{
        type: String,
        required:true
    },
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

export const Blog = mongoose.model("Blog",blogSchema)