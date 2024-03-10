import { Router } from "express";
import {
    loginUser, logoutUser, refreshAccessToken, registerUser
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

//secured routes
userRouter.route("/logout").post(
    verifyJWT,
    logoutUser
)
userRouter.route("/refresh-token").post(refreshAccessToken)


export default userRouter