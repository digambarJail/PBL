import { Router } from "express";

import {verifyJWT} from "../middlewares/auth.middleware.js"
import { getBlog, postBlog, showBlogs } from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { showQuestions } from "../controllers/question.controller.js";


const blogRouter = Router()

blogRouter.route("/postBlog").post(
    verifyJWT,
    upload.fields([
        {
            name:"blogPicture",
            maxCount:1
        }
    ]),
    postBlog
)

blogRouter.route("/showBlogs").get(
    showQuestions ,showBlogs
)

blogRouter.route("/b/:blogId").get(getBlog)


export default blogRouter