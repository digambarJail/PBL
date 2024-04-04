import { Router } from "express";

import {verifyJWT} from "../middlewares/auth.middleware.js"
import {likeBlog, getLikesCount, getTopVoices, likeAnswer, getLikesCountAnswer} from "../controllers/likes.controller.js"


const likesRouter = Router()

likesRouter.route("/l/:blogId").post(verifyJWT, likeBlog).get(verifyJWT,getLikesCount)

likesRouter.route("/getTopVoices").get(getTopVoices)

likesRouter.route("/likeAnswer/:answerId").post(verifyJWT, likeAnswer).get(verifyJWT,getLikesCountAnswer)

export default likesRouter