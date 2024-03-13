import { Router } from "express";
import {
    loginUser, logoutUser, refreshAccessToken, registerUser, google, myBlogs
} from "../controllers/user.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { postBlog } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(upload.fields([
    {
        name :"profilePicture",
        maxCount:1,
    }
])
    ,registerUser
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