// https://www.npmjs.com/package/dotenv


import express from 'express';
// const path = require('path')
// import path from "path"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

// middleweres
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
// app.use(express.static("public"))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRouter from './routes/user.routes.js'
// userRouter because user.routes is default
// routes declaration
app.use("/api/v1/users", userRouter)
// http://localhost:8000/api/v1/users/register
// http://localhost:8000/users/login



export {app}
// multer file uploading configure
// npm run dev