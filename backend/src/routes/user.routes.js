import { Router } from "express";
import {
    loginUser, logoutUser, refreshAccessToken, registerUser, google, myBlogs, deleteBlog, changeCurrentPassword, forgetPassword, resetPassword,
    changeProfilePicture
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

userRouter.route("/b/:blogId").delete(deleteBlog)

userRouter.route("/changePassword").post(
    verifyJWT,
    changeCurrentPassword
)

userRouter.route("/forgetPassword").post(
    forgetPassword
)

userRouter.route("/resetPassword/:tokenId").post(
    resetPassword
)

userRouter.route("/changeProfilePicture").post(
    verifyJWT,
    upload.fields([
    {
        name :"profilePicture",
        maxCount:1,
    }
])
    ,changeProfilePicture
)


export default userRouter