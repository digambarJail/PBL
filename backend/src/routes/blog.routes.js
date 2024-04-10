import { Router } from "express";

import {verifyJWT} from "../middlewares/auth.middleware.js"
import { deleteBlog, getBlog, postBlog, showBlogs } from "../controllers/blog.controller.js";
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
   showBlogs
)

blogRouter.route("/b/:blogId").get(getBlog)

blogRouter.route("/deleteBlog/:blogId").delete(deleteBlog);

export default blogRouter