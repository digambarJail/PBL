import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {postQuestion, showQuestions, getQuestion} from "../controllers/question.controller.js";


const questionRouter = Router()

questionRouter.route("/postQuestion").post( 
    verifyJWT,
    postQuestion
)

questionRouter.route("/showQuestions").get(
    showQuestions
)

questionRouter.route("/q/:questionId").get(getQuestion)

export default questionRouter