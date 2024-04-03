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
    },
    blogPicture:{
        type:String 
        //default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    }
    
},{timestamps:true})

export const Blog = mongoose.model("Blog",blogSchema)