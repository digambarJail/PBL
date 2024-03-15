import { Router } from "express";

import {verifyJWT} from "../middlewares/auth.middleware.js"
import { getBlog, postBlog, showBlogs } from "../controllers/blog.controller.js";


const blogRouter = Router()

blogRouter.route("/postBlog").post(
    verifyJWT,
    postBlog
)

blogRouter.route("/showBlogs").get(
    showBlogs
)

blogRouter.route("/b/:blogId").get(getBlog)


export default blogRouter