import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {postQuestion, showQuestions} from "../controllers/question.controller.js";


const questionRouter = Router()

questionRouter.route("/postQuestion").post( 
    verifyJWT,
    postQuestion
)

questionRouter.route("/showQuestions").get(
    showQuestions
)
export default questionRouter