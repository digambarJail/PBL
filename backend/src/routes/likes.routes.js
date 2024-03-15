import { Router } from "express";

import {verifyJWT} from "../middlewares/auth.middleware.js"
import {likeBlog, getLikesCount, getTopVoices} from "../controllers/likes.controller.js"


const likesRouter = Router()

likesRouter.route("/l/:blogId").post(verifyJWT, likeBlog).get(getLikesCount)

likesRouter.route("/getTopVoices").get(getTopVoices)

export default likesRouter