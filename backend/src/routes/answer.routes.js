import { Router } from "express";

import {verifyJWT} from "../middlewares/auth.middleware.js"
import {postAnswer, getAnswers, deleteAnswer  } from "../controllers/answer.controller.js";


const answerRouter = Router()

answerRouter.route("/answer/:questionId").get(getAnswers).post(
    verifyJWT,
    postAnswer
)
answerRouter.route("/deleteAnswer/:answerId").delete(
    verifyJWT,
    deleteAnswer
)


export default answerRouter