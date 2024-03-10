import { Router } from "express";

import {verifyJWT} from "../middlewares/auth.middleware.js"
import { postBlog } from "../controllers/blog.controller.js";


const blogRouter = Router()

blogRouter.route("/postBlog").post(
    verifyJWT,
    postBlog
)

export default blogRouter