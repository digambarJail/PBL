import { Router } from "express";

import {verifyJWT} from "../middlewares/auth.middleware.js"
import { getComments, postComment } from "../controllers/comment.controller.js";


const commentRouter = Router()

commentRouter.route("/c/:blogId").get(getComments).post(
    verifyJWT,
    postComment
)


export default commentRouter