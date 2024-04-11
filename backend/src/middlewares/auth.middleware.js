import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async(req, res, next)=>{
   try {
    let token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
        const refreshToken = req.cookies?.refreshToken
        if(!refreshToken){
            throw new ApiError(401, "Refresh token expired, Log in again") //He handle kar
        }
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        
        const user  = await User.findById(decodedRefreshToken._id)
        token = user.generateAccessToken()
    }
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    if (!user) {
        
        throw new ApiError(401, "Invalid Access Token")
    }

    req.user = user;
    next()
   } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access Token")
   }
})