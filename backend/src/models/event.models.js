import mongoose ,{Schema} from "mongoose";

const eventShcema = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    organizer:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Event = mongoose.model("Event",eventShcema)