import mongoose, { Schema, mongo } from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        // unique: true,
        //lowercase: true,
        trim: true,
        //index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    profilePicture: {
        type: String,
        default:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    refreshToken:{
        type: String
    },
    profilePictureId:{
        type:String ,
    },
    department:{
        type:String,
        required:true 
    },
    year:{
        type:String,
        required:true
    }
    
},
    {
        timestamps: true
    })

userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();

    this.password = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.isPasswordCorrect = async function 
(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken =  function(){
    return jwt.sign({
            _id: this._id,
            name: this.name,
            email: this.email
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("User", userSchema)

