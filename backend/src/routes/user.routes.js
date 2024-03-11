import { Router } from "express";
import {
    loginUser, logoutUser, refreshAccessToken, registerUser, google, myBlogs
} from "../controllers/user.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { postBlog } from "../controllers/blog.controller.js";

const userRouter = Router();

userRouter.route("/register").post(
    registerUser
)

userRouter.route("/login").post(
    loginUser
)

userRouter.route("/google").post(
    google
)

//secured routes
userRouter.route("/logout").post(
    verifyJWT,
    logoutUser
)
userRouter.route("/refresh-token").post(refreshAccessToken)

userRouter.route("/myBlogs").get(verifyJWT,myBlogs)

export default userRouter