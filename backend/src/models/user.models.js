import mongoose, { Schema, mongo } from 'mongoose'
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
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
    // refreshToken:{
    //     type: String
    // }
        
    
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

// userSchema.methods.generateAccessToken = function(){
//     jwt.sign({
//             _id: this._id,
//             email: this.email,
//             username: this.username,
//             fullname: this.fullname
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: process.env.ACCESS_TOKEN_EXPIRY
//         }
//     )
// }

// userSchema.methods.generateRefreshToken = function(){
//     jwt.sign({
//         _id: this._id,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//         expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//     }
// )
// }


export const User = mongoose.model("User", userSchema)

