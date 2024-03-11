import { Router } from "express";

import {verifyJWT} from "../middlewares/auth.middleware.js"
import { postBlog, showBlogs } from "../controllers/blog.controller.js";


const blogRouter = Router()

blogRouter.route("/postBlog").post(
    verifyJWT,
    postBlog
)

blogRouter.route("/showBlogs").get(
    showBlogs
)
export default blogRouter