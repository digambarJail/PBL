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

//routes declaration
app.use("/api", userRouter)
app.use("/api",blogRouter)

app.listen(3001 , () => {
    console.log("server is running")
})

export { app }