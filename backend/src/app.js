import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import blogRouter from "./routes/blog.routes.js";
import questionRouter from "./routes/question.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likesRouter from "./routes/likes.routes.js";
import eventRouter from "./routes/event.routes.js";
import answerRouter from "./routes/answer.routes.js";


//routes declaration
app.use("/api", userRouter)
app.use("/api",blogRouter)
app.use("/api",questionRouter)
app.use("/api",commentRouter)
app.use("/api",likesRouter)
app.use("/api",eventRouter)
app.use("/api",answerRouter)


app.listen(3001 , () => {
    console.log("server is running")
})

export { app }